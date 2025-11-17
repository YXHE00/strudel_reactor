function ApplyTempo(code, bpm, bpc) {
    const replacement = `setcpm(${bpm}/${bpc})`;

    if (/^\s*setcpm\s*\(/m.test(code)) {
        return code.replace(
            /^\s*setcpm\s*\([^)]*\)/m,
            replacement
        );
    }

    return `${replacement}\n${code}`;
}

export default ApplyTempo;
