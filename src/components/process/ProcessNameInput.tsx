import { ProcessController } from "../../scheduler";

interface Props {
    readonly controller: ProcessController;
}

export default function ProcessNameInput(props: Props) {
    const { controller } = props;

    return (
        <div className="process-name">
            <label htmlFor={`process-label-${controller.name}`}>Label:</label>

            <input
                id={`process-label-${controller.name}`}
                className="process-label"
                type="text"
                defaultValue={controller.name}
                onChange={(e) => {
                    controller.name = e.target.value;
                }}
            />
        </div>
    );
}
