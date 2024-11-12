import Letterbox from "./Letterbox"

function Words({ words, length, correctWord }) {
    return (
        <div className="words">
            {words.map((wordObj, i) => {
                const word = wordObj.word

                const letterboxes = []
                if (!wordObj.entered) {
                    for (let [j, letter] of Object.entries(word)) {
                        letterboxes.push(<Letterbox key={j} letter={letter} />)
                    }
                    for (let j = word.length; j < length; j++) {
                        letterboxes.push(<Letterbox key={j} />)
                    }
                } else {
                    const letterCounts = {}
                    for (const letter of correctWord) {
                        if (letterCounts[letter]) {
                            letterCounts[letter]++
                        } else {
                            letterCounts[letter] = 1
                        }
                    }

                    for (let [j, letter] of Object.entries(word)) {
                        let color
                        if (!letterCounts[letter]) {
                            color = "red"
                        } else if (letter === correctWord[j]) {
                            letterCounts[letter]--
                            color = "green"
                        } else if (letterCounts[letter] > 0) {
                            letterCounts[letter]--
                            color = "yellow"
                        }

                        letterboxes.push(
                            <Letterbox key={j} letter={letter} color={color} />
                        )
                    }
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
