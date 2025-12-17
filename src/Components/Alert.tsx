type AlertColor = "primary" | "secondary" | "success" | "warning" |
    "danger" | "light" | "dark" | "info" | "muted" | "white";

interface AlertProps {
    title?: boolean | string;
    color?: AlertColor;
    pContent?: string;
    bottomContent?: string;
}

export function AlertSucces({title = true, color = "success", pContent = "Error"}: AlertProps) {
    return (
        <div className={`alert alert-${color}`} role="alert">
            {title ? <h4 className="alert-heading">{typeof title === 'string' ? title : "Success"}</h4> : null}

            <p>{pContent}</p>
            <hr/>
            <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
        </div>
    );
}

export function AlertError({
                               title = true,
                               color = "danger",
                               pContent = "Error",
                               bottomContent = "La ville n'existe pas"
                           }: AlertProps) {
    return (
        <div className={`text-center alert alert-${color}`} role="alert">
            {title ? <h4 className="alert-heading">Error !</h4> : ""}

            <p>{pContent}</p>
            <hr/>
            <p className="mb-0">{bottomContent}</p>
        </div>
    );
}
