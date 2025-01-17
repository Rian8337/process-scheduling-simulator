import Footer from "@components/Footer";
import ControlPanel from "@components/panel/ControlPanel";
import GanttChart from "@components/result/GanttChart";
import ScrollToTop from "@components/ScrollToTop";

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
            <ScrollToTop />
        </>
    );
}
