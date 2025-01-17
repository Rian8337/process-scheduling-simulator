import { JSX, FC } from "react";
import {
    AvailablePriorityContextProvider,
    ProcessQueueControllerContextProvider,
    SchedulerResultContextProvider,
} from "./providers";

const compose =
    (...components: FC<Record<string, unknown>>[]) =>
    (props: { children: JSX.Element }) =>
        components.reduce(
            (children, Current) => <Current {...props}>{children}</Current>,
            props.children
        );

export const Providers = compose(
    AvailablePriorityContextProvider,
    ProcessQueueControllerContextProvider,
    SchedulerResultContextProvider
);
