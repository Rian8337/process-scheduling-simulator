import { GanttChartData } from "./GanttChartData";

/**
 * Represents the result of a scheduler run.
 */
export interface SchedulerResult {
    /**
     * The waiting time of each processes, indexed by the process label.
     */
    waitingTime: Record<string, number>;

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
