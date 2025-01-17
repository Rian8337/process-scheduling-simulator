import { PropsWithChildren, useState } from "react";
import { ProcessQueueControllerContext } from "../contexts";
import { ProcessQueueController } from "../../scheduler";

export function ProcessQueueControllerContextProvider(
    props: PropsWithChildren
) {
    const [state, setState] = useState<ProcessQueueController[]>([]);

    return (
        <ProcessQueueControllerContext.Provider
            value={{
                state,
                setState,
            }}
        >
            {props.children}
        </ProcessQueueControllerContext.Provider>
    );
}
