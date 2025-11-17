function BuildPatternString(segments = []) {

    // Example:
    // Input:
    //{ type: "single", tokens: ["rim"] },
    //{ type: "angle", tokens: ["hh", "hh"] },
    //{ type: "square", tokens: ["bd", "sd"] }

    // Output:
    //"rim <hh hh> [bd sd]"

    return segments
        .map((s) => {
            const toks = (s.tokens || []).filter(Boolean);
            if (toks.length === 0) return "";
            switch (s.type) {
                case "single": return toks[0] ?? "";
                case "angle": return `<${toks.join(" ")}>`;
                case "square":
                default: return `[${toks.join(" ")}]`;
            }
        })
        .filter((x) => x && x.trim() !== "")
        .join(" ");
}

export default BuildPatternString