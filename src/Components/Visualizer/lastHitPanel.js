import { useEffect, useState } from "react";
function LastHitPanel() {
    const [hit, setHit] = useState(null);

    useEffect(() => {
        const onHit = (e) => setHit(e.detail);
        document.addEventListener("d3Hit", onHit);
    }, []);

    const sample = hit?.sample?.toUpperCase?.() ?? " null";
    const dur = (hit?.duration ?? null) !== null ? `${hit.duration.toFixed(3)} s` : " 0s";

    return (
        <div>Sample:{sample}   Duration:{dur}</div>
    );
}

export default LastHitPanel;