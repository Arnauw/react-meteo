import React from "react";
import PropTypes from "prop-types";

export function AlertSucces({title = true, color = "success", pContent = "Error"}) {

    return <div className={`alert alert-${color}`} role="alert">

        {title ? <h4 className="alert-heading">{title}</h4> : null}
        {/*{title && <h4 className="alert-heading">{title}</h4>}*/}

        <p>{pContent}</p>
        <hr/>
            <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
    </div>
}

export function AlertError({title = true, color = "danger", pContent = "Error"}) {

    return <div className={`text-center alert alert-${color}`} role="alert">

        {title ? <h4 className="alert-heading">Error !</h4> : ""}

        <p>{pContent}</p>
        <hr/>
        <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
    </div>
}



AlertSucces.propTypes = {
    title: PropTypes.bool,
    color: PropTypes.oneOf(["primary", "secondary", "success",
        "warning", "danger", "light", "dark", "info", "muted", "white"]),
    pContent: PropTypes.string
};

AlertError.propTypes = {
    title: PropTypes.bool,
    color: PropTypes.oneOf(["primary", "secondary", "success",
        "warning", "danger", "light", "dark", "info", "muted", "white"]),
    pContent: PropTypes.string
};