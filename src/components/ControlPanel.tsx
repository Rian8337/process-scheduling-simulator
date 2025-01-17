import { useContext } from "react";
import {
    AvailablePriorityContext,
    ProcessQueueControllerContext,
    SchedulerResultContext,
} from "../hooks";
import { MultiLevelQueueScheduler, ProcessQueueController } from "../scheduler";
import "./ControlPanel.css";
import ProcessQueueControlPanelList from "./queue/ProcessQueueControlPanelList";

/**
 * The main control panel for managing the process queues.
 */
export default function ControlPanel() {
    const { state: controllers, setState: setControllers } = useContext(
        ProcessQueueControllerContext
    );

    const { setState: setSchedulerResult } = useContext(SchedulerResultContext);

    const { state: availablePriorities, setState: setAvailablePriorities } =
        useContext(AvailablePriorityContext);

    function generateSchedulerResult() {
        const scheduler = new MultiLevelQueueScheduler();

        for (const controller of controllers) {
            scheduler.add(controller.toQueue());
        }

        const result = scheduler.run();

        setSchedulerResult(result);
    }

    return (
        <div className="control-panel">
            <button
                type="button"
                id="add-queue"
                onClick={() => {
                    // Use the first available priority.
                    const controller = new ProcessQueueController(
                        availablePriorities[0]
                    );

                    setControllers([...controllers, controller]);
                    setAvailablePriorities(availablePriorities.slice(1));
                }}
                disabled={availablePriorities.length === 0}
            >
                Add Queue
            </button>

            <button
                type="button"
                id="update-chart"
                onClick={generateSchedulerResult}
            >
                Update Chart
            </button>

            <ProcessQueueControlPanelList />
        </div>
    );
}
