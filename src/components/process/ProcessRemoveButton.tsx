import { ProcessController, ProcessQueueController } from "../../scheduler";

interface Props {
    readonly queueController: ProcessQueueController;
    readonly controller: ProcessController;
}

export default function ProcessRemoveButton(props: Props) {
    const { queueController, controller } = props;

    return (
        <button
            type="button"
            className="remove-process-button"
            onClick={() => {
                queueController.removeProcess(controller);
            }}
        >
            Remove
        </button>
    );
}
