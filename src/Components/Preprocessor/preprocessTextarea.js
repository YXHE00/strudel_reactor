import React, { useState } from "react";
import DrumBuilder from "../PreprocessingEditor/drumBuilder";

function PreprocessTextarea({ onChange, onSaveSong, onSearchSong }) {
    const [name, setName] = useState("");

    const handleSaveClick = () => {
        const trimmed = name.trim();
        if (!trimmed) {
            alert("Miss the song name to save...");
            return;
        }

        const saved = onSaveSong(trimmed);
        if (!saved) {
            alert("Cannot save the song");
            return;
        }
        alert(
            "Successful saved the song:" +
            JSON.stringify(saved, null, 2)
        );
    };

    const handleSearchClick = () => {
        const trimmed = name.trim();
        if (!trimmed) {
            alert("Miss the song name to search...");
            return;
        }
        onSearchSong(trimmed);
    };

    return (
        <>       
            <div className="input-group pb-2">
                <input type="text" className="form-control" placeholder="Song Name" aria-label="Song Name" value={name} onChange={(e) => setName(e.target.value)} />
                <button className="btn btn-outline-secondary" type="button" onClick={handleSearchClick}>Search</button>
                <button className="btn btn-outline-success" type="button" onClick={handleSaveClick}>Save</button>
            </div>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
            <DrumBuilder onChange={onChange} />
        </>
    );
}

export default PreprocessTextarea;