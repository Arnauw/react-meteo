type SpinnerColor = "primary" | "secondary" | "success" |
    "warning" | "danger" | "light" | "dark" | "info" | "muted" | "white";
type SpinnerType = "grow" | "border";

interface SpinnerProps {
    type?: SpinnerType;
    color?: SpinnerColor;
}

interface SimpleSpinnerProps {
    color?: SpinnerColor;
}

export function Spinner({type = "border", color = "primary"}: SpinnerProps) {
    return (
        <div className="d-flex justify-content-center mt-4">
            <div className={`spinner-${type} text-${color}`} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export function CircularSpinner({color}: SimpleSpinnerProps) {
    return <Spinner color={color} type="border"/>;
}

export function GrowSpinner({color}: SimpleSpinnerProps) {
    return <Spinner color={color} type="grow"/>;
}

export default Spinner;
