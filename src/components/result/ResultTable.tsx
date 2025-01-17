import { SchedulerResultContext } from "@hooks/index";
import { useContext } from "react";
import "./ResultTable.css";

export default function ResultTable() {
    const { state: schedulerResult } = useContext(SchedulerResultContext);

    if (!schedulerResult) {
        return null;
    }

    return (
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
                {schedulerResult.ganttChartData.map((item) => (
                    <tr key={item.process.label}>
                        <td>{item.process.label}</td>
                        <td>{item.process.arrivalTime}</td>
                        <td>{item.process.burstTime}</td>
                        <td>
                            {schedulerResult.waitingTime[item.process.label]}
                        </td>
                        <td>
                            {schedulerResult.turnaroundTime[item.process.label]}
                        </td>
                        <td>{item.endTime}</td>
                        <td>
                            {schedulerResult.responseTime[item.process.label]}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
