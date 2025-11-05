import React from "react";

function ProcessButton({ onProcess, onProcessPlay }) {
    return (
        <>
            <div className="btn-group shadow-sm overflow-hidden">
                <button
                    id="process"
                    type="button"
                    className="btn btn-outline-secondary px-3"
                    onClick={onProcess}
                    title="Preprocess"
                    data-bs-toggle="tooltip"
                    aria-label="Preprocess"
                >
                    <i class="bi bi-arrow-counterclockwise"></i>
                    Preprocess
                </button>

                <button
                    id="process_play"
                    type="button"
                    className="btn btn-outline-dark px-3"
                    onClick={onProcessPlay}
                    title="Proc & Play"
                    data-bs-toggle="tooltip"
                    aria-label="Proc & Play"
                >
                    <i class="bi bi-caret-right-square"></i>
                    Proc&Play
                </button>
            </div>
        </>
    );
}

export default ProcessButton;