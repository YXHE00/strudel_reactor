import React, { useEffect, useState } from "react";
import InstrumentControl from './instrumentControl.js'
import EffectControl from "./effectControl.js";
import VolumeSpeedControl from "./volumeSpeedControl.js";
import TempoControl from "./tempoControl.js";

function ControlsPanel({
    lineCount,
    lineModes,
    onChangeLineMode,
    effects,
    onEffectsChange,
    mix,
    onMixChange,
    tempo,
    onTempoChange,
}) {

    return (
        <div className="container py-3">
            <div className="accordion" id="controlsAccordion">
                {/* Instruments */}
                <div className="accordion-item">
                    <InstrumentControl
                        count={lineCount}
                        lineModes={lineModes}
                        onChangeLineMode={onChangeLineMode}
                    />
                </div>

                {/* Effects */}
                <div className="accordion-item">
                    <EffectControl effects={effects} onEffectsChange={onEffectsChange} />
                </div>

                {/* Volume & Speed */}
                <div className="accordion-item">
                    <VolumeSpeedControl mix={mix} onMixChange={onMixChange} />
                </div>

                {/* Tempo */}
                <div className="accordion-item">
                    <TempoControl value={tempo} onTempoChange={onTempoChange} />
                </div>
            </div> 
        </div>


    );
}

export default ControlsPanel;
