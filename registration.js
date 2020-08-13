window.onload = function(){
    document.querySelector('body').style.opacity = 1

    let formSubmit = document.querySelector('form')
    formSubmit.addEventListener('submit',getUserData)
}

function getUserData(){
    event.preventDefault()
    let selectedCourse = document.getElementById('selectedCourse').value
    
    if(selectedCourse == 'Video Editing' || selectedCourse == 'Seo Marketing' || selectedCourse == 'Content Writing'){
        alert('The Selected Course is Not Open for Admissions.')
    }
    else{
        let allUserData = event.target.querySelectorAll('input')
        let userData = {
            name: allUserData[0].value,
            username: allUserData[1].value,
            email: allUserData[2].value,
            password: allUserData[3].value,
            selectedCourse: selectedCourse
        }

        storeInLocalStorage(userData)
    }
    
}

function storeInLocalStorage(objData){
    
    if(localStorage.getItem('userRegistrationDetails')){
        let data = JSON.parse(localStorage.getItem('userRegistrationDetails'))
        if(!checkForSimilarUserName(objData,data)){
            data.push(objData)
            localStorage.setItem('userRegistrationDetails',JSON.stringify(data))
            // after registration go to the login page
            window.location.href = 'login.html'
        }
        else{
            alert('The username already exists, please change the username to register successfully.')
        }
    }
    else{
        let arr = []
        localStorage.setItem('userRegistrationDetails',JSON.stringify(arr))
        let data = JSON.parse(localStorage.getItem('userRegistrationDetails'))
        data.push(objData)
        localStorage.setItem('userRegistrationDetails',JSON.stringify(data))
        // after registration go to the login page
        window.location.href = 'login.html'
    }
}

function checkForSimilarUserName(userData, referenceData){
    let result = referenceData.find(item => item.username == userData.username)
    return result
}