import {
    ProcessController,
    ProcessQueueController,
    SchedulingAlgorithm,
} from "../../scheduler";

interface Props {
    readonly queueController: ProcessQueueController;
    readonly controller: ProcessController;
}

export default function ProcessPriorityInput(props: Props) {
    const { queueController, controller } = props;

    return (
        <div
            className="process-priority"
            hidden={
                queueController.algorithm !==
                    SchedulingAlgorithm.priorityNonPreemptive &&
                queueController.algorithm !==
                    SchedulingAlgorithm.priorityPreemptive
            }
        >
            <label htmlFor={`process-priority-${controller.name}`}>
                Priority:
            </label>

            <input
                id={`process-priority-${controller.name}`}
                className="process-time-input"
                type="number"
                min={-20}
                max={19}
                step={1}
                defaultValue={controller.processPriority.toString()}
                onChange={(e) => {
                    controller.processPriority = parseInt(e.target.value);
                }}
            />
        </div>
    );
}
