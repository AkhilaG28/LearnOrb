window.addEventListener( 'DOMContentLoaded', () => {
    //get the name of the user from URL and display in the application bar
    let user = new URLSearchParams( window.location.search )
    let userName = user.get( 'user' )
    let userNameDiv = document.getElementById( 'userName' )
    if ( userName == userName.toUpperCase() ) {
        userNameDiv.innerHTML = `${ userName } <i class="fas fa-check-circle ml-2" style="color:green;"></i>`
        let url = new URLSearchParams( window.location.search )
        let userCourse = url.get( 'course' )
        showCards( userCourse )
    }
    else {
        userName = userName.toUpperCase()
        userNameDiv.textContent = userName
    }
    const selectedCourse = user.get( 'course' )

    //display the card based on the selected course
    displayCard( selectedCourse )
    let quiz = document.querySelector( '.quiz' )
    quiz.addEventListener( 'click', () => {
        console.log( user.toString() );
        window.location.assign( `quiz.html?${ user.toString() }` )
    } )

} )


//Getting Quiz Topics
let quizTopic = document.querySelectorAll( '.quizTopic' )
console.log( quizTopic );

getTopic = () => {
    let topic = event.target.parentElement.children[ 0 ].textContent
    console.log( topic );
    let url = new URLSearchParams( window.location.search )
    url.append( 'topic', topic )
    window.location.assign( `topicQuiz.html?${ url.toString() }` )
}

for ( let i = 0; i < quizTopic.length; i++ ) {
    quizTopic[ i ].addEventListener( 'click', getTopic )
}


//quizTopic.addEventListener( 'click', getTopic )


displayCard = ( selectedCourse ) => {
    if ( selectedCourse == 'Web Design' ) {
        let card = document.querySelector( '.webDesignCard' )
        card.classList = 'col my-5 py-3 mr-2 col-md-10 mx-md-auto my-lg-0 py-lg-0 webDesignCard'
    }
    else if ( selectedCourse == 'App Development' ) {
        let card = document.querySelector( '.appDevelopmentCard' )
        card.classList = 'col my-5 py-3 mr-2 col-md-10 mx-md-auto my-lg-0 py-lg-0 appDevelopmentCard'
    }
    else if ( selectedCourse == 'Digital Marketing' ) {
        let card = document.querySelector( '.digitalMarketingCard' )
        card.classList = 'col my-5 py-3 mr-2 col-md-10 mx-md-auto my-lg-0 py-lg-0 digitalMarketingCard'

    }
}

function showCards ( courseName ) {
    if ( courseName == 'Web Design' ) {
        let div = document.getElementById( 'topicQuizWeb' )
        div.classList = 'col'
    }
    else if ( courseName == 'App Development' ) {
        let div = document.getElementById( 'topicQuizApp' )
        div.classList = 'col'
    }
}