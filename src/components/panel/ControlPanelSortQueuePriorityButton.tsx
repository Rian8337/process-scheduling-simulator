import { ProcessQueueControllerContext } from "@hooks/contexts";
import { useContext } from "react";

export default function ControlPanelSortQueuePriorityButton() {
    const { state: controllers, setState: setControllers } = useContext(
        ProcessQueueControllerContext
    );

    return (
        <button
            type="button"
            className="sort-queue-priority-button"
            hidden={controllers.length <= 1}
            onClick={() => {
                setControllers(
                    controllers.slice().sort((a, b) => a.priority - b.priority)
                );
            }}
        >
            Sort Queue by Priority (Highest to Lowest)
        </button>
    );
}
