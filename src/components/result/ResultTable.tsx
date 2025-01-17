import { SchedulerResultContext } from "@hooks/index";
import { useContext } from "react";
import "./ResultTable.css";

export default function ResultTable() {
    const { state: schedulerResult } = useContext(SchedulerResultContext);

    if (!schedulerResult || schedulerResult.ganttChartData.length === 0) {
        return null;
    }

    return (
        <div className="result-table-container">
            <table id="result-table" className="result-table">
                <thead>
                    <tr>
                        <th style={{ maxWidth: "30%" }}>Process</th>
                        <th>Arrival Time</th>
                        <th>Burst Time</th>
                        <th>Waiting Time</th>
                        <th>Turnaround Time</th>
                        <th>Exit Time</th>
                        <th>Response Time</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(schedulerResult.waitingTime).map((key, i) => {
                        const process = schedulerResult.processes[key];

                        return (
                            <tr key={`${key}-${i.toString()}`}>
                                <td>{key}</td>
                                <td>{process.arrivalTime}</td>
                                <td>{process.burstTime}</td>
                                <td>{schedulerResult.waitingTime[key]}</td>
                                <td>{schedulerResult.turnaroundTime[key]}</td>
                                <td>{schedulerResult.exitTime[key]}</td>
                                <td>{schedulerResult.responseTime[key]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
