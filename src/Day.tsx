import type {MouseEvent} from 'react';

interface DayProps {
    label: string | number;
    isActive?: boolean;
    handleClick: (label: string | number) => void;
}

export function Day({ label, isActive = false, handleClick }: DayProps) {
    let cls = "page-item";

    if (isActive) {
        cls += " active";
    }

    return (
        <li className={cls}>
            <button
                className="page-link"
                type="button"
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                    handleClick(label);
                }}
            >
                {label}
            </button>
        </li>
    );
}
