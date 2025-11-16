import React, { useState, useEffect } from "react";
import InputPattern from "./inputPattern";

function createEmptyPattern() {
    return {
        id: Math.random().toString(36).slice(2, 9),
        segments: [],
        patternString: "",
        bank: "RolandTR909",
    };
}

const DrumBuilder = ({ onChange }) => {
    const [patterns, setPatterns] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const selected = patterns.find((p) => p.id === selectedId) || null;

    const addPattern = () => {
        setPatterns((prevP) => {
            const newP = createEmptyPattern();
            const nextP = [...prevP, newP];
            setSelectedId(newP.id);
            return nextP;
        });
    };

    const updatePattern = (patternId, segments, patternString, bank) => {
        setPatterns(prev =>
            prev.map(p =>
                p.id === patternId ? { ...p, segments, patternString, bank } : p
            )
        );
    };

    const deletePattern = (patternId) => {
        setPatterns((prevP) => {
            const nextP = prevP.filter((p) => p.id !== patternId);
            if (patternId === selectedId) {
                setSelectedId(nextP[0] ? nextP[0].id : null);
            }
            return nextP;
        });
    };

    const editPattern = (patternId) => setSelectedId(patternId);

    const sLines = patterns
        .filter(p => p.patternString && p.patternString.trim() !== "")
        .map(p => `s("${p.patternString.trim()}").bank("${p.bank ?? "RolandTR909"}")`);

    const code =
        sLines.length > 0
            ? [
                "samples('github:algorave-dave/samples')",
                "samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')",
                "samples('https://raw.githubusercontent.com/Mittans/tidal-drum-machines/main/machines/tidal-drum-machines.json')",
                "stack(",
                "  " + sLines.join(",\n  "),
                ")",
                ".log()",
            ].join("\n")
            : "// waiting for pattern...";

    useEffect(() => {
        onChange?.(code);
    }, [code, onChange]);

    return (
        <div className="container p-3">
            <div className="mb-3">
                <button type="button" className="btn btn-outline-success" onClick={addPattern}>
                    Add Pattern
                </button>
            </div>

            {patterns.length > 0 && (
                <div className="mb-3">
                    <div className="d-flex flex-column gap-2">
                        {patterns.map((p) => {
                            const isActive = p.id === selectedId;
                            return (
                                <div
                                    key={p.id}
                                    className={
                                        "d-flex align-items-center justify-content-between p-2 border rounded " +
                                        (isActive ? "bg-light" : "")
                                    }
                                >
                                    <div className="fw-semibold">
                                        s("{p.patternString || ""}").bank("{p.bank || "RolandTR909"}")
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button type="button" className="btn btn-sm btn-primary" onClick={() => editPattern(p.id)}>
                                            Edit
                                        </button>
                                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deletePattern(p.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {selected && (
                <>
                    <InputPattern
                        segments={selected.segments}
                        initialBank={selected.bank}
                        onChange={(segments, patternStr, bank) =>
                            updatePattern(selected.id, segments, patternStr, bank)
                        }
                    />
                </>
            )}
        </div>
    );
};

export default DrumBuilder;
