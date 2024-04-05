'use client'
import {useState} from 'react'
import triviaQuestions from './data/trivia-questions';

export default function Home() {

const [numberOfCorrectAnswers,setNumberOfCorrectAnswers] = useState(0);
const [numberOfWrongAnswers, setNumberOfWrongAnswers] = useState(0);
const [triviaIndex,setTriviaIndex]= useState(0);
const [answerToggle,setAnswerToggle] = useState("hide");
const [questionMarkToggle, setQuestionMarkToggle] = useState("display");
const [displayDirections, setDisplayDirections] = useState("<<< Click Question Box to go to next question!");
const [addNewCardClass, setAddNewCardClass] = useState("hide");


function handleStartOver(){
    setNumberOfCorrectAnswers(0);
    setNumberOfWrongAnswers(0);
    setTriviaIndex(0);
    setAnswerToggle("hide");
    setQuestionMarkToggle("display");
    setDisplayDirections("<<< Click Question Box to go to next question!");
}

function ScoreKeeper(){
        return (
            <div className='score-container'>
                <h3>Correct: {numberOfCorrectAnswers}</h3>
                <h3>Wrong: {numberOfWrongAnswers}</h3>
                <button onClick={handleAddNewFlashcard}>ADD NEW FLASHCARD</button>
            </div>
        )
    }
    
    function handleDisplayQuestion(){
        setTriviaIndex(triviaIndex +1);
        setAnswerToggle('hide');
        setQuestionMarkToggle("display");
        setDisplayDirections("Click Answer Box to reveal the answer! >>> ");
    }

    function handleDisplayAnswer(){
        setAnswerToggle('display-answer');
        setQuestionMarkToggle("hide");
        setDisplayDirections("How'd you do?? Click one of the buttons below!")
    }

    function handleAddNewFlashcard(){
        setAddNewCardClass("display-form");
    }

    function AddNewCardBox(){
        return (
            <div className={addNewCardClass}>
                <form>
                    <input type="text" placeholder='Write Question Here'/>
                    <input type="text" placeholder='Write Answer Here'/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }

    function NoteCard(props){
       const data = props.data;
        return(
            <div className='cards-container'>
                <div className='question-card' onClick={handleDisplayQuestion}>
                    <h4>Question</h4>
                    <p>{data.question}</p>
                </div>
                <div className="directions-box">
                    <h3>{displayDirections}</h3>
                </div>
                <div className='answer-card' onClick={handleDisplayAnswer}>
                <h4>Answer</h4>
                    <p className={questionMarkToggle}>???</p>
                    <p className={answerToggle}>{data.answer}</p>
                </div>
            </div>
            
        )
    }

    function RightOrWrongBox(){
        return(
           <div>
                <div className='right-or-wrong-box'>
                    <button onClick={handleRight} className='right-button'>Got it right!</button>
                    <button onClick={handleWrong} className='wrong-button'>Got it wrong...</button>
                </div>
                <div className="start-over-button">
                <button  onClick={handleStartOver}>Start Over</button>
                </div>

            </div>
            
          
        )
    }

    function handleRight(){
        setNumberOfCorrectAnswers(numberOfCorrectAnswers +1);
        setDisplayDirections("<<< Click Question Box to go to next question!");
    }

    function handleWrong(){
        setNumberOfWrongAnswers(numberOfWrongAnswers +1);
        setDisplayDirections("<<< Click Question Box to go to next question!");
    }

   
    return (
        <main>
            <h1> Study Time</h1>
            <ScoreKeeper/>
            <AddNewCardBox/>
            <NoteCard data={triviaQuestions[triviaIndex]}/>
            <RightOrWrongBox/>
            
        </main>
    );
}
