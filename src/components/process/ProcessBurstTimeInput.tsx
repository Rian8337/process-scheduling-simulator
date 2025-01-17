import { ProcessController } from "../../scheduler";

interface Props {
    readonly controller: ProcessController;
}

export default function ProcessBurstTimeInput(props: Props) {
    const { controller } = props;

    return (
        <div className="burst-time">
            <label htmlFor={`burst-time-${controller.name}`}>Burst Time:</label>

            <input
                id={`burst-time-${controller.name}`}
                className="process-time-input"
                type="number"
                min={1}
                step={1}
                defaultValue={controller.burstTime.toString()}
                onBlur={(e) => {
                    if (e.target.value) {
                        controller.burstTime = e.target.valueAsNumber;
                    } else {
                        e.target.valueAsNumber = controller.burstTime;
                    }
                }}
            />
        </div>
    );
}
