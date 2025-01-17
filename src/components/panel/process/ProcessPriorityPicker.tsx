import {
    Priorities,
    priorities,
    ProcessController,
    ProcessQueueController,
    SchedulingAlgorithm,
} from "@scheduler/index";

interface Props {
    readonly queueController: ProcessQueueController;
    readonly controller: ProcessController;
}

export default function ProcessPriorityPicker(props: Props) {
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

            <select
                id={`process-priority-${controller.name}`}
                defaultValue={controller.processPriority.toString()}
                onChange={(e) => {
                    controller.processPriority = parseInt(
                        e.target.value
                    ) as Priorities;
                }}
            >
                {priorities.map((priority) => (
                    <option
                        key={`process-priority-${controller.name}-${priority.toString()}`}
                        value={priority.toString()}
                    >
                        {priority}
                    </option>
                ))}
            </select>
        </div>
    );
}
