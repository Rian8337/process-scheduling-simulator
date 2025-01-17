import { Dispatch, SetStateAction } from "react";
import { Process } from "./Process";
import { IObservable } from "../hooks/models/IObservable";

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

    /**
     * The priority of the queue this process belongs to.
     */
    readonly queuePriority: number;

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

    private _processPriority = 0;

    /**
     * The priority of the process.
     */
    get processPriority(): number {
        return this._processPriority;
    }

    set processPriority(value: number) {
        this._processPriority = value;

        this.notifyChange();
    }

    constructor(name: string, queuePriority: number) {
        this._name = name;
        this.queuePriority = queuePriority;
    }

    /**
     * Converts this controller to a process.
     */
    toProcess(): Process {
        return new Process(
            this.name,
            this.arrivalTime,
            this.burstTime,
            this.queuePriority,
            this.processPriority
        );
    }

    private notifyChange() {
        const obj = {};

        for (const observer of this.observers) {
            observer(obj);
        }
    }
}
