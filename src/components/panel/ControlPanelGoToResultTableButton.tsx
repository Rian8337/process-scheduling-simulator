import { SchedulerResultContext, useWindowSize } from "@hooks/index";
import { useContext } from "react";

export default function ControlPanelGoToResultTableButton() {
    const { state: schedulerResult } = useContext(SchedulerResultContext);
    const [width] = useWindowSize();

    return (
        <button
            type="button"
            id="go-to-result-table"
            hidden={
                width >= 1000 ||
                !schedulerResult ||
                schedulerResult.ganttChartData.length === 0
            }
            onClick={() => {
                window.location.hash = "result-table";
            }}
        >
            Go to Result Table
        </button>
    );
}
