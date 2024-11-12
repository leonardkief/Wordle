import { useState } from "react"

import "./App.css"
import Keyboard from "./Keyboard"
import Words from "./Words"

const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const SPECIAL_CHARS = "ÄÖÜ"

const CORRECT_WORD = "Hallo"

function App() {
    const [words, setWords] = useState(["", "", "", "", "", ""])
    const [entryLocked, setEntryLocked] = useState(false)
    // let currentWord = 0
    const [wordIdx, setWordIdx] = useState(0)
    const wordLength = 5

    function handleKeyDown(key) {
        if (entryLocked) return

        if (key === "Enter") {
            if (words[wordIdx].length !== 5) {
                console.error("Wort kleiner als 5")
                return
            }

            setWordIdx((prevIdx) => prevIdx + 1)
        } else if (
            (UPPERCASE_LETTERS + SPECIAL_CHARS).includes(key.toUpperCase())
        ) {
            if (words[wordIdx].length < 5) {
                setWords((prevWords) => {
                    const newWords = [...prevWords]
                    newWords[wordIdx] += key

                    return newWords
                })
            }
        } else if (key === "Backspace") {
            if (words[wordIdx].length > 0) {
                setWords((prevWords) => {
                    const newWords = [...prevWords]
                    const curWord = newWords[wordIdx]
                    newWords[wordIdx] = curWord.slice(0, curWord.length - 1)

                    return newWords
                })
            }
        }
    }

    return (
        <div onKeyDown={(e) => handleKeyDown(e.key)} tabIndex={0}>
            <header>
                <h1 className="page-title">
                    <span>Wordle</span>
                </h1>
            </header>
            <main>
                <Words words={words} length={wordLength} />
                <Keyboard onKeyPress={handleKeyDown} />
            </main>
        </div>
    )
}

export default App
