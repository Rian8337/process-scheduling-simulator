import { ProcessQueueController } from "../../scheduler";
import { IStateContext } from "./IStateContext";

export type IProcessQueueControllerContext = IStateContext<
    ProcessQueueController[]
>;
