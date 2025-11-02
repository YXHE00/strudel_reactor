import React from "react";

function EffectControl({ value, onChange }) {
    const toggleEffect = (key) => {
        if (!onChange) return;
        onChange({
            ...value,
            [key]: !value?.[key],
        });
    };

    return (
        <>
            <h2 className="accordion-header" id="headingEffects">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseEffects"
                    aria-expanded="false"
                    aria-controls="collapseEffects"
                >
                    Effects
                </button>
            </h2>

            <div
                id="collapseEffects"
                className="accordion-collapse collapse"
                aria-labelledby="headingEffects"
                data-bs-parent="#controlsAccordion"
            >
                <div className="accordion-body">
                    {[
                        { id: "fxReverb", key: "reverb", label: "Reverb (r)" },
                        { id: "fxDelay", key: "delay", label: "Delay (e)" },
                        { id: "fxChorus", key: "chorus", label: "Chorus (c)" },
                        { id: "fxDist", key: "dist", label: "Distortion (d)" },
                    ].map(({ id, key, label }) => (
                        <div className="form-check form-check-inline" key={id}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={id}
                                checked={!!value?.[key]}
                                onChange={() => toggleEffect(key)}
                            />
                            <label className="form-check-label" htmlFor={id}>
                                {label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default EffectControl;
