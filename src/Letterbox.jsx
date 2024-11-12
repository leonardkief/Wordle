function Letterbox({ letter, status }) {
    return (
        <div className={"letterbox" + (letter ? " has-letter" : "")}>
            <span className="letter-container">{letter}</span>
        </div>
    )
}

export default Letterbox
