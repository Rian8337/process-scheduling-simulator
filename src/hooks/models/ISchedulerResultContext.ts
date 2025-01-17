import { SchedulerResult } from "../../scheduler";
import { IStateContext } from "./IStateContext";

export type ISchedulerResultContext = IStateContext<SchedulerResult | null>;
