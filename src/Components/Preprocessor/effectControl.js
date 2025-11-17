import React, { useRef } from "react";

function EffectControl({ effects = {}, onEffectsChange }) {
    const EFFECT_NAMES = ["room", "delay", "phaser", "duckorbit"];

    const EFFECT_OPTIONS = {
        room: [0, 0.2, 0.4, 0.6, 0.8, 1],
        delay: [0, 0.25, 0.5, 1],
        phaser: [1, 2, 4, 8],
        duckorbit: [1, 2, 4, 8, 10],
    };

    const lastValuesRef = useRef({});

    const handleCheckboxToggle = (name) => (e) => {
        const checked = e.target.checked;
        const current = effects[name]; 
        if (!checked) {
            if (current != null) {
                lastValuesRef.current[name] = current;
            }
            onEffectsChange?.({
                ...effects,
                [name]: null,
            });
            return;
        }
        const opts = EFFECT_OPTIONS[name];

        onEffectsChange?.({
            ...effects,
            [name]: lastValuesRef.current[name] ?? opts[0] ?? null,
        });
    };

    const handleSelectChange = (name) => (e) => {
        const value = e.target.value;
        const num = value === "" ? null : Number(value);

        if (num != null) {
            lastValuesRef.current[name] = num;
        }

        onEffectsChange?.({
            ...effects,
            [name]: num,
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
                    {EFFECT_NAMES.map((name) => {
                        const id = `fx-${name}`;
                        const isChecked = effects[name] != null;
                        const currentValue =
                            effects[name] != null
                                ? String(effects[name])
                                : lastValuesRef.current[name] != null
                                    ? String(lastValuesRef.current[name])
                                    : "";
                        return (
                            <div className="d-flex align-items-center mb-2" key={name}>
                                <div className="form-check me-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={id}
                                        checked={isChecked}
                                        onChange={handleCheckboxToggle(name)}
                                    />
                                    <label className="form-check-label" htmlFor={id}>
                                        {name}
                                    </label>
                                </div>
                                <select
                                    className="form-select form-select-sm w-auto"
                                    disabled={!isChecked}
                                    value={currentValue}
                                    onChange={handleSelectChange(name)}
                                >
                                    {EFFECT_OPTIONS[name].map((value) => (
                                        <option key={value} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default EffectControl;
