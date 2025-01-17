import { createContext } from "react";
import { IAvailablePriorityContext } from "../models";

export const AvailablePriorityContext =
    createContext<IAvailablePriorityContext>({
        state: [],
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        setState: () => {},
    });
