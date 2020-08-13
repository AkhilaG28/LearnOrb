window.onload = function () {
    document.querySelector( 'body' ).style.opacity = 1
    var creatAccountBtn = document.getElementById( 'createAccount' )
    creatAccountBtn.addEventListener( 'click', goToRegistrationPage )

    var signInBtn = document.querySelector( 'form' )
    signInBtn.addEventListener( 'submit', getUserData )
}

function goToRegistrationPage () {
    //this function creates a fade in transition effect
    document.querySelector( 'body' ).style.opacity = 0
    setTimeout( function () {
        window.location.href = 'index.html'
    }, 500 )
}

function getUserData () {
    event.preventDefault()
    var allUserData = event.target.querySelectorAll( 'input' )

    var data = {
        username: allUserData[ 0 ].value,
        password: allUserData[ 1 ].value
    }

    var validate = validateData( data )
    if ( validate ) {
        var activeUser = {}
        activeUser[ 'username' ] = allUserData[ 0 ].value
        activeUser[ 'selectedCourse' ] = validate
        // go to Dashboard
        let params = new URLSearchParams()
        params.append( 'user', activeUser.username )
        params.append( 'course', activeUser.selectedCourse )
        console.log( params.toString() );
        // window.location.href = ''
        window.location.assign( `userDashBoard.html?${ params.toString() }` )
    }
    else {
        // show error
        $( '#errorModal' ).modal( 'show' )
    }
}

function validateData ( data ) {
    var localData = JSON.parse( localStorage.getItem( 'userRegistrationDetails' ) )
    for ( var i = 0; i < localData.length; i++ ) {
        if ( localData[ i ][ 'username' ] == data.username && localData[ i ][ 'password' ] == data.password ) {
            let userSelectedCourse = localData[ i ].selectedCourse
            return userSelectedCourse
        }
    }
    return false
}