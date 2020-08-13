window.addEventListener( 'DOMContentLoaded', () => {
    //get the name of the user from URL and display in the application bar
    let user = new URLSearchParams( window.location.search )
    const userName = user.get( 'user' ).toUpperCase()
    const selectedCourse = user.get( 'course' )
    let userNameDiv = document.getElementById( 'userName' )
    userNameDiv.textContent = userName

    //display the card based on the selected course
    displayCard( selectedCourse )

} )


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