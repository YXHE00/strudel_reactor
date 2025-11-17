import React, { useEffect, useState } from "react";
import InstrumentControl from './instrumentControl.js'
import EffectControl from "./effectControl.js";
import MixControl from "./mixControl.js";
import TempoControl from "./tempoControl.js";

function ControlsPanel({
    lineCount,
    lineModes,
    onChangeLineMode,
    effects,
    onEffectsChange,
}) {

    const [volume, setVolume] = useState(50);
    const [reverb, setReverb] = useState(50);
    const [bpm, setBpm] = useState(120);
    const [alert, setAlert] = useState({ show: false, type: "danger", msg: "" });

    const validateBpm = (v) => {
        if (v < 40 || v > 240) {
            setAlert({ show: true, type: "danger", msg: "BPM must be between 40 and 240." });
            return false;
        }
        return true;
    };

    //useEffect(() => {
    //    const onKey = (e) => {
    //        const tag = (e.target.tagName || "").toLowerCase();
    //        const type = (e.target.type || "").toLowerCase();

    //        if (tag === "textarea") return;
    //        if (tag === "input" && (type === "text" || type === "number")) return;

    //        // Handle save/load/clear
    //        //if (e.key.toLowerCase() === "s") { e.preventDefault(); handleSave(); }
    //        //if (e.key.toLowerCase() === "l") { e.preventDefault(); handleLoad(); }
    //        //if (e.key.toLowerCase() === "x") {e.preventDefault(); handleClear(); }

    //        // Effects hotkeys
    //        if (e.key === "r") setEffects(prev => ({ ...prev, reverb: !prev.reverb }));
    //        if (e.key === "e") setEffects(prev => ({ ...prev, delay: !prev.delay }));
    //        if (e.key === "c") setEffects(prev => ({ ...prev, chorus: !prev.chorus }));
    //        if (e.key === "d") setEffects(prev => ({ ...prev, dist: !prev.dist }));

    //        // Use arrow up to volume + 2
    //        if (e.key === "ArrowUp") { e.preventDefault(); setVolume(prev => Math.min(prev + 2, 100));}

    //        // Use arrow down to volume -2
    //        if (e.key === "ArrowDown") { e.preventDefault();  setVolume(prev => Math.max(prev - 2, 0));}

    //        // Use arrow right to reverb +2
    //        if (e.key === "ArrowRight") {setReverb(prev => Math.min(prev + 2, 100));}

    //        // Use arrow left to reverb -2
    //        if (e.key === "ArrowLeft") {setReverb(prev => Math.max(prev - 2, 0));}

    //        if (e.key === "+") setBpm(v => Math.min(v + 1, 240));
    //        if (e.key === "-") setBpm(v => Math.max(v - 1, 40));
    //    };
    //    window.addEventListener("keydown", onKey);
    //    return () => window.removeEventListener("keydown", onKey);
    //}, [handleSave, handleLoad]);

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
                    <EffectControl selected={effects} onChange={onEffectsChange} />
                </div>

                {/* Mix */}
                <div className="accordion-item">
                    <MixControl volume={volume} onVolumeChange={setVolume} reverb={reverb} onReverbChange={setReverb} />
                </div>

                {/* Tempo */}
                <div className="accordion-item">
                    <TempoControl value={bpm} onChange={setBpm} validate={validateBpm} />
                </div>
            </div> 
        </div>


    );
}

export default ControlsPanel;
