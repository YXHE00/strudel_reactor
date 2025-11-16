import DrumBuilder from "../PreprocessingEditor/drumBuilder";

function PreprocessTextarea({ value, onChange }) {
    return (
        <>       
            <div className="input-group pb-2">
                <input type="text" class="form-control" placeholder="Search ..." aria-label="search song name" />
                    <button className="btn btn-outline-secondary" type="button">Search</button>
                <button className="btn btn-outline-success" type="button">Save</button>
            </div>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
            <DrumBuilder onChange={onChange} />
        </>
    );
}

export default PreprocessTextarea;