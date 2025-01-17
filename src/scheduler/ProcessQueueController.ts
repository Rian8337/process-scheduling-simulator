import { Dispatch, SetStateAction } from "react";
import { ProcessQueue } from "../scheduler/ProcessQueue";
import { SchedulingAlgorithm } from "../scheduler/SchedulingAlgorithm";
import { ProcessController } from "./ProcessController";
import { IObservable } from "../hooks/models/IObservable";
import { Priorities } from "./priorities";

/**
 * The controller of a process queue.
 */
export class ProcessQueueController implements IObservable {
    private static incrementalId = 1;

    observers = new Set<Dispatch<SetStateAction<object>>>();

    /**
     * The ID of this process queue.
     */
    readonly id = ProcessQueueController.incrementalId++;

    /**
     * Incremental ID used to assign unique IDs to processes in this queue.
     */
    processIncrementalId = 1;

    private readonly _processes = new Set<ProcessController>();

    /**
     * The processes in this queue.
     */
    get processes(): ReadonlySet<ProcessController> {
        return this._processes;
    }

    private _priority: Priorities;

    /**
     * The priority of this queue.
     */
    get priority(): Priorities {
        return this._priority;
    }

    set priority(value: Priorities) {
        this._priority = value;

        this.notifyChange();
    }

    private _algorithm = SchedulingAlgorithm.firstComeFirstServe;

    /**
     * The scheduling algorithm of this queue.
     */
    get algorithm(): SchedulingAlgorithm {
        return this._algorithm;
    }

    set algorithm(value: SchedulingAlgorithm) {
        this._algorithm = value;

        this.notifyChange();
    }

    private _timeQuantum = 2;

    /**
     * The time quantum of this queue. Used for round-robin scheduling.
     */
    get timeQuantum(): number {
        return this._timeQuantum;
    }

    set timeQuantum(value: number) {
        this._timeQuantum = value;

        this.notifyChange();
    }

    constructor(priority: Priorities) {
        this._priority = priority;
    }

    /**
     * Adds a process to this queue.
     *
     * @param process The process to add.
     */
    addProcess(process: ProcessController) {
        this._processes.add(process);

        this.notifyChange();
    }

    /**
     * Removes a process from this queue.
     *
     * @param process The process to remove.
     */
    removeProcess(process: ProcessController) {
        if (this._processes.delete(process)) {
            this.notifyChange();
        }
    }

    /**
     * Converts this controller to a process queue.
     *
     * @returns The process queue.
     */
    toQueue(): ProcessQueue {
        const queue = new ProcessQueue(this.id);

        queue.priority = this.priority;
        queue.algorithm = this.algorithm;
        queue.timeQuantum = this.timeQuantum;

        for (const process of this.processes) {
            queue.enqueue(process.toProcess());
        }

        return queue;
    }

    private notifyChange() {
        const obj = {};

        for (const observer of this.observers) {
            observer(obj);
        }
    }
}
