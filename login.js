(function(){
    const adminUserName = 'admin';
    const adminPassword = 'admin';
    window.onload = function () {
        document.querySelector( 'body' ).style.opacity = 1
        let creatAccountBtn = document.getElementById( 'createAccount' )
        creatAccountBtn.addEventListener( 'click', goToRegistrationPage )
    
        let signInBtn = document.querySelector( 'form' )
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
        let allUserData = event.target.querySelectorAll( 'input' )
    
        let data = {
            username: allUserData[ 0 ].value,
            password: allUserData[ 1 ].value
        }
        if(data.username == adminUserName && data.password == adminPassword){
            window.location.assign(`adminPage.html`)
        }
        else{
            let validate = validateData( data )
            if ( validate ) {
                let activeUser = {}
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
    }
    
    function validateData ( data ) {
        let localData = JSON.parse( localStorage.getItem( 'userRegistrationDetails' ) )
        for ( let i = 0; i < localData.length; i++ ) {
            if ( localData[ i ][ 'username' ] == data.username && localData[ i ][ 'password' ] == data.password ) {
                let userSelectedCourse = localData[ i ].selectedCourse
                return userSelectedCourse
            }
        }
        return false
    }
})();
