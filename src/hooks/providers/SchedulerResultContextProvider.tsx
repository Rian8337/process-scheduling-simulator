import { PropsWithChildren, useState } from "react";
import { SchedulerResult } from "@scheduler/index";
import { SchedulerResultContext } from "../contexts";

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
