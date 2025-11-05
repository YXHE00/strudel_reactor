import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import OnHushButton from './Components/Preprocessor/onHushButton';
import PlayStopButton from './Components/PreprocessingEditor/playStopButton';
import ProcessButton from './Components/PreprocessingEditor/processButton';
import ControlsPanel from './Components/Preprocessor/controlsPanel';
import PreprocessTextarea from './Components/Preprocessor/preprocessTextarea';
import LastHitPanel from './Components/Visualizer/lastHitPanel';
import DrumDurationBar from './Components/Visualizer/drumDurationBar';


let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};


export default function StrudelDemo() {

    const hasRun = useRef(false);
    const [songText, setSongText] = useState(stranger_tune)
    //const [p1Mode, setP1Mode] = useState("ON");

    const handlePlay = () => {
        globalEditor.evaluate()
    }

    const handleStop = () => {
        globalEditor.stop()
    }

    const handleProcess = () => {
        globalEditor?.setCode(songText);
    };

    const handleProcessPlay = () => {
        globalEditor?.setCode(songText);
        globalEditor?.evaluate();
    };

useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => {
                    drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 });
                document.dispatchEvent(
                    new CustomEvent('d3Haps', { detail: { haps, time } })
                );},
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });

        document.getElementById('proc').value = stranger_tune
    }
    globalEditor.setCode(songText);
}, [songText]);

return (
    <div>
        <h2>Strudel Demo</h2>
        <main>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <PreprocessTextarea defaultValue={songText} onChange={(e)=>setSongText(e.target.value)} />
                    </div>
                    <div className="col-md-4">

                        <nav>
                            <ProcessButton onProcess={handleProcess} onProcessPlay={handleProcessPlay} />
                            <LastHitPanel />
                            <DrumDurationBar />
                            <br />
                            <PlayStopButton onPlay={handlePlay} onStop={handleStop} />
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                    
                    <div className="col-md-4">
                        {/*<OnHushButton value={p1Mode} onChange={setP1Mode} />*/}
                        <ControlsPanel />
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}