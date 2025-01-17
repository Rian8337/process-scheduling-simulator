import { Dispatch, SetStateAction } from "react";

/**
 * Base interface for an object that can be observed for changes.
 */
export interface IObservable {
    /**
     * The observers of this object.
     */
    observers: Set<Dispatch<SetStateAction<object>>>;
}
