function PreprocessTextarea({ defaultValue, onChange }) {
    return (
        <>       
            <div className="input-group pb-2">
                <input type="text" class="form-control" placeholder="Search ..." aria-label="search song name" />
                    <button className="btn btn-outline-secondary" type="button">Search</button>
                <button className="btn btn-outline-success" type="button">Save</button>
            </div>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
            <textarea className="form-control" rows="11" id="proc" defaultValue={defaultValue} onChange={onChange}></textarea>
        </>
    );
}

export default PreprocessTextarea;