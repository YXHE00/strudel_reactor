import React from "react";

function PlayStopButton({ onPlay, onStop }) {
    return (
        <>
            <div className="btn-group shadow-sm overflow-hidden">
                <button
                    id="play"
                    type="button"
                    className="btn btn-success px-3"
                    onClick={onPlay}
                    title="Play"
                    aria-label="Play"
                >
                    <i className="bi bi-play-fill me-1" />
                    Play
                </button>
                <button
                    id="stop"
                    type="button"
                    className="btn btn-outline-danger px-3"
                    onClick={onStop}
                    title="Stop"
                    aria-label="Stop"
                >
                    <i className="bi bi-stop-fill me-1" />
                    Stop
                </button>
            </div>
        </>
    );
}

export default PlayStopButton;