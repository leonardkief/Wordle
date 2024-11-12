function Letterbox({ letter, color }) {
    return (
        <div
            className={
                "letterbox" +
                (letter && !color
                    ? " has-letter"
                    : color
                    ? " key-" + color
                    : "")
            }
        >
            <span className="letter-container">{letter}</span>
        </div>
    )
}

export default Letterbox
