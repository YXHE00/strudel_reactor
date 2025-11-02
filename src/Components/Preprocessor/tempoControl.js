import React from "react";

function TempoControl({ value, onChange, validate }) {
    const bpm = value ?? 120;

    return (
        <>
            <h2 className="accordion-header" id="headingTempo">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTempo"
                    aria-expanded="false"
                    aria-controls="collapseTempo"
                >
                    Tempo
                </button>
            </h2>

            <div
                id="collapseTempo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTempo"
                data-bs-parent="#controlsAccordion"
            >
                <div className="accordion-body">
                    <div className="input-group" style={{ maxWidth: 260 }}>
                        <span className="input-group-text">BPM</span>
                        <input
                            type="number"
                            className="form-control"
                            min={40}
                            max={240}
                            value={bpm}
                            onChange={(e) => {
                                const v = +e.target.value;
                                onChange?.(v);
                                validate?.(v);
                            }}
                        />

                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => {
                                const v = Math.min(bpm + 1, 240);
                                onChange?.(v);
                                validate?.(v);
                            }}
                        >
                            +
                        </button>

                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => {
                                const v = Math.max(bpm - 1, 40);
                                onChange?.(v);
                                validate?.(v);
                            }}
                        >
                            -
                        </button>
                    </div>

                    <small className="text-muted d-block mt-2">
                        Valid range: 40 - 240
                    </small>
                </div>
            </div>
        </>
    );
}

export default TempoControl;