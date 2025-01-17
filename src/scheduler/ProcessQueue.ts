import { Process } from "./Process";
import { Queue } from "./Queue";
import { SchedulingAlgorithm } from "./SchedulingAlgorithm";

/**
 * Represents a process queue.
 */
export class ProcessQueue extends Queue<Process> {
    private currentRunningProcess: Process | null = null;

    /**
     * The ID of this queue.
     */
    readonly id: number;

    /**
     * The priority of this queue.
     */
    priority = 0;

    /**
     * The scheduling algorithm of this queue.
     */
    algorithm = SchedulingAlgorithm.firstComeFirstServe;

    /**
     * The time quantum of this queue. Used for round-robin scheduling.
     */
    timeQuantum = 2;

    /**
     * The processes in this queue.
     */
    get processes(): readonly Process[] {
        return this.items;
    }

    constructor(id: number) {
        super();

        this.id = id;
    }

    override enqueue(item: Process) {
        super.enqueue(item);

        this.sort();
    }

    override dequeue(): Process | null {
        const process = super.dequeue();

        if (process) {
            this.currentRunningProcess = process;
        }

        return process;
    }

    /**
     * Checks whether a process should preempt the currently running process.
     *
     * @param newProcess The new process to check.
     * @returns `true` if the new process should preempt the currently running process, `false` otherwise.
     */
    shouldPreempt(newProcess: Process): boolean {
        if (!this.currentRunningProcess) {
            return false;
        }

        switch (this.algorithm) {
            case SchedulingAlgorithm.priorityPreemptive:
                return (
                    newProcess.processPriority <
                    this.currentRunningProcess.processPriority
                );

            case SchedulingAlgorithm.shortestRemainingTimeFirst:
                return (
                    newProcess.remainingTime <
                    this.currentRunningProcess.remainingTime
                );

            default:
                return false;
        }
    }

    private sort() {
        switch (this.algorithm) {
            case SchedulingAlgorithm.shortestJobFirst:
            case SchedulingAlgorithm.shortestRemainingTimeFirst:
                this.items.sort((a, b) => {
                    // Sort by remaining time first, then by arrival time
                    if (a.remainingTime !== b.remainingTime) {
                        return a.remainingTime - b.remainingTime;
                    }

                    return a.arrivalTime - b.arrivalTime;
                });
                break;

            case SchedulingAlgorithm.priorityNonPreemptive:
            case SchedulingAlgorithm.priorityPreemptive:
                this.items.sort((a, b) => {
                    // Sort by priority first, then by arrival time
                    if (a.processPriority !== b.processPriority) {
                        return a.processPriority - b.processPriority;
                    }

                    return a.arrivalTime - b.arrivalTime;
                });
                break;

            case SchedulingAlgorithm.firstComeFirstServe:
                this.items.sort((a, b) => a.arrivalTime - b.arrivalTime);
                break;

            // Round Robin doesn't need sorting as it uses FCFS with time quantum.
        }
    }

    override clone(withItems: boolean): ProcessQueue {
        const queue = new ProcessQueue(this.id);

        queue.priority = this.priority;
        queue.algorithm = this.algorithm;
        queue.timeQuantum = this.timeQuantum;

        if (withItems) {
            queue.items.push(...this.items);
        }

        return queue;
    }
}
