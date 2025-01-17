import { GanttChartObserverContext } from "@hooks/index";
import { ProcessController, ProcessQueueController } from "@scheduler/index";
import { useContext, useEffect } from "react";
import ProcessArrivalTimeInput from "./ProcessArrivalTimeInput";
import ProcessBurstTimeInput from "./ProcessBurstTimeInput";
import "./ProcessControlPanel.css";
import ProcessNameInput from "./ProcessNameInput";
import ProcessPriorityPicker from "./ProcessPriorityPicker";
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
    const { setState: setObserver } = useContext(GanttChartObserverContext);

    useEffect(() => {
        controller.observers.add(setObserver);

        return () => {
            controller.observers.delete(setObserver);
        };
    }, [controller.observers, setObserver]);

    return (
        <div className="process">
            <ProcessNameInput controller={controller} />
            <ProcessArrivalTimeInput controller={controller} />
            <ProcessBurstTimeInput controller={controller} />
            <ProcessPriorityPicker {...props} />
            <ProcessRemoveButton {...props} />
        </div>
    );
}
