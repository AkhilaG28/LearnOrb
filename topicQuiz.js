import js from './javascript.js'
import boot from './bootstrap.js'
import java from './java.js'
import kotlin from './kotlin.js'
import ds from './ds.js'

let quizTopic = new URLSearchParams( window.location.search )
let topic = quizTopic.get( 'topic' )

const userName = quizTopic.get( 'user' ).toUpperCase()
let userNameDiv = document.getElementById( 'userName' )
userNameDiv.textContent = userName
userNameDiv.style.color = 'black'

let quizHeading = document.querySelector( '#quiz > h1' )
quizHeading.textContent = `${ topic } Quiz`

let questions
topic == 'Javascript' ? questions = [ ...js ] : topic == 'Bootstrap' ? questions = [ ...boot ] : topic == 'Java' ? questions = [ ...java ] : topic == 'Kotlin' ? questions = [ ...kotlin ] : questions = [ ...ds ]


// Quiz class and prototypes
class Quiz {
    constructor( questions ) {
        this.questions = questions;
        this.questionNum = 0;
        this.score = 0
    }
    getQuestionNum = () => {
        return this.questions[ this.questionNum ]
    }
    guessAnswer = ( answer ) => {
        if ( this.getQuestionNum().isCorrectAnswer( answer ) )
            this.score++
        this.questionNum++
    }
    finalQuestion = () => {
        return this.questionNum == this.questions.length
    }
}

// Questions and answers
class Question {
    constructor( ques, options, answer ) {
        this.ques = ques
        this.options = options
        this.answer = answer
    }
    isCorrectAnswer = ( selectedOption ) => {
        return this.answer == selectedOption
    }
}

// Going through the questions
function populate () {
    if ( quiz.finalQuestion() )
        showResult()
    else {
        let ques = document.getElementById( 'ques' )
        ques.innerHTML = quiz.getQuestionNum().ques

        let options = quiz.getQuestionNum().options
        for ( let i = 0; i < options.length; i++ ) {
            let option = document.getElementById( `option${ i }` )
            option.innerHTML = options[ i ]
            guessAnswer( `btn${ i }`, options[ i ] )
        }
        showProgress()
    }
}

// Validating answers
function guessAnswer ( id, selectedOption ) {
    let btn = document.getElementById( id )
    btn.onclick = () => {
        quiz.guessAnswer( selectedOption )
        populate()
    }
}

// Going to next question
function showProgress () {
    let currentQuesNum = quiz.questionNum + 1
    let progress = document.getElementById( 'progressQues' )
    progress.innerHTML = `Question ${ currentQuesNum } of ${ quiz.questions.length }`
}

let quizData
const data = localStorage.getItem( "quizData" )

quizData = JSON.parse( data ) || []
// Displaying the result
function showResult () {
    let quizDone = document.getElementById( 'quiz' )
    quizDone.setAttribute( 'id', 'finalPage' )
    let userQuizData = {
        'course': topic,
        'name': userName,
        'score': Math.floor( ( quiz.score / questions.length ) * 100 )
    }
    quizData.push( userQuizData )
    localStorage.setItem( 'quizScore', JSON.stringify( quizData ) )
    document.getElementById( 'success' ).play()
    quizDone.innerHTML = `<h1>Completed the quiz</h1>
                          <p style='padding-top:40%'>Click here to go back to <a href = 'userDashBoard.html?user=${userName }&course=${ quizTopic.get( 'course' ) }'> dashboard</a><p>`
}


let getQues = []

console.log( questions.length )
for ( let i = 0; i < questions.length; i++ ) {
    getQues.push( new Question( questions[ i ].question, questions[ i ].options, questions[ i ].answer ) )
}

let quiz = new Quiz( getQues )
populate()

// Countdown Timer
function updateTime () {
    let mins = Math.floor( time / 60 )
    let secs = time % 60
    secs = secs < 10 ? '0' + secs : secs
    mins = mins < 10 ? '0' + mins : mins
    countdown.innerHTML = `${ mins }:${ secs }`
    time--
    if ( time < 59 ) {
        countdown.style.color = 'red'
        countdown.style.fontWeight = 'bold'
    }
    if ( time <= 0 ) {
        showResult()
    }

}

const startingMins = 1.2
let time = startingMins * 60
const countdown = document.getElementById( 'time' )
setInterval( updateTime, 1000 )
