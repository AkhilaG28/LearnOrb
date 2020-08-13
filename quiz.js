import web from './web.js'
import app from './android.js'


let course = new URLSearchParams( window.location.search )
let selectedCourse = course.get( 'course' )

console.log( selectedCourse );

const userName = course.get( 'user' ).toUpperCase()
let userNameDiv = document.getElementById( 'userName' )
userNameDiv.textContent = userName
userNameDiv.style.color = 'black'

let quizHeading = document.querySelector( '#quiz > h1' )
quizHeading.textContent = `Pre Evaluation for ${ selectedCourse } Program`

let questions
selectedCourse == 'App Development' ? questions = [ ...app ] : questions = [ ...web ]

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

let barGraphData
const data = localStorage.getItem( "quizScore" )

barGraphData = JSON.parse( data ) || []



// Displaying the result
function showResult () {
    clearInterval( timeID )
    let quizDone = document.getElementById( 'quiz' )
    quizDone.setAttribute( 'id', 'finalPage' )
    let userBarGraphData = {
        'course': selectedCourse,
        'name': userName,
        'score': Math.floor( ( quiz.score / questions.length ) * 100 )
    }
    barGraphData.push( userBarGraphData )
    localStorage.setItem( 'quizScore', JSON.stringify( barGraphData ) )
    //storeEvaluationMarks( userBarGraphData )


    let percentage = ( ( quiz.score / questions.length ).toFixed( 2 ) * 100 )
    if ( percentage >= 70 ) {
        document.getElementById( 'success' ).play()
        quizDone.innerHTML = `<h1>Result</>
                             <h2 id = 'result'>Congratulations ${userName }</h2>
                             <p>You have cleared the evaluation.</p>
                             <p>We will contact you via email for further process.</p>
                             <p>For any queries, mail us at <a href='#' style='color: #0097a7'>helpdesk@learnorb.com</a></p>
                             <p style='padding-top:30%'>Click here to go back to <a href='userDashBoard.html?user=${course.get( 'user' ).toUpperCase() }&course=${ course.get( 'course' ) }' style='color:#0097a7'>dashboard</a></p>`
    }
    else {
        document.getElementById( 'fail' ).play()
        quizDone.innerHTML = `<h1>RESULT</h1>
                              <h2 id = 'result'>Sorry ${userName }</h2>
                              <p>You did not clear the evaluation.</p>
                              <p>Hope to see you in the next course with more grace.</p>
                              <p style='padding-top:30%'>Click here to go back to <a href='userDashBoard.html?${course }'>dashboard</a></p>`
    }
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
        clearInterval( timeID )
    }

}

const startingMins = 1.2
let time = startingMins * 60
const countdown = document.getElementById( 'time' )
let timeID = setInterval( updateTime, 1000 )


// function storeEvaluationMarks ( results ) {
//     console.log( results )
//     if ( localStorage.getItem( 'quizScore' ) ) {
//         let data = JSON.parse( localStorage.getItem( 'quizScore' ) )
//         data.push( results )
//         localStorage.setItem( 'quizScore', JSON.stringify( data ) )
//     }
//     else {
//         let arr = []
//         localStorage.setItem( 'quizScore', JSON.stringify( arr ) )
//         let data = JSON.parse( localStorage.getItem( 'quizScore' ) )
//         data.push( results )
//         localStorage.setItem( 'quizScore', JSON.stringify( data ) )
//     }
// }



