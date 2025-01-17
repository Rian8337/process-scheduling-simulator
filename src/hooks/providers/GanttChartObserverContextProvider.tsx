import { GanttChartObserverContext } from "@hooks/contexts";
import { PropsWithChildren, useState } from "react";

export function GanttChartObserverContextProvider(props: PropsWithChildren) {
    const [state, setState] = useState({});

    return (
        <GanttChartObserverContext.Provider
            value={{
                state,
                setState,
            }}
        >
            {props.children}
        </GanttChartObserverContext.Provider>
    );
}
