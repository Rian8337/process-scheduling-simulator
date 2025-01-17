import { Dispatch, SetStateAction } from "react";

/**
 * A generic context for state management.
 */
export interface IStateContext<T> {
    /**
     * The current state.
     */
    readonly state: T;

    /**
     * A function to update the state.
     */
    readonly setState: Dispatch<SetStateAction<T>>;
}
