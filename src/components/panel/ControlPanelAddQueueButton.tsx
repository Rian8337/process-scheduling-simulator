import {
    AvailablePriorityContext,
    ProcessQueueControllerContext,
} from "@hooks/index";
import { ProcessQueueController } from "@scheduler/index";
import { useContext } from "react";

export default function ControlPanelAddQueueButton() {
    const { state: controllers, setState: setControllers } = useContext(
        ProcessQueueControllerContext
    );

    const { state: availablePriorities, setState: setAvailablePriorities } =
        useContext(AvailablePriorityContext);

    return (
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
    );
}
