import { useEffect, useState } from "react";
import { IObservable } from "./models/IObservable";

/**
 * A hook that allows a component to observe an object for changes.
 *
 * @param observable The object to observe.
 * @returns An object state that can be used to listen for changes in a useEffect hook.
 */
export function useObserver(observable: IObservable): object {
    const [listener, setListener] = useState({});

    useEffect(() => {
        observable.observers.add(setListener);

        return () => {
            observable.observers.delete(setListener);
        };
    }, [observable.observers]);

    return listener;
}
