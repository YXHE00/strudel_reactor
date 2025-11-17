import { useEffect, useState } from "react";

function TempoControl({ value, onTempoChange }) {
    const initialBpm = value.bpm;
    const initialBpc = value.bpc;

    const [draftBpm, setDraftBpm] = useState(initialBpm);
    const [draftBpc, setDraftBpc] = useState(initialBpc);

    useEffect(() => {
        setDraftBpm(initialBpm);
        setDraftBpc(initialBpc);
    }, [initialBpm, initialBpc]);

    const limitBpm = (v) => Math.max(40, Math.min(180, v));
    const limitBpc = [1, 2, 4, 8];

    const handleBpmInput = (e) => {
        setDraftBpm(Number(e.target.value));
    };

    const handleBpmStep = (delta) => {
        setDraftBpm((prev) => limitBpm(Number(prev) + delta));
    };

    const handleBpcInput = (e) => {
        setDraftBpc(Number(e.target.value));
    };

    const handleBpcStep = (direction) => {
        const current = Number(draftBpc);
        let idx = limitBpc.indexOf(current);
        if (idx === -1) {
            idx = 4;
        }
        const nextIndex = Math.min(
            limitBpc.length - 1,
            Math.max(0, idx + direction)
        );

        const nextBpc = limitBpc[nextIndex];
        setDraftBpc(nextBpc);
    };

    const handleApply = () => {
        const bpmNum = Number(draftBpm);
        const bpcNum = Number(draftBpc);

        if (Number.isNaN(bpmNum) || bpmNum < 40 || bpmNum > 180) {
            alert("BPM must be a number between 40 and 180");
            return;
        }

        if (Number.isNaN(bpcNum) || !limitBpc.includes(bpcNum)) {
            alert("BPC must be one of 1, 2, 4, 8");
            return;
        }
        onTempoChange({ bpm: bpmNum, bpc: bpcNum });
    };

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
                        <input className="form-control text-center" min={40} max={180} value={draftBpm} onChange={handleBpmInput} />
                        <button className="btn btn-outline-secondary" type="button" onClick={() => handleBpmStep(-10)}>
                            -
                        </button>
                        <button className="btn btn-outline-secondary" type="button" onClick={() => handleBpmStep(+10)}>
                            +
                        </button>
                    </div>

                    <div className="input-group mt-3" style={{ maxWidth: 260 }}>
                        <span className="input-group-text">BPC</span>                        
                        <input className="form-control text-center" min={1} max={8} value={draftBpc} onChange={handleBpcInput} />
                        <button className="btn btn-outline-secondary" type="button" onClick={() => handleBpcStep(-1)}>
                            -
                        </button>
                        <button className="btn btn-outline-secondary" type="button" onClick={() => handleBpcStep(+1)}>
                            +
                        </button>
                    </div>

                    <button type="button" className="btn btn-primary mt-3" onClick={handleApply}>
                        Apply
                    </button>
                </div>
            </div>
        </>
    );
}

export default TempoControl;