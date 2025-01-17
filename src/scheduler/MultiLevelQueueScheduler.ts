import { Process } from "./Process";
import { ProcessQueue } from "./ProcessQueue";
import { ProcessState } from "./ProcessState";
import { SchedulerResult } from "./SchedulerResult";
import { SchedulingAlgorithm } from "./SchedulingAlgorithm";

/**
 * A multi-level queue scheduler.
 */
export class MultiLevelQueueScheduler {
    /**
     * The original queues that are in this scheduler, mapped by priority.
     *
     * Used to reset the scheduler.
     */
    private readonly originalQueues = new Map<number, ProcessQueue>();

    /**
     * The queues that are in this scheduler, mapped by priority.
     */
    private readonly queues = new Map<number, ProcessQueue>();

    /**
     * A map that holds all processes that have not arrived yet (waiting), sorted by arrival time.
     */
    private readonly waitingProcesses: Process[] = [];

    private currentTime = 0;

    /**
     * Adds a queue to the scheduler.
     *
     * @param queue The queue to add.
     */
    add(queue: ProcessQueue) {
        this.originalQueues.set(queue.priority, queue);
    }

    /**
     * Removes a queue from the scheduler.
     *
     * @param priority The priority of the queue to remove.
     */
    remove(priority: number) {
        this.originalQueues.delete(priority);
    }

    /**
     * Runs the scheduler.
     *
     * @returns The result of the scheduler run.
     */
    run(): SchedulerResult {
        console.log("Running multi-level queue scheduler");

        this.refresh();

        const result: SchedulerResult = {
            waitingTime: {},
            turnaroundTime: {},
            responseTime: {},
            ganttChartData: [],
        };

        let currentProcess: Process | null = null;
        let remainingRunningTime = 0;
        let currentProcessStartTime = 0;

        while (
            // If there are still processes that have not arrived yet.
            this.waitingProcesses.length > 0 ||
            // If there is currently a running process.
            currentProcess ||
            // If there are still processes that have not finished yet.
            Array.from(this.queues.values()).some((q) => !q.isEmpty)
        ) {
            // Add newly arrived processes to their respective queues.
            while (
                this.waitingProcesses.length > 0 &&
                this.waitingProcesses[0].arrivalTime <= this.currentTime
            ) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const arrivedProcess = this.waitingProcesses.shift()!;
                this.addToQueue(arrivedProcess);

                // Check if the arrived process should preempt the current process.
                if (currentProcess) {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const arrivedQueue = this.queues.get(
                        arrivedProcess.queuePriority
                    )!;

                    if (
                        arrivedProcess.queuePriority <
                            currentProcess.queuePriority ||
                        (arrivedProcess.queuePriority ===
                            currentProcess.queuePriority &&
                            arrivedQueue.shouldPreempt(arrivedProcess))
                    ) {
                        // Add Gantt chart entry for the preempted process.
                        result.ganttChartData.push({
                            process: currentProcess,
                            startTime: currentProcessStartTime,
                            endTime: this.currentTime,
                        });

                        // Preempt current process.
                        this.addToQueue(currentProcess);

                        currentProcess = null;
                        remainingRunningTime = 0;
                    }
                }
            }

            // If no processes are running, get the highest priority process.
            if (!currentProcess) {
                const sortedPriorities = Array.from(this.queues.keys()).sort(
                    (a, b) => a - b
                );

                for (const priority of sortedPriorities) {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const queue = this.queues.get(priority)!;

                    if (queue.isEmpty) {
                        continue;
                    }

                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    currentProcess = queue.dequeue()!;
                    remainingRunningTime = this.getTimeSlice(currentProcess);
                    currentProcessStartTime = this.currentTime;

                    break;
                }
            }

            if (currentProcess) {
                // Record response time when the process starts for the first time.
                if (currentProcess.state === ProcessState.ready) {
                    result.responseTime[currentProcess.label] =
                        this.currentTime - currentProcess.arrivalTime;

                    currentProcess.state = ProcessState.running;
                }

                // Execute for one cycle
                --currentProcess.remainingTime;
                --remainingRunningTime;
                ++this.currentTime;

                console.log(
                    `Time ${(this.currentTime - 1).toString()}-${this.currentTime.toString()}: ` +
                        `Executing Process ${currentProcess.label} ` +
                        `(Priority ${currentProcess.queuePriority.toString()}, ` +
                        `Remaining Time: ${currentProcess.remainingTime.toString()})`
                );

                // There are three situations that can stop a process from running:
                // - The process is completed
                // - The process has exhausted its time slice (happens in preemptive priority or round robin scheduling)
                // - A higher priority process has arrived (happens in preemptive priority scheduling)
                // We must check all cases.
                if (currentProcess.remainingTime === 0) {
                    // Process is finished.
                    // Add Gantt chart entry for completed process.
                    result.ganttChartData.push({
                        process: currentProcess,
                        startTime: currentProcessStartTime,
                        endTime: this.currentTime,
                    });

                    currentProcess.state = ProcessState.completed;

                    result.turnaroundTime[currentProcess.label] =
                        this.currentTime - currentProcess.arrivalTime;

                    result.waitingTime[currentProcess.label] =
                        result.turnaroundTime[currentProcess.label] -
                        currentProcess.burstTime;

                    currentProcess = null;
                    remainingRunningTime = 0;
                } else if (remainingRunningTime === 0) {
                    // The remaining running time has finished, so the process must be preempted.
                    // Add Gantt chart entry for the preempted process.
                    result.ganttChartData.push({
                        process: currentProcess,
                        startTime: currentProcessStartTime,
                        endTime: this.currentTime,
                    });

                    // Put the process back in the queue.
                    this.addToQueue(currentProcess);

                    currentProcess = null;
                } else {
                    // Check if the process must be preempted by a higher priority process.
                    const preemptingProcess =
                        this.checkPreemption(currentProcess);

                    if (preemptingProcess) {
                        // Add Gantt chart entry for the preempted process.
                        result.ganttChartData.push({
                            process: currentProcess,
                            startTime: currentProcessStartTime,
                            endTime: this.currentTime,
                        });

                        // Put the process back in the queue.
                        this.addToQueue(currentProcess);

                        currentProcess = null;
                        remainingRunningTime = 0;
                    }
                }
            } else if (this.waitingProcesses.length > 0) {
                // No process is running. Advance time to the next arrival.
                this.currentTime = Math.max(
                    this.waitingProcesses[0].arrivalTime,
                    this.currentTime
                );
            }
        }

        return result;
    }

    /**
     * Adds a process to its priority queue.
     *
     * @param process The process to add.
     */
    private addToQueue(process: Process) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const queue = this.queues.get(process.queuePriority)!;

        queue.enqueue(process);
    }

    /**
     * Obtains the time slice of a process.
     *
     * @param process The process to get the time slice of.
     * @returns The time slice of the process.
     */
    private getTimeSlice(process: Process): number {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const queue = this.queues.get(process.queuePriority)!;

        switch (queue.algorithm) {
            case SchedulingAlgorithm.roundRobin:
                // Round-robin scheduling uses the time quantum.
                return queue.timeQuantum;

            case SchedulingAlgorithm.priorityPreemptive:
            case SchedulingAlgorithm.shortestRemainingTimeFirst: {
                // For preemptive scheduling algorithms, it depends on the processes that are currently waiting.
                let timeUntilPreemption = process.remainingTime;

                // Check upcoming process arrivals.
                for (const waitingProcess of this.waitingProcesses) {
                    if (waitingProcess.arrivalTime <= this.currentTime) {
                        continue;
                    }

                    if (waitingProcess.queuePriority < process.queuePriority) {
                        // For higher priority queues, the process runs until the waiting process arrives.
                        timeUntilPreemption = Math.min(
                            timeUntilPreemption,
                            waitingProcess.arrivalTime - this.currentTime
                        );
                    } else if (
                        waitingProcess.queuePriority === process.queuePriority
                    ) {
                        // For same priority queue, it depends on the scheduling algorithm of the queue.
                        let preempt = false;

                        switch (queue.algorithm) {
                            case SchedulingAlgorithm.shortestRemainingTimeFirst:
                                preempt =
                                    waitingProcess.remainingTime <
                                    process.remainingTime -
                                        // Account for how much the process will have executed
                                        // by the time the waiting process arrives.
                                        (waitingProcess.arrivalTime -
                                            this.currentTime);
                                break;

                            case SchedulingAlgorithm.priorityPreemptive:
                                preempt =
                                    waitingProcess.processPriority <
                                    process.processPriority;
                                break;
                        }

                        if (preempt) {
                            timeUntilPreemption =
                                waitingProcess.arrivalTime - this.currentTime;
                        }
                    }

                    // Check the next process in the queue of the process.
                    const nextProcess = queue.peek();

                    if (nextProcess && queue.shouldPreempt(nextProcess)) {
                        // The next process in the queue must run, so an immediate preemption is needed.
                        // The process will only run for 1 cycle.
                        timeUntilPreemption = 1;
                    }
                }

                return timeUntilPreemption;
            }

            default:
                // Non-preemptive algorithms run the process until it finishes.
                return process.remainingTime;
        }
    }

    /**
     * Checks if a process should be preempted by another process, and if so,
     * returns the process that should preempt it.
     *
     * @param process The process to check for preemption.
     * @returns The process that should preempt the given process, or `null` if no preemption is needed.
     */
    private checkPreemption(process: Process | null): Process | null {
        if (!process) {
            return null;
        }

        // Obtain all queues with higher priority than the current process.
        const higherPriorityQueues = Array.from(this.queues.values()).filter(
            (q) => q.priority < process.queuePriority
        );

        // Check if any higher priority queue has processes.
        for (const queue of higherPriorityQueues) {
            if (queue.isEmpty) {
                continue;
            }

            return queue.peek();
        }

        // For SRTF or preemptive priority scheduling, check the queue with the same priority.
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const queue = this.queues.get(process.queuePriority)!;

        if (
            queue.algorithm ===
                SchedulingAlgorithm.shortestRemainingTimeFirst ||
            queue.algorithm === SchedulingAlgorithm.priorityPreemptive
        ) {
            const nextProcess = queue.peek();

            if (nextProcess && queue.shouldPreempt(nextProcess)) {
                return nextProcess;
            }
        }

        return null;
    }

    /**
     * Refreshes the scheduler.
     *
     * This will reset the current time to 0 and repopulate the waiting processes.
     */
    private refresh() {
        this.currentTime = 0;
        this.waitingProcesses.length = 0;
        this.queues.clear();

        for (const queue of this.originalQueues.values()) {
            this.queues.set(queue.priority, queue.clone(false));
            this.waitingProcesses.push(...queue.processes);
        }

        // Sort by arrival time
        this.waitingProcesses.sort((a, b) => a.arrivalTime - b.arrivalTime);
    }
}
