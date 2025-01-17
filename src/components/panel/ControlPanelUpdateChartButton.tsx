import {
    ProcessQueueControllerContext,
    SchedulerResultContext,
} from "@hooks/index";
import { MultiLevelQueueScheduler } from "@scheduler/index";
import { useContext } from "react";

export default function ControlPanelUpdateChartButton() {
    const { state: controllers } = useContext(ProcessQueueControllerContext);
    const { setState: setSchedulerResult } = useContext(SchedulerResultContext);

    function generateSchedulerResult() {
        const scheduler = new MultiLevelQueueScheduler();

        for (const controller of controllers) {
            scheduler.add(controller.toQueue());
        }

        const result = scheduler.run();

        setSchedulerResult(result);
    }

    return (
        <button
            type="button"
            id="update-chart"
            onClick={generateSchedulerResult}
        >
            Update Chart
        </button>
    );
}
