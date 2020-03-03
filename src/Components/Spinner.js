import React from "react";
import PropTypes from "prop-types";

export function Spinner({type = "border", color = "primary"}) {




    return(
        <div className="d-flex justify-content-center mt-4">
            <div className={`spinner-${type} text-${color}`} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

Spinner.propTypes = {
    color: PropTypes.oneOf(["primary", "secondary", "success",
        "warning", "danger", "light", "dark", "info", "muted", "white"]),
    type: PropTypes.oneOf(["grow", "border"])
};

// Spinner.defaultProps = {
//     type: "border",
//     color: "primary"
// };



export function CircularSpinner({color}) {

    return <Spinner color={color} type={"border"}/>
}

export function GrowSpinner({color}) {

    return <Spinner color={color} type={"grow"}/>
}

export default Spinner;