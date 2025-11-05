import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const DRUM_ORDER = ["bd", "sd", "rim", "hh", "oh", "lt", "mt", "ht", "rd", "cr"];

function DrumDurationBar({
    width = 700,
    height = 280,
    decayPerSec = 1.5,
}) {
    const svgRef = useRef(null);
    const CAP = 0.3;

    const [levels, setLevels] = useState(
        () => Object.fromEntries(DRUM_ORDER.map(k => [k, 0]))
    );

    useEffect(() => {
        const onHit = (e) => {
            const { sample, duration } = e.detail || {};
            if (!sample) return;
            const key = String(sample).toLowerCase();
            if (!DRUM_ORDER.includes(key)) return;
            const d = Number.isFinite(duration) ? Math.max(duration, 0) : 0.15;
            setLevels(prev => ({ ...prev, [key]: Math.max(prev[key] ?? 0, d) }));
        };
        document.addEventListener("d3Hit", onHit);
        return () => document.removeEventListener("d3Hit", onHit);
    }, []);

    const rafRef = useRef(0);
    const lastTsRef = useRef(0);
    useEffect(() => {
        const tick = (ts) => {
            const last = lastTsRef.current || ts;
            const dt = Math.min((ts - last) / 1000, 0.1);
            lastTsRef.current = ts;

            setLevels(prev => {
                const next = {};
                for (const k of DRUM_ORDER) {
                    const v = prev[k] ?? 0;
                    const nv = Math.max(v - decayPerSec * dt, 0);
                    next[k] = nv;
                }
                return next;
            });

            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
    }, [decayPerSec]);

    const data = DRUM_ORDER.map(k => ({ key: k, val: levels[k] ?? 0 }));

    useEffect(() => {
        const margin = { top: 20, right: 16, bottom: 40, left: 16 };
        const W = width - margin.left - margin.right;
        const H = height - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("width", "100%")
            .attr("height", height);

        const g = svg.selectAll("g.frame").data([null]).join("g")
            .attr("class", "frame")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand().domain(DRUM_ORDER).range([0, W]).padding(0.2);
        const y = d3.scaleLinear().domain([0, CAP]).range([H, 0]);

        g.selectAll("g.x-axis").data([null]).join("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${H})`)
            .call(d3.axisBottom(x).tickFormat(k => k.toUpperCase()));
        g.selectAll("g.y-axis, text.y-label").remove();

        const color = d3.scaleSequential()
            .domain([0, CAP])
            .interpolator(d3.interpolateTurbo);

        const bars = g.selectAll("rect.bar").data(data, d => d.key);
        const barsAll = bars.join(
            enter => enter.append("rect")
                .attr("class", "bar")
                .attr("y", H)
                .attr("height", 0),
            update => update,
            exit => exit.transition().duration(80).attr("y", H).attr("height", 0).remove()
        );

        barsAll
            .attr("x", d => x(d.key))
            .attr("width", x.bandwidth())
            .attr("fill", d => color(Math.min(d.val, CAP)))
            .transition().duration(80)
            .attr("y", d => y(Math.min(d.val, CAP)))
            .attr("height", d => Math.max(0, H - y(Math.min(d.val, CAP))));
    }, [data, width, height]);

    return <svg ref={svgRef} />;
}

export default DrumDurationBar;