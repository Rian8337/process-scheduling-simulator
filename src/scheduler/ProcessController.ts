import { Dispatch, SetStateAction } from "react";
import { Process } from "./Process";
import { IObservable } from "@hooks/index";
import { Priorities } from "./priorities";

/**
 * The controller of a process.
 */
export class ProcessController implements IObservable {
    observers = new Set<Dispatch<SetStateAction<object>>>();

    private _name: string;

    /**
     * The name of the process. Will be used as label.
     */
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;

        this.notifyChange();
    }

    private _arrivalTime = 0;

    /**
     * The arrival time of the process.
     */
    get arrivalTime(): number {
        return this._arrivalTime;
    }

    set arrivalTime(value: number) {
        this._arrivalTime = value;

        this.notifyChange();
    }

    private _burstTime = 1;

    /**
     * The burst time of the process.
     */
    get burstTime(): number {
        return this._burstTime;
    }

    set burstTime(value: number) {
        this._burstTime = value;

        this.notifyChange();
    }

    private _priority: Priorities = 0;

    /**
     * The priority of the process.
     */
    get priority(): Priorities {
        return this._priority;
    }

    set priority(value: Priorities) {
        this._priority = value;

        this.notifyChange();
    }

    constructor(name: string) {
        this._name = name;
    }

    /**
     * Converts this controller to a process.
     *
     * @param queuePriority The priority of the queue the process is in.
     */
    toProcess(queuePriority: Priorities): Process {
        return new Process(
            this.name,
            this.arrivalTime,
            this.burstTime,
            queuePriority,
            this.priority
        );
    }

    private notifyChange() {
        const obj = {};

        for (const observer of this.observers) {
            observer(obj);
        }
    }
}
