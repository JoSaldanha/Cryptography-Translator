function FormPlainText({title, change, state, click}) {
  return (
    <div>
        <h4>{title}</h4>
        <div className={`translate-form`}>
            <label htmlFor="Input">
                <span>Input: </span>
                <textarea
                    name={`input${title}`}
                    id="input-text"
                    cols="30"
                    rows="10"
                    onChange={ change }
                />
            </label>

            <label htmlFor="output">
                <span>Output: </span>
                <textarea
                    id="output-text"
                    value={state}
                    disabled
                    cols="30"
                    rows="10"
                />
            </label>
        </div>

        <div>
            <label htmlFor="keyEncrypt">
            <span>Key: </span>
            <input
                type="text"
                name={`key${title}`}
                onChange={ change }
            />
            </label>
        </div>
        <button type='button' className="btn-form" name={title} onClick={click}>{title}</button>
    </div>
  );
}

export default FormPlainText;
