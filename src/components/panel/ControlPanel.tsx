import ProcessQueueControlPanelList from "./queue/ProcessQueueControlPanelList";
import ResultTable from "../result/ResultTable";
import "./ControlPanel.css";
import ControlPanelAddQueueButton from "./ControlPanelAddQueueButton";
import ControlPanelDownloadChartButton from "./ControlPanelDownloadChartButton";
import ControlPanelGoToResultTableButton from "./ControlPanelGoToResultTableButton";

/**
 * The main control panel for managing the process queues.
 */
export default function ControlPanel() {
    return (
        <div className="control-panel">
            <div className="control-panel-buttons">
                <ControlPanelAddQueueButton />
                <ControlPanelDownloadChartButton />
                <ControlPanelGoToResultTableButton />
            </div>

            <hr />

            <div className="control-panel-grid">
                <ProcessQueueControlPanelList />
                <ResultTable />
            </div>
        </div>
    );
}
