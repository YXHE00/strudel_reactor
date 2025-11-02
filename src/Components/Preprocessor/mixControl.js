import React from "react";

function MixControl({ volume, onVolumeChange, reverb, onReverbChange }) {
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
                    Mix Controls
                </button>
            </h2>

            <div
                id="collapseMix"
                className="accordion-collapse collapse"
                aria-labelledby="headingMix"
                data-bs-parent="#controlsAccordion"
            >
                <div className="accordion-body">
                    <div className="mb-3">
                        <label htmlFor="volumeRange" className="form-label">
                            Volume(up/down): {volume}
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            id="volumeRange"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => onVolumeChange?.(+e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="reverbRange" className="form-label">
                            Reverb(left/Right): {reverb}
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            id="reverbRange"
                            min="0"
                            max="100"
                            value={reverb}
                            onChange={(e) => onReverbChange?.(+e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MixControl;