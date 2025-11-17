import React from "react";

function VolumeSpeedControl({ mix, onMixChange, }) {
    const MIX_NAMES = ["volume", "speed"];
    return (
        <>
            <h2 className="accordion-header" id="headingMix">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseMix"
                    aria-expanded="false"
                    aria-controls="collapseMix"
                >
                    Volume & Speed
                </button>
            </h2>

            <div
                id="collapseMix"
                className="accordion-collapse collapse"
                aria-labelledby="headingMix"
                data-bs-parent="#controlsAccordion"
            >
                <div className="accordion-body">
                    {MIX_NAMES.map((name) => {
                        const value = mix?.[name] ?? 0;
                        const inputId = `${name}Range`;

                        return (
                            <div className="mb-3" key={name}>
                                <label
                                    htmlFor={inputId}
                                    className="form-label"
                                >
                                    {name}: {value}
                                </label>
                                <input
                                    type="range"
                                    className="form-range"
                                    id={inputId}
                                    min="0"
                                    max="10"
                                    value={value}
                                    onChange={(e) => {
                                        onMixChange?.({
                                            [name]: Number(e.target.value) === 0
                                                ? null
                                                : Number(e.target.value),
                                        });
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default VolumeSpeedControl;