import { createContext } from "react";
import { ISchedulerResultContext } from "../models";

export const SchedulerResultContext = createContext<ISchedulerResultContext>({
    state: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setState: () => {},
});
