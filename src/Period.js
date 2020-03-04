import React from 'react';
import './App.css';
import './Day';

export function Period({children}) {
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