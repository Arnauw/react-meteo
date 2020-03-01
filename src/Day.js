import React from "react";


function Day(props) {
    let cls = "page-item"

    if (props.isActive){
        cls += " active"
    }


    return (
        <li className={cls}>
            <a className="page-link" href="#" onClick={(event) => {
                props.handleClick(props.label)

            }}>{props.label}</a>
        </li>
    );
}

export default Day;