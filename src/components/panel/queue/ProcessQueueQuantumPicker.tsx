import { ProcessQueueController, SchedulingAlgorithm } from "@scheduler/index";

interface Props {
    readonly controller: ProcessQueueController;
}

export default function ProcessQueueQuantumPicker(props: Props) {
    const { controller } = props;

    return (
        <div
            className="quantum-picker"
            hidden={controller.algorithm !== SchedulingAlgorithm.roundRobin}
        >
            <label htmlFor={`quantum-${controller.id.toString()}`}>
                Quantum:
            </label>

            <input
                id={`quantum-${controller.id.toString()}`}
                type="number"
                min={1}
                step={1}
                defaultValue={controller.timeQuantum.toString()}
                onBlur={(e) => {
                    if (e.target.value) {
                        controller.timeQuantum = e.target.valueAsNumber;
                    } else {
                        e.target.valueAsNumber = controller.timeQuantum;
                    }
                }}
            />
        </div>
    );
}
