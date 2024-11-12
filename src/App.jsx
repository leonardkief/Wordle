import { useState } from "react"

import "./App.css"
import Keyboard from "./Keyboard"
import Words from "./Words"
import GameOver from "./GameOver"

const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const SPECIAL_CHARS = "ÄÖÜ"

function copyWords(words) {
    return [...words.map((word) => ({ ...word }))]
}

function App() {
    // const correctWord = "Hallo".toUpperCase()
    const [correctWord, setCorrectWord] = useState("Hallo".toUpperCase())
    const [words, setWords] = useState([
        { word: "", entered: false },
        { word: "", entered: false },
        { word: "", entered: false },
        { word: "", entered: false },
        { word: "", entered: false },
        { word: "", entered: false },
    ])
    const [entryLocked, setEntryLocked] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [wordIdx, setWordIdx] = useState(0)
    const wordLength = 5
    const [wonGame, setWonGame] = useState(false)

    function initGame() {
        setCorrectWord("Hallo".toUpperCase())
        setEntryLocked(false)
        setGameOver(false)
        setWords([
            { word: "", entered: false },
            { word: "", entered: false },
            { word: "", entered: false },
            { word: "", entered: false },
            { word: "", entered: false },
            { word: "", entered: false },
        ])
        setWordIdx(0)
    }

    // function handleKeyDown(key) {
    //     if (entryLocked) return

    //     if (key === "Enter") {
    //         if (words[wordIdx].length !== 5) {
    //             console.error("Wort kleiner als 5")
    //             return
    //         }

    //         setWordIdx((prevIdx) => prevIdx + 1)
    //     } else if (
    //         (UPPERCASE_LETTERS + SPECIAL_CHARS).includes(key.toUpperCase())
    //     ) {
    //         if (words[wordIdx].length < 5) {
    //             setWords((prevWords) => {
    //                 const newWords = [...prevWords]
    //                 newWords[wordIdx] += key

    //                 return newWords
    //             })
    //         }
    //     } else if (key === "Backspace") {
    //         if (words[wordIdx].length > 0) {
    //             setWords((prevWords) => {
    //                 const newWords = [...prevWords]
    //                 const curWord = newWords[wordIdx]
    //                 newWords[wordIdx] = curWord.slice(0, curWord.length - 1)

    //                 return newWords
    //             })
    //         }
    //     }
    // }

    function handleKeyDown(key) {
        if (entryLocked) return

        const currentWord = words[wordIdx].word
        if (key === "Backspace") {
            if (currentWord.length > 0) {
                setWords((prevWords) => {
                    const newWords = copyWords(prevWords)
                    const curWord = newWords[wordIdx].word
                    newWords[wordIdx].word = curWord.slice(
                        0,
                        curWord.length - 1
                    )

                    return newWords
                })
            }
        } else if (key === "Enter") {
            if (currentWord.length !== 5) return

            setWords((prevWords) => {
                const newWords = copyWords(prevWords)
                newWords[wordIdx].entered = true

                return newWords
            })
            setWordIdx((prevIdx) => prevIdx + 1)

            if (currentWord === correctWord) {
                setEntryLocked(true)
                setGameOver(true)
                setWonGame(true)
            } else if (wordIdx === words.length - 1) {
                setEntryLocked(true)
                setGameOver(true)
            }
        } else if (
            (UPPERCASE_LETTERS + SPECIAL_CHARS).includes(key.toUpperCase())
        ) {
            if (currentWord.length < 5) {
                const letter = key.toUpperCase()
                setWords((prevWords) => {
                    const newWords = copyWords(prevWords)
                    newWords[wordIdx].word += letter.toUpperCase()

                    return newWords
                })
            }
        }
    }

    return (
        <div
            className={"app" + (gameOver ? "status-game-over" : "")}
            onKeyDown={(e) => handleKeyDown(e.key)}
            tabIndex={0}
        >
            <header>
                <h1 className="page-title">
                    <span>Wordle</span>
                </h1>
            </header>
            <main>
                <Words
                    words={words}
                    length={wordLength}
                    correctWord={correctWord}
                />
                <Keyboard onKeyPress={handleKeyDown} />
                {gameOver && (
                    <GameOver
                        correctWord={correctWord}
                        startNewGame={initGame}
                        wonGame={wonGame}
                    />
                )}
            </main>
        </div>
    )
}

export default App
