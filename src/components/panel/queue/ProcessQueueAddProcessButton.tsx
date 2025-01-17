import { ProcessController, ProcessQueueController } from "@scheduler/index";

interface Props {
    readonly controller: ProcessQueueController;
}

export default function ProcessQueueAddProcessButton(props: Props) {
    const { controller } = props;

    return (
        <button
            type="button"
            className="add-process-button"
            onClick={() => {
                controller.addProcess(
                    new ProcessController(
                        `Q${controller.id.toString()}-P${(controller.processIncrementalId++).toString()}`,
                        controller.priority
                    )
                );
            }}
        >
            Add Process
        </button>
    );
}
