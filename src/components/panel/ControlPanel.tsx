import ProcessQueueControlPanelList from "./queue/ProcessQueueControlPanelList";
import ResultTable from "../result/ResultTable";
import "./ControlPanel.css";
import ControlPanelAddQueueButton from "./ControlPanelAddQueueButton";
import ControlPanelDownloadChartButton from "./ControlPanelDownloadChartButton";
import ControlPanelGoToResultTableButton from "./ControlPanelGoToResultTableButton";
import { useContext } from "react";
import { ProcessQueueControllerContext } from "@hooks/contexts";
import ControlPanelSortQueuePriorityButton from "./ControlPanelSortQueuePriorityButton";

/**
 * The main control panel for managing the process queues.
 */
export default function ControlPanel() {
    const { state: controllers } = useContext(ProcessQueueControllerContext);

    return (
        <>
            <h2>Controls</h2>

            <div className="control-panel">
                <div className="control-panel-buttons">
                    <ControlPanelAddQueueButton />
                    <ControlPanelDownloadChartButton />
                    <ControlPanelSortQueuePriorityButton />
                    <ControlPanelGoToResultTableButton />
                </div>

                <hr hidden={controllers.length === 0} />

                <div className="control-panel-grid">
                    <ProcessQueueControlPanelList />
                    <ResultTable />
                </div>
            </div>
        </>
    );
}
