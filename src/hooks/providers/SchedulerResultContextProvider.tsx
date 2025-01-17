import { PropsWithChildren, useState } from "react";
import { SchedulerResult } from "../scheduler";
import { SchedulerResultContext } from "./contexts/SchedulerResultContext";

export function SchedulerResultContextProvider(props: PropsWithChildren) {
    const [state, setState] = useState<SchedulerResult | null>(null);

    return (
        <SchedulerResultContext.Provider
            value={{
                state,
                setState,
            }}
        >
            {props.children}
        </SchedulerResultContext.Provider>
    );
}
