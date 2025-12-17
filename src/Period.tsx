import './App.css';
import './Day.tsx';
import type {ReactNode} from "react";

type PeriodProps = {
    children: ReactNode;
}

export function Period({children}: PeriodProps) {
    return (
            <div className="days-container">
                <nav className={"days-nav"} aria-label="...">
                    <ul className="d-flex justify-content-center">
                        {children}
                    </ul>
                </nav>
            </div>
    );
}