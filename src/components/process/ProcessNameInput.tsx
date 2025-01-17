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
                className="process-label-input"
                type="text"
                defaultValue={controller.name}
                onBlur={(e) => {
                    if (e.target.value) {
                        controller.name = e.target.value;
                    } else {
                        e.target.value = controller.name;
                    }
                }}
            />
        </div>
    );
}
