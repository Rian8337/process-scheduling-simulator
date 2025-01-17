import { useObserver } from "@hooks/index";
import { ProcessQueueController } from "@scheduler/index";
import ProcessControlPanelList from "../process/ProcessControlPanelList";
import ProcessQueueAddProcessButton from "./ProcessQueueAddProcessButton";
import ProcessQueueAlgorithmPicker from "./ProcessQueueAlgorithmPicker";
import "./ProcessQueueControlPanel.css";
import ProcessQueuePriorityPicker from "./ProcessQueuePriorityPicker";
import ProcessQueueQuantumPicker from "./ProcessQueueQuantumPicker";
import ProcessQueueRemoveQueueButton from "./ProcessQueueRemoveQueueButton";

interface Props {
    readonly controller: ProcessQueueController;
}

/**
 * Represents the control panel of a process queue.
 */
export default function ProcessQueueControlPanel(props: Props) {
    const { controller } = props;

    useObserver(controller);

    return (
        <div className="queue-controller">
            <ProcessQueueAlgorithmPicker controller={controller} />
            <ProcessQueuePriorityPicker controller={controller} />
            <ProcessQueueQuantumPicker controller={controller} />
            <ProcessQueueAddProcessButton controller={controller} />
            <ProcessQueueRemoveQueueButton controller={controller} />

            <ProcessControlPanelList controller={controller} />
        </div>
    );
}
