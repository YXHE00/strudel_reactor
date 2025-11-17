function ApplyMixControls(code, volume, speed) {
    const marker = ".log()";
    const idx = code.lastIndexOf(marker);

    let head = code.slice(0, idx);
    const tail = code.slice(idx);

    head = head
        .replace(/\.gain\([^)]*\)/g, "")
        .replace(/\.fast\([^)]*\)/g, "");

    let chain = "";

    if (volume != null) {
        chain += `.gain(${volume})`;
    }

    if (speed != null) {
        chain += `.fast(${speed})`;
    }

    return head + chain + tail;
}

export default ApplyMixControls;
