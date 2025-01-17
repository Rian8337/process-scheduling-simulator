import { PropsWithChildren, useState } from "react";
import { AvailablePriorityContext } from "../contexts/AvailablePriorityContext";
import { priorities } from "@scheduler/index";

export function AvailablePriorityContextProvider(props: PropsWithChildren) {
    const [state, setState] = useState<number[]>(priorities.slice());

    return (
        <AvailablePriorityContext.Provider value={{ state, setState }}>
            {props.children}
        </AvailablePriorityContext.Provider>
    );
}
