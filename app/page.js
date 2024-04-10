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
    const [questionInputValue,setQuestionInputValue] = useState('');
    const [answerInputValue, setAnswerValueInput] =useState('');
    const [dynamicTriviaQuestions,setDynamicTriviaQuestions] = useState(triviaQuestions);
    const [disaplyRightOrWrongBox, setDisplayRightOrWrongBox] = useState("hide");

    function handleStartOver(){
        let shuffledArray=[];
        shuffledArray.push(dynamicTriviaQuestions[0]);
        dynamicTriviaQuestions.splice(0,1);
        while(dynamicTriviaQuestions.length > 0){
            let randomIndex = Math.floor(Math.random()* dynamicTriviaQuestions.length);
            shuffledArray.push(dynamicTriviaQuestions[randomIndex]);
            dynamicTriviaQuestions.splice(randomIndex,1);
        }
        setDynamicTriviaQuestions(shuffledArray);
        setNumberOfCorrectAnswers(0);
        setNumberOfWrongAnswers(0);
        setTriviaIndex(0);
        setAnswerToggle("hide");
        setQuestionMarkToggle("display");
        setDisplayDirections("<<< Click Question Box to go to next question!");
        setDisplayRightOrWrongBox("hide");
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
        if(triviaIndex === ((dynamicTriviaQuestions.length)-2)){
            setDisplayDirections("This is your last flashcard!");
            setTriviaIndex(triviaIndex +1);
            setAnswerToggle('hide');
            setQuestionMarkToggle("display");
        }else if(triviaIndex === ((dynamicTriviaQuestions.length)-1)){
            setDisplayDirections("Make sure to reveal the last answer to the card!");
        }else{ 
            setTriviaIndex(triviaIndex +1);
            setAnswerToggle('hide');
            setQuestionMarkToggle("display");
            setDisplayDirections("Click Answer Box to reveal the answer! >>> ");
        }
    }

    function handleDisplayAnswer(){
        if(triviaIndex === ((dynamicTriviaQuestions.length)-1)){
            setDisplayDirections("How'd you do?? Click one of the buttons below!");
            setAnswerToggle('display-answer');
            setQuestionMarkToggle("hide");
            setDisplayRightOrWrongBox("right-or-wrong-box");
        }else{ 
            setAnswerToggle('display-answer');
            setQuestionMarkToggle("hide");
            setDisplayDirections("How'd you do?? Click one of the buttons below!");
            setDisplayRightOrWrongBox("right-or-wrong-box");
        }
    }

    function handleAddNewFlashcard(){
        setAddNewCardClass("display-form");
    }

    function handleCloseAddNewCardBox(){
        setAddNewCardClass("hide");
    }

    function handleQuestionInput(event){
        setQuestionInputValue(event.target.value);
    }

    function handleAnswerInput(event){
        setAnswerValueInput(event.target.value);
    }    

    function handleAddNewFlashcardSubmit(){
        setDynamicTriviaQuestions([...dynamicTriviaQuestions, {id:((dynamicTriviaQuestions.length) -1), question:questionInputValue, answer:answerInputValue}]);
        console.log(dynamicTriviaQuestions);
        setQuestionInputValue('');
        setAnswerValueInput('');
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
                <div className={disaplyRightOrWrongBox}>
                    <button onClick={handleRight} className='right-button'>Got it right!</button>
                    <button onClick={handleWrong} className='wrong-button'>Got it wrong...</button>
                </div>
                <div className="start-over-button-box">
                    <button className='start-over-button' onClick={handleStartOver}>Shuffle & Start Over</button>
                </div>
            </div>
        )
    }

    function handleRight(){
        if(triviaIndex === ((dynamicTriviaQuestions.length)-1)){
            setNumberOfCorrectAnswers(numberOfCorrectAnswers +1);
            setDisplayDirections(`You scored a ${Math.round((numberOfCorrectAnswers / ((dynamicTriviaQuestions.length)-1))*1000)/10}%! Click Shuffle & Start Over to try again!`);
        }else{
            setNumberOfCorrectAnswers(numberOfCorrectAnswers +1);
            setDisplayDirections("<<< Click Question Box to go to next question!");
            setDisplayRightOrWrongBox("hide");
        }
    }

    function handleWrong(){
        if(triviaIndex === ((dynamicTriviaQuestions.length)-1)){
            setNumberOfWrongAnswers(numberOfWrongAnswers +1);
            setDisplayDirections(`You scored a ${Math.round((numberOfCorrectAnswers / ((dynamicTriviaQuestions.length)-1))*1000)/10}%! Click Shuffle & Start Over to try again!`);
        }else{
            setNumberOfWrongAnswers(numberOfWrongAnswers +1);
            setDisplayDirections("<<< Click Question Box to go to next question!");
            setDisplayRightOrWrongBox("hide");
        }
    }

   
    return (
        <main>
            <h1> Study Time</h1>
            <ScoreKeeper/>
            <div className={addNewCardClass}>
            <button className='exitButton' onClick={handleCloseAddNewCardBox}>x</button>
            <h4>Add A New Flashcard to the stack!</h4>  
                <form action={handleAddNewFlashcardSubmit}>
                    <input type="text" placeholder='Write Question Here' value={questionInputValue} onChange={handleQuestionInput}/>
                    <br/>
                    <input type="text" placeholder='Write Answer Here' value={answerInputValue} onChange={handleAnswerInput}/>
                    <br/>
                    <button className='formSubmitButton'>Submit</button>
                </form>
            </div>
            <NoteCard data={dynamicTriviaQuestions[triviaIndex]}/>
            <RightOrWrongBox/>    
        </main>
    );
}
