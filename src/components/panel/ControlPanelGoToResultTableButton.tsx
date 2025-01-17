import { SchedulerResultContext } from "@hooks/index";
import { useContext } from "react";

export default function ControlPanelGoToResultTableButton() {
    const { state: schedulerResult } = useContext(SchedulerResultContext);

    return (
        <button
            type="button"
            id="go-to-result-table"
            hidden={
                !schedulerResult || schedulerResult.ganttChartData.length === 0
            }
            onClick={() => {
                window.location.hash = "result-table";
            }}
        >
            Go to Result Table
        </button>
    );
}
