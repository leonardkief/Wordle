function GameOver({ correctWord, startNewGame, wonGame }) {
    return (
        <div className="game-over">
            <div className="window-black"></div>
            <div className="window">
                <h1>{wonGame ? "Du hast gewonnen!" : "Du hast verloren!"}</h1>
                <p>Das richtige Wort war &ldquo;{correctWord}&ldquo;</p>
                <button className="btn btn-primary" onClick={startNewGame}>
                    Neues Spiel
                </button>
            </div>
        </div>
    )
}

export default GameOver
