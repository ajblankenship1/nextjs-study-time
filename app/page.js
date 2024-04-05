'use client'
import {useState} from 'react'

export default function Home() {

const [numberOfCorrectAnswers,setNumberOfCorrectAnswers] = useState(0);
const [numberOfWrongAnswers, setNumberOfWrongAnswers] = useState(0);
const [displayQuestion,setDisplayQuestion] = useState("Start Study Time!");
const [displayAnswer,setDisplayAnswer] = useState("Give It Your Best Shot!")
    function ScoreKeeper(){
        return (
            <div className='score-container'>
                <h3>Correct: {numberOfCorrectAnswers}</h3>
                <h3>Wrong: {numberOfWrongAnswers}</h3>
                <button>ADD NEW FLASHCARD</button>
            </div>
        )
    }

    function NoteCard(){
        return(
            <div className='cards-container'>
                <div className='question-card'>
                    <p>{displayQuestion}</p>
                </div>
                <div className='answer-card'>
                    <p>{displayAnswer}</p>
                </div>
            </div>
            
        )
    }


    return (
        <main>
            <h1> Study Time</h1>
            <ScoreKeeper/>
            <NoteCard/>

        </main>
    );
}
