import { SchedulerResult } from "@scheduler/index";
import { IStateContext } from "./IStateContext";

export type ISchedulerResultContext = IStateContext<SchedulerResult | null>;
