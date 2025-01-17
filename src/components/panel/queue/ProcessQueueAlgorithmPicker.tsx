import { ProcessQueueController, SchedulingAlgorithm } from "@scheduler/index";

interface Props {
    readonly controller: ProcessQueueController;
}

export default function ProcessQueueAlgorithmPicker(props: Props) {
    const { controller } = props;

    return (
        <div className="algorithm-picker">
            <label htmlFor={`algorithm-picker-${controller.id.toString()}`}>
                Algorithm:
            </label>

            <select
                id={`algorithm-picker-${controller.id.toString()}`}
                onChange={(e) => {
                    controller.algorithm = parseInt(
                        e.target.value
                    ) as SchedulingAlgorithm;
                }}
                defaultValue={controller.algorithm.toString()}
            >
                {(
                    [
                        [
                            "First Come First Serve (FCFS)",
                            SchedulingAlgorithm.firstComeFirstServe,
                        ],
                        [
                            "Shortest Job First (SJF)",
                            SchedulingAlgorithm.shortestJobFirst,
                        ],
                        [
                            "Shortest Remaining Time First (SRTF)",
                            SchedulingAlgorithm.shortestRemainingTimeFirst,
                        ],
                        ["Round Robin (RR)", SchedulingAlgorithm.roundRobin],
                        [
                            "Priority (non-preemptive)",
                            SchedulingAlgorithm.priorityNonPreemptive,
                        ],
                        [
                            "Priority (preemptive)",
                            SchedulingAlgorithm.priorityPreemptive,
                        ],
                    ] as const
                ).map((val) => {
                    const [display, algorithm] = val;

                    return (
                        <option key={algorithm} value={algorithm}>
                            {display}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
