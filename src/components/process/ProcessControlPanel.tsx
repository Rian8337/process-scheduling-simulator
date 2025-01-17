import { ProcessController, ProcessQueueController } from "../../scheduler";
import ProcessArrivalTimeInput from "./ProcessArrivalTimeInput";
import ProcessBurstTimeInput from "./ProcessBurstTimeInput";
import "./ProcessControlPanel.css";
import ProcessNameInput from "./ProcessNameInput";
import ProcessPriorityInput from "./ProcessPriorityInput";
import ProcessRemoveButton from "./ProcessRemoveButton";

interface Props {
    readonly queueController: ProcessQueueController;
    readonly controller: ProcessController;
}

/**
 * Represents the control panel of a process.
 */
export default function ProcessControlPanel(props: Props) {
    const { controller } = props;

    return (
        <div className="process">
            <ProcessNameInput controller={controller} />
            <ProcessArrivalTimeInput controller={controller} />
            <ProcessBurstTimeInput controller={controller} />
            <ProcessPriorityInput {...props} />
            <ProcessRemoveButton {...props} />
        </div>
    );
}
