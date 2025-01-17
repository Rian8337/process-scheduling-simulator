import { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import "./ScrollToTop.css";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        function onScroll() {
            setVisible(document.documentElement.scrollTop > 300);
        }

        addEventListener("scroll", onScroll);

        return () => {
            removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <FaArrowCircleUp
            className="scroll-to-top"
            style={{
                display: visible ? "inline" : "none",
            }}
            onClick={() => {
                scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }}
        />
    );
}
