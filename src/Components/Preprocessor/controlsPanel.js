import React, { useEffect, useState } from "react";
import InstrumentControl from './instrumentControl.js'
import EffectControl from "./effectControl.js";
import MixControl from "./mixControl.js";
import TempoControl from "./tempoControl.js";

function ControlsPanel() {

    const [instrumentCombo, setInstrumentCombo] = useState("combo1");
    const [effects, setEffects] = useState({
        reverb: false, delay: false, chorus: false, dist: false
    });
    const [volume, setVolume] = useState(50);
    const [reverb, setReverb] = useState(50);
    const [bpm, setBpm] = useState(120);
    const [alert, setAlert] = useState({ show: false, type: "danger", msg: "" });

    const handleSave = () => {
        const payload = { instrumentCombo, effects, volume, reverb, bpm };
        localStorage.setItem("music-settings", JSON.stringify(payload));
        setAlert({ show: true, type: "success", msg: "Settings saved." });
    };

    const handleLoad = () => {
        const raw = localStorage.getItem("music-settings");
        if (!raw) {
            setAlert({ show: true, type: "warning", msg: "No saved settings found." });
            return;
        }
        try {
            const obj = JSON.parse(raw);
            setInstrumentCombo(obj.instrumentCombo ?? "combo1");
            setEffects(obj.effects ?? effects);
            setVolume(obj.volume ?? 70);
            setReverb(obj.reverb ?? 30);
            setBpm(obj.bpm ?? 120);
            setAlert({ show: true, type: "success", msg: "Settings loaded." });
        } catch {
            setAlert({ show: true, type: "danger", msg: "Failed to parse saved settings." });
        }
    };

    const handleClear = () => {
        localStorage.removeItem("music-settings");

        setInstrumentCombo("combo1");
        setEffects({ reverb: true, delay: false, chorus: false, dist: false });
        setVolume(50);
        setReverb(50);
        setBpm(120);

        setAlert({show: true, type: "warning", msg: "Settings cleared.",
        });
    };

    const validateBpm = (v) => {
        if (v < 40 || v > 240) {
            setAlert({ show: true, type: "danger", msg: "BPM must be between 40 and 240." });
            return false;
        }
        return true;
    };

    useEffect(() => {
        const onKey = (e) => {
            const tag = (e.target.tagName || "").toLowerCase();
            const type = (e.target.type || "").toLowerCase();

            if (tag === "textarea") return;
            if (tag === "input" && (type === "text" || type === "number")) return;

            // Handle save/load/clear
            if (e.key.toLowerCase() === "s") { e.preventDefault(); handleSave(); }
            if (e.key.toLowerCase() === "l") { e.preventDefault(); handleLoad(); }
            if (e.key.toLowerCase() === "x") {e.preventDefault(); handleClear(); }

            // Use 1 2 3 change the Instrument combo
            if (e.key === "1") setInstrumentCombo("combo1");
            if (e.key === "2") setInstrumentCombo("combo2");
            if (e.key === "3") setInstrumentCombo("combo3");

            // Effects hotkeys
            if (e.key === "r") setEffects(prev => ({ ...prev, reverb: !prev.reverb }));
            if (e.key === "e") setEffects(prev => ({ ...prev, delay: !prev.delay }));
            if (e.key === "c") setEffects(prev => ({ ...prev, chorus: !prev.chorus }));
            if (e.key === "d") setEffects(prev => ({ ...prev, dist: !prev.dist }));

            // Use arrow up to volume + 2
            if (e.key === "ArrowUp") { e.preventDefault(); setVolume(prev => Math.min(prev + 2, 100));}

            // Use arrow down to volume -2
            if (e.key === "ArrowDown") { e.preventDefault();  setVolume(prev => Math.max(prev - 2, 0));}

            // Use arrow right to reverb +2
            if (e.key === "ArrowRight") {setReverb(prev => Math.min(prev + 2, 100));}

            // Use arrow left to reverb -2
            if (e.key === "ArrowLeft") {setReverb(prev => Math.max(prev - 2, 0));}

            if (e.key === "+") setBpm(v => Math.min(v + 1, 240));
            if (e.key === "-") setBpm(v => Math.max(v - 1, 40));
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [handleSave, handleLoad]);

    return (
        <div className="container py-3">
            <div className="accordion" id="controlsAccordion">
                {/* Instruments */}
                <div className="accordion-item">
                    <InstrumentControl value={instrumentCombo} onChange={setInstrumentCombo} />
                </div>

                {/* Effects */}
                <div className="accordion-item">
                    <EffectControl value={effects} onChange={setEffects} />
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

            {/* Test pre-view (need delete this part later) */}
            {/*<div className="mt-3">*/}
            {/*    <code className="d-block">*/}
            {/*        {JSON.stringify({ instrumentCombo, effects, volume, reverb, bpm }, null, 2)}*/}
            {/*    </code>*/}
            {/*</div>*/}

            {/* Save and Load alert */}
            {alert.show && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    {alert.msg}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setAlert({ ...alert, show: false })}
                    />
                </div>
            )}

            {/* Save and Load button */}
            <div className="d-flex gap-2 mb-3">
                <button className="btn btn-primary" onClick={handleSave} title="Hotkey: S">
                    Save (s)
                </button>
                <button className="btn btn-outline-primary" onClick={handleLoad} title="Hotkey: L">
                    Load (l)
                </button>
                <button className="btn btn-outline-danger" onClick={handleClear}>
                    Clear (x)
                </button>
            </div>

        </div>


    );
}

export default ControlsPanel;
