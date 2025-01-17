import { PropsWithChildren, useState } from "react";
import { AvailablePriorityContext } from "../contexts/AvailablePriorityContext";
import { Priorities, priorities } from "@scheduler/index";

export function AvailablePriorityContextProvider(props: PropsWithChildren) {
    const [state, setState] = useState<Priorities[]>(priorities.slice());

    return (
        <AvailablePriorityContext.Provider value={{ state, setState }}>
            {props.children}
        </AvailablePriorityContext.Provider>
    );
}
