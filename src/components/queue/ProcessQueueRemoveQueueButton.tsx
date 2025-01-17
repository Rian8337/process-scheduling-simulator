import { useContext } from "react";
import {
    AvailablePriorityContext,
    ProcessQueueControllerContext,
} from "../../hooks";
import { ProcessQueueController } from "../../scheduler";

interface Props {
    readonly controller: ProcessQueueController;
}

export default function ProcessQueueRemoveQueueButton(props: Props) {
    const { controller } = props;
    const { state: controllers, setState: setControllers } = useContext(
        ProcessQueueControllerContext
    );

    const { state: availablePriorities, setState: setAvailablePriorities } =
        useContext(AvailablePriorityContext);

    return (
        <button
            type="button"
            className="remove-queue-button"
            onClick={() => {
                if (!confirm("Are you sure you want to remove this queue?")) {
                    return;
                }

                setControllers(
                    controllers.filter((queue) => queue.id !== controller.id)
                );
                setAvailablePriorities(
                    availablePriorities
                        .concat(controller.priority)
                        .sort((a, b) => a - b)
                );
            }}
            disabled={controllers.length === 1}
            hidden={controllers.length === 1}
        >
            Remove Queue
        </button>
    );
}
