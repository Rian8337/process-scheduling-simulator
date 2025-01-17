import { ProcessController } from "@scheduler/index";

interface Props {
    readonly controller: ProcessController;
}

export default function ProcessArrivalTimeInput(props: Props) {
    const { controller } = props;

    return (
        <div className="arrival-time">
            <label htmlFor={`arrival-time-${controller.name}`}>
                Arrival Time:
            </label>

            <input
                id={`arrival-time-${controller.name}`}
                className="process-time-input"
                type="number"
                min={0}
                step={1}
                defaultValue={controller.arrivalTime.toString()}
                onBlur={(e) => {
                    if (e.target.value) {
                        controller.arrivalTime = e.target.valueAsNumber;
                    } else {
                        e.target.valueAsNumber = controller.arrivalTime;
                    }
                }}
            />
        </div>
    );
}
