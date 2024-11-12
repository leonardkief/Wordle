const KEYS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Backspace"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Enter"],
    ["Z", "X", "C", "V", "B", "N", "M", ",", "."],
]

function Keyboard({ onKeyPress }) {
    return (
        <div className="keyboard">
            {KEYS.map((row) => (
                <div className="keyboard-row" key={row.join(".")}>
                    {row.map((key) => {
                        return (
                            <button
                                key={key}
                                className={
                                    "keyboard-key" +
                                    (key === "Backspace"
                                        ? " key-backspace"
                                        : "") +
                                    (key === "Enter" ? " key-enter" : "")
                                }
                                onClick={() => onKeyPress(key)}
                            >
                                <span>
                                    {key !== "Enter" && key !== "Backspace" ? (
                                        key
                                    ) : key === "Backspace" ? (
                                        <i className="fa-solid fa-delete-left"></i>
                                    ) : (
                                        <i
                                            className="fa-solid fa-arrow-turn-down"
                                            style={{
                                                transform: "rotate(90deg)",
                                            }}
                                        ></i>
                                    )}
                                </span>
                            </button>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

export default Keyboard
