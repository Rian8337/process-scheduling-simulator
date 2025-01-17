import { SchedulerResultContext } from "@hooks/index";
import { useContext } from "react";

export default function ControlPanelDownloadChartButton() {
    const { state: schedulerResult } = useContext(SchedulerResultContext);

    return (
        <button
            type="button"
            id="download-chart"
            hidden={
                !schedulerResult || schedulerResult.ganttChartData.length === 0
            }
            onClick={() => {
                const canvas = document.getElementById(
                    "chart"
                ) as HTMLCanvasElement;

                canvas.toBlob((blob) => {
                    if (!blob) {
                        return;
                    }

                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");

                    a.href = url;
                    a.download = "chart.png";
                    a.click();

                    URL.revokeObjectURL(url);
                });
            }}
        >
            Download Chart
        </button>
    );
}
