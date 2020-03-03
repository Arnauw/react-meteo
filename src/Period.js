import React from 'react';
import './App.css';
import './Day';

export function Period({children}) {
    return (
            <div className="d-flex justify-content-center">
                <nav aria-label="...">
                    <ul className="pagination pagination-lg">
                        {children}
                    </ul>
                </nav>
            </div>
    );
}