import React from "react";

function InstrumentControl({ value, onChange }) {
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
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="value"
                            id="combo1"
                            checked={value === "combo1"}
                            onChange={() => onChange("combo1")}
                        />
                        <label className="form-check-label" htmlFor="combo1">
                            Combo 1
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="value"
                            id="combo1"
                            checked={value === "combo2"}
                            onChange={() => onChange("combo2")}
                        />
                        <label className="form-check-label" htmlFor="combo2">
                            Combo 2
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="value"
                            id="combo1"
                            checked={value === "combo3"}
                            onChange={() => onChange("combo3")}
                        />
                        <label className="form-check-label" htmlFor="combo3">
                            Combo 3
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InstrumentControl;