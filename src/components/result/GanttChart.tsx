import { useContext, useEffect, useRef } from "react";
import {
    GanttChartObserverContext,
    ProcessQueueControllerContext,
    SchedulerResultContext,
    useWindowSize,
} from "@hooks/index";
import { MultiLevelQueueScheduler } from "@scheduler/index";

/**
 * The Gantt chart component.
 */
export default function GanttChart() {
    const { state: observer } = useContext(GanttChartObserverContext);
    const { state: controllers } = useContext(ProcessQueueControllerContext);
    const { state: schedulerResult, setState: setSchedulerResult } = useContext(
        SchedulerResultContext
    );

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [width, height] = useWindowSize();

    useEffect(() => {
        const scheduler = new MultiLevelQueueScheduler();

        for (const controller of controllers) {
            scheduler.add(controller.toQueue());
        }

        const result = scheduler.run();

        setSchedulerResult(result);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [observer]);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;

        canvas.width = document.body.offsetWidth;
        canvas.height = innerHeight / 8;

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const ctx = canvas.getContext("2d")!;

        ctx.reset();

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "lightblue";

        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (!schedulerResult || schedulerResult.ganttChartData.length === 0) {
            return;
        }

        const { ganttChartData: data } = schedulerResult;

        // Configure the step of the chart.
        const duration = data[data.length - 1].endTime - data[0].startTime;

        // Reserve 1.5% of the canvas width on each side for padding.
        const step = (canvas.width * 0.97) / Math.max(duration, 1);

        // Draw the chart.
        for (const item of data) {
            const width = (item.endTime - item.startTime) * step;
            const height = canvas.height / 2;

            const x =
                canvas.width * 0.015 +
                (item.startTime - data[0].startTime) * step;
            const y = (canvas.height - height) / 2;

            ctx.save();
            ctx.translate(x, y);

            ctx.save();
            ctx.fillStyle = "yellow";
            ctx.fillRect(0, 0, width, height);

            ctx.strokeStyle = "black";
            ctx.strokeRect(0, 0, width, height);

            // Clip the chart area so that the process label does not overflow.
            ctx.beginPath();
            ctx.rect(0, 0, width, height);
            ctx.clip();

            // Draw the process label.
            ctx.fillStyle = "black";
            ctx.font = "1em Torus, sans-serif";
            ctx.fillText(item.label, width / 2, height / 2);

            ctx.closePath();
            ctx.restore();

            // Draw the start time label in the bottom-left corner of the chart.
            ctx.font = "0.8em Torus, sans-serif";
            ctx.fillStyle = "black";

            const startTimeLabel = item.startTime.toString();
            const startTimeLabelMeasurement = ctx.measureText(startTimeLabel);
            const startTimeLabelHeight =
                Math.abs(startTimeLabelMeasurement.actualBoundingBoxAscent) +
                Math.abs(startTimeLabelMeasurement.actualBoundingBoxDescent);

            ctx.fillText(
                item.startTime.toString(),
                0,
                height + startTimeLabelHeight
            );

            if (item === data[data.length - 1]) {
                // Draw the end time label in the bottom-right corner of the chart.
                const endTimeLabel = item.endTime.toString();
                const endTimeLabelMeasurement = ctx.measureText(endTimeLabel);
                const endTimeLabelHeight =
                    Math.abs(endTimeLabelMeasurement.actualBoundingBoxAscent) +
                    Math.abs(endTimeLabelMeasurement.actualBoundingBoxDescent);

                ctx.fillText(
                    item.endTime.toString(),
                    width,
                    height + endTimeLabelHeight
                );
            }

            ctx.restore();
        }
    }, [schedulerResult, width, height]);

    return (
        <>
            <h2>Gantt Chart</h2>

            <canvas id="chart" ref={canvasRef}>
                Canvas is not supported by your browser.
            </canvas>
        </>
    );
}
