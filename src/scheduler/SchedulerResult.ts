import { GanttChartData } from "./GanttChartData";
import { Process } from "./Process";

/**
 * Represents the result of a scheduler run.
 */
export interface SchedulerResult {
    /**
     * The processes that were executed.
     */
    processes: Record<string, Process>;

    /**
     * The waiting time of each processes, indexed by the process label.
     */
    waitingTime: Record<string, number>;

    /**
     * The exit time of each processes, indexed by the process label.
     */
    exitTime: Record<string, number>;

    /**
     * The turnaround time of each processes, indexed by the process label.
     */
    turnaroundTime: Record<string, number>;

    /**
     * The response time of each processes, indexed by the process label.
     */
    responseTime: Record<string, number>;

    /**
     * The Gantt chart data.
     */
    ganttChartData: GanttChartData[];
}
