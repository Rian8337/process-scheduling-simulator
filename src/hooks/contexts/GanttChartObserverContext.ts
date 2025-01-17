import { IStateContext } from "@hooks/models";
import { createContext } from "react";

export const GanttChartObserverContext = createContext<IStateContext<object>>({
    state: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setState: () => {},
});
