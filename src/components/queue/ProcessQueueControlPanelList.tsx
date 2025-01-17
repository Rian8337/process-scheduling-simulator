import { useContext } from "react";
import ProcessQueueControlPanel from "./ProcessQueueControlPanel";
import { ProcessQueueControllerContext } from "../../hooks";
import "./ProcessQueueControlPanelList.css";

export default function ProcessQueueControlPanelList() {
    const { state: controllers } = useContext(ProcessQueueControllerContext);

    return (
        <div className="queue-list">
            {controllers.map((controller) => (
                <ProcessQueueControlPanel
                    key={`queue-control-panel-${controller.id.toString()}`}
                    controller={controller}
                />
            ))}
        </div>
    );
}
