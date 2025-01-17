import GanttChart from "./components/result/GanttChart";
import ControlPanel from "./components/panel/ControlPanel";
import Footer from "@components/Footer";

export default function App() {
    return (
        <>
            <h1>Process Scheduling Simulator</h1>
            <hr />
            <GanttChart />
            <hr />
            <ControlPanel />
            <hr />
            <Footer />
        </>
    );
}
