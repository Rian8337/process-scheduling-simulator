import { ProcessQueueController } from "@scheduler/index";
import { IStateContext } from "./IStateContext";

export type IProcessQueueControllerContext = IStateContext<
    ProcessQueueController[]
>;
