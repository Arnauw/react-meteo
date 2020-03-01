import React from 'react';
import './App.css';
import './Day';

function Period(props) {
    return (
            <div className="d-flex justify-content-center">
                <nav aria-label="...">
                    <ul className="pagination pagination-lg">
                        {props.children}
                    </ul>
                </nav>
            </div>
    );
}

export default Period;