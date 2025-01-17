import { ProcessQueueController } from "../../scheduler";
import ProcessControlPanel from "./ProcessControlPanel";

interface Props {
    readonly controller: ProcessQueueController;
}

export default function ProcessControlPanelList(props: Props) {
    const { controller } = props;

    return (
        <div className="process-list">
            {Array.from(controller.processes).map((process, i) => (
                <ProcessControlPanel
                    key={`process-control-panel-${controller.id.toString()}-${i.toString()}`}
                    queueController={controller}
                    controller={process}
                />
            ))}
        </div>
    );
}
