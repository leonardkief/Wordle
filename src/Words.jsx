import Letterbox from "./Letterbox"

function Words({ words, length }) {
    return (
        <div className="words">
            {words.map((word, i) => {
                const letterboxes = []
                for (let [j, letter] of Object.entries(word)) {
                    letterboxes.push(
                        <Letterbox key={j} letter={letter.toUpperCase()} />
                    )
                }
                for (let j = word.length; j < length; j++) {
                    letterboxes.push(<Letterbox key={j} />)
                }

                return (
                    <div className="words-row" key={i}>
                        {letterboxes}
                    </div>
                )
            })}
        </div>
    )
}

export default Words
