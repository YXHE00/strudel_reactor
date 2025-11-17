import React from "react";

function InstrumentControl({ count = 0, lineModes = [], onChangeLineMode }) {
    return (
        <>
            <h2 className="accordion-header" id="headingInstruments">
                <button className="accordion-button" type="button"
                    data-bs-toggle="collapse" data-bs-target="#collapseInstruments"
                    aria-expanded="true" aria-controls="collapseInstruments">
                    Instrument Combinations
                </button>
            </h2>
            <div id="collapseInstruments" className="accordion-collapse collapse"
                aria-labelledby="headingInstruments" data-bs-parent="#controlsAccordion">
                <div className="accordion-body">
                    {count === 0 ? (
                        <div className="text-muted">Null</div>
                    ) : (
                        Array.from({ length: count }, (_, i) => {
                            const lineNo = i + 1;
                            const baseId = `instr-${lineNo}`;
                            const name = `line-${lineNo}`;
                            const mode = lineModes[i] || "play";

                            return (
                                <div className="d-flex align-items-center gap-3 mb-2" key={baseId}>
                                    <label className="fw-semibold mb-0">Line {lineNo}:</label>

                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name={name}
                                            id={`${baseId}-play`}
                                            checked={mode === "play"}
                                            onChange={() => onChangeLineMode?.(lineNo, "play")}
                                        />
                                        <label className="form-check-label" htmlFor={`${baseId}-play`}>
                                            Play
                                        </label>
                                    </div>

                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name={name}
                                            id={`${baseId}-mute`}
                                            checked={mode === "mute"}
                                            onChange={() => onChangeLineMode?.(lineNo, "mute")}
                                        />
                                        <label className="form-check-label" htmlFor={`${baseId}-mute`}>
                                            Mute
                                        </label>
                                    </div>

                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name={name}
                                            id={`${baseId}-rev`}
                                            checked={mode === "rev"}
                                            onChange={() => onChangeLineMode?.(lineNo, "rev")}
                                        />
                                        <label className="form-check-label" htmlFor={`${baseId}-rev`}>
                                            Reverse
                                        </label>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
}

export default InstrumentControl;