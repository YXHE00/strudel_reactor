function ApplyEffects(code, effectsObj) {
    const effects = ["room", "delay", "phaser", "duckorbit"];
    const marker = ".log()";
    const idx = code.lastIndexOf(marker);
    let result = code.slice(0, idx + marker.length);

    for (const name of effects) {
        const value = effectsObj[name];
        if (value != null) {
            result += `.${name}(${value})`;
        }
    }

    return result;
}

export default ApplyEffects;