import { PropsWithChildren, useState } from "react";
import { AvailablePriorityContext } from "../contexts/AvailablePriorityContext";

export function AvailablePriorityContextProvider(props: PropsWithChildren) {
    const [state, setState] = useState<number[]>([
        -20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6,
        -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19,
    ]);

    return (
        <AvailablePriorityContext.Provider value={{ state, setState }}>
            {props.children}
        </AvailablePriorityContext.Provider>
    );
}
