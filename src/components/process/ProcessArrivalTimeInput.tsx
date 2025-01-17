import { ProcessController } from "../../scheduler";

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
                onChange={(e) => {
                    controller.arrivalTime = parseInt(e.target.value);
                }}
            />
        </div>
    );
}
