import React from "react";


function Day(props) {
    let cls = "page-item";

    if (props.isActive){
        cls += " active"
    }


    return (
        <li className={cls}>
            <button className="page-link" href="" onClick={(event) => {
                props.handleClick(props.label)

            }}>{props.label}</button>
        </li>
    );
}

export default Day;