import { ProcessState } from "./ProcessState";

/**
 * Represents a process.
 */
export class Process {
    /**
     * The state of this process.
     */
    state = ProcessState.ready;

    /**
     * The label of this process in the Gantt chart.
     */
    label: string;

    /**
     * The priority of the queue this process belongs to.
     */
    queuePriority: number;

    /**
     * The priority of this process. Used for priority-based scheduling.
     */
    processPriority: number;

    /**
     * The arrival time of this process.
     */
    arrivalTime: number;

    /**
     * The burst time of this process.
     */
    burstTime: number;

    /**
     * The remaining burst time of this process.
     */
    remainingTime: number;

    constructor(
        label: string,
        arrivalTime: number,
        burstTime: number,
        queuePriority: number,
        processPriority: number
    ) {
        this.label = label;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.remainingTime = burstTime;
        this.queuePriority = queuePriority;
        this.processPriority = processPriority;
    }
}
