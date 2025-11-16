import React, { useState, useEffect } from "react";
import BuildPatternString from "./buildPatternString";


export const TOKENS = ["bd", "sd", "rim", "hh", "oh", "lt", "mt", "ht", "rd", "cr", "~"];
const BANKS = ["RolandTR909", "RolandTR808", "RolandTR707", "RolandTR606", "RolandTR727", "CR78", "LinnDrum", "LinnLM1", "Linn9000", "OberheimDMX", "OberheimDX", "BossDR110", "BossDR220", "BossDR550", "BossDR660"];

function createSegment(type, tokens = []) {
    return { id: Math.random().toString(36).slice(2, 9), type, tokens };
}


function InputPattern({ segments = [], initialBank, onChange }) {
    const [localSegs, setLocalSegs] = useState(segments);
    const [bank, setBank] = useState(initialBank);

    useEffect(() => setLocalSegs(segments), [segments]);
    useEffect(() => setBank(initialBank), [initialBank]);

    const publishChange = (nextSegs, nextBank = bank) => {
        const pattern = BuildPatternString(nextSegs); 
        onChange?.(nextSegs, pattern, nextBank);
    };

    const addSegment = (type) => {
        setLocalSegs(prevState => {
            const updateState = [...prevState, createSegment(type)];
            publishChange(updateState);
            return updateState;
        });
    };

    const removeSegment = (id) => {
        setLocalSegs(prevState => {
            // New array without the id matches the selected `id`
            const updateState = prevState.filter(s => s.id !== id);
            publishChange(updateState);
            return updateState;
        });
    };

    const addToken = (segId) => {
        setLocalSegs(prevState => {
            const updateState = prevState.map(s => {
                if (s.id !== segId) return s;
                if (s.type === "single") return s;
                // Copy all existing fields and append an empty token
                return { ...s, tokens: [...(s.tokens || []), ""] };
            });
            publishChange(updateState);
            return updateState;
        });
    };

    const updateToken = (segId, index, value) => {
        setLocalSegs(prevState => {
            const updateState = prevState.map(s => {
                if (s.id !== segId) return s;
                if (s.type === "single") {
                    return { ...s, tokens: value ? [value] : [] };
                }
                if (s.type === "square" || s.type === "angle") {
                    const toks = (s.tokens || []).map((t, i) => (i === index ? value : t));
                    return { ...s, tokens: toks };
                }
                return s;
            });
            publishChange(updateState);
            return updateState;
        });
    };

    const removeToken = (segId, index) => {
        setLocalSegs(prev => {
            const next = prev.map(s => {
                if (s.id !== segId) return s;
                if (s.type === "single") return { ...s, tokens: [] };
                if (s.type === "square" || s.type === "angle") {
                    const toks = (s.tokens || []).filter((_, i) => i !== index);
                    return { ...s, tokens: toks };
                }
                return s;
            });
            publishChange(next);
            return next;
        });
    };

    const changeBank = (newBank) => {
        setBank(newBank);
        publishChange(localSegs, newBank);
    };

    return (
        <div>
            <div className="mb-3 d-flex align-items-center gap-2">
                <label className="form-label mb-0">Bank</label>
                <select className="form-select form-select-sm" value={bank} onChange={(e) => changeBank(e.target.value)}>
                    {BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
            </div>

            {(localSegs || []).map((seg, segIndex) => {
                const isSingle = seg.type === "single";
                return (
                    <div className="card mb-3" key={seg.id}>
                        <div className="card-header d-flex align-items-center gap-2">
                            <span>Segment {segIndex + 1}</span>
                            <code className="ms-2">{isSingle ? "single" : seg.type === "angle" ? "<>" : "[]"}</code>
                            <button type="button" className="btn btn-sm btn-outline-danger ms-auto" onClick={() => removeSegment(seg.id)}>
                                Remove Segment
                            </button>
                        </div>

                        <div className="card-body">
                            {isSingle && (!seg.tokens || seg.tokens.length === 0) && (
                                <div className="input-group mb-2">
                                    <select className="form-select" value="" onChange={(e) => updateToken(seg.id, 0, e.target.value)}>
                                        <option value="" disabled>select</option>
                                        {TOKENS.map((t) => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            )}

                            {Array.isArray(seg.tokens) && seg.tokens.map((token, i) => (
                                <div className="input-group mb-2" key={i}>
                                    <span className="input-group-text">{i + 1}</span>
                                    <select className="form-select" value={token || ""} onChange={(e) => updateToken(seg.id, i, e.target.value)}>
                                        <option value="" disabled>select</option>
                                        {TOKENS.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                    <button type="button" className="btn btn-outline-danger" onClick={() => removeToken(seg.id, i)}>
                                        Remove
                                    </button>
                                </div>
                            ))}

                            {!isSingle && (
                                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => addToken(seg.id)}>
                                    Add Token
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}

            <div className="mt-2 d-flex flex-wrap gap-2">
                <button type="button" className="btn btn-outline-primary" onClick={() => addSegment("single")}>Add Single</button>
                <button type="button" className="btn btn-outline-primary" onClick={() => addSegment("square")}>Add Fastcat</button>
                <button type="button" className="btn btn-outline-primary" onClick={() => addSegment("angle")}>Add Slowcat</button>
            </div>
        </div>
    );
}

export default InputPattern;
