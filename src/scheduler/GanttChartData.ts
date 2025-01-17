/**
 * Represents data for a Gantt chart.
 */
export interface GanttChartData {
    /**
     * The label of the process that was executed.
     */
    readonly label: string;

    /**
     * The start time of the process execution.
     */
    readonly startTime: number;

    /**
     * The end time of the process execution.
     */
    readonly endTime: number;
}
