import { createContext } from "react";
import { IProcessQueueControllerContext } from "../models";

export const ProcessQueueControllerContext =
    createContext<IProcessQueueControllerContext>({
        state: [],
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        setState: () => {},
    });
