import { FaGithub } from "react-icons/fa6";
import "./Footer.css";
import React from "react";

function FooterLink(props: { href: string; icon: React.ReactNode }) {
    return (
        <a href={props.href} target="_blank" rel="noreferrer">
            {props.icon}
        </a>
    );
}

export default function Footer() {
    return (
        <footer>
            <div className="footer-links">
                <FooterLink
                    href="https://github.com/Rian8337/process-scheduling-simulator"
                    icon={<FaGithub size={"2em"} />}
                />
            </div>

            <p className="copyright">
                &copy; {new Date().getFullYear()} Rian8337
            </p>
        </footer>
    );
}
