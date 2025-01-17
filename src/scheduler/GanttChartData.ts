import { Process } from "./Process";

/**
 * Represents data for a Gantt chart.
 */
export interface GanttChartData {
    /**
     * The process that is being executed.
     */
    readonly process: Process;

    /**
     * The start time of the process execution.
     */
    readonly startTime: number;

    /**
     * The end time of the process execution.
     */
    readonly endTime: number;
}
