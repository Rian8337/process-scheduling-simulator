import { useContext } from "react";
import { ProcessQueueController } from "../../scheduler";
import { AvailablePriorityContext } from "../../hooks";

interface Props {
    readonly controller: ProcessQueueController;
}

export default function ProcessQueuePriorityPicker(props: Props) {
    const { controller } = props;
    const { state: availablePriorities, setState: setAvailablePriorities } =
        useContext(AvailablePriorityContext);

    return (
        <div className="priority-picker">
            <label htmlFor={`priority-${controller.id.toString()}`}>
                Priority:
            </label>

            <select
                id={`priority-${controller.id.toString()}`}
                onChange={(e) => {
                    const selectedPriority = parseInt(e.target.value);

                    setAvailablePriorities(
                        availablePriorities
                            .filter((priority) => priority !== selectedPriority)
                            .concat(controller.priority)
                            .sort((a, b) => a - b)
                    );

                    controller.priority = selectedPriority;
                }}
                defaultValue={controller.priority.toString()}
            >
                {availablePriorities
                    // Ensure that the priority of the controller is available in the selection.
                    .concat(controller.priority)
                    .sort((a, b) => a - b)
                    .map((priority) => {
                        return (
                            <option key={priority} value={priority}>
                                {priority}
                            </option>
                        );
                    })}
            </select>
        </div>
    );
}
