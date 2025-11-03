import React from "react";

function ProcessButton({ onProcess, onProcessPlay }) {
    return (
        <>
            <button id="process" className="btn btn-outline-primary" onClick={onProcess}>Preprocess</button>
            <button id="process_play" className="btn btn-outline-primary" onClick={onProcessPlay}>Proc & Play</button>
        </>
    );
}

export default ProcessButton;