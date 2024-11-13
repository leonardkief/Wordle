import { useEffect, useState } from "react"

import "./App.css"
import Keyboard from "./Keyboard"
import Words from "./Words"
import GameOver from "./GameOver"
import LoadingSymbol from "./LoadingSymbol"

const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const SPECIAL_CHARS = "ÄÖÜ"

const WORDS = ["Hallo", "React", "Words", "Alpha"]

function copyWords(words) {
    return [...words.map((word) => ({ ...word }))]
}

function choice(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function App() {
    const wordLength = 5
    const triesCount = 6

    const [correctWord, setCorrectWord] = useState(null)
    const [words, setWords] = useState(null)
    const [entryLocked, setEntryLocked] = useState(true)
    const [gameOver, setGameOver] = useState(false)
    const [wordIdx, setWordIdx] = useState(0)
    const [wonGame, setWonGame] = useState(false)

    useEffect(() => {
        initGame()
    }, [])

    function initGame() {
        setCorrectWord(null)
        setEntryLocked(true)

        const newWord = choice(WORDS)
        setCorrectWord(newWord.toUpperCase())
        setEntryLocked(false)

        setGameOver(false)
        const newWords = []
        for (let i = 0; i < triesCount; i++) {
            newWords.push({ word: "", entered: false })
        }
        setWords(newWords)
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
                <p style={{ textAlign: "center", marginBottom: "20px" }}>
                    Correct Word: {correctWord}
                </p>
                {/* <LoadingSymbol /> */}
                {correctWord && words ? (
                    <Words
                        words={words}
                        length={wordLength}
                        correctWord={correctWord}
                    />
                ) : (
                    <LoadingSymbol />
                )}
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
