window.onload = function(){
    let adminStatisticsBtn = document.getElementById('adminSideNavBarOptionStatistics')
    adminStatisticsBtn.addEventListener('click', showStatistics)
}

let data = JSON.parse(localStorage.getItem('quizScore'))

let webDevelopmentDataUserName = []
let webDevelopmentDataUserResult = []
let appDevelopmentDataUserName = []
let appDevelopmentDataUserResult = []

for(let i = 0; i < data.length; i++){
    if(data[i].course == 'Web Design'){
        webDevelopmentDataUserName.push(data[i].name)
        webDevelopmentDataUserResult.push(data[i].score)
    }
    else if(data[i].course == 'App Development'){
        appDevelopmentDataUserName.push(data[i].name)
        appDevelopmentDataUserResult.push(data[i].score)
    }
}

function showStatistics(){
    let showChart = document.getElementById('adminShowStatistics')
    if(showChart.classList == 'row d-none'){
        showChart.classList = 'row'
    }
    else{
        showChart.classList = 'row d-none'
    }

    webDevelopment()
    appDevelopment()
}

function webDevelopment(){
    new Chart(document.getElementById('webDevelopmentChart'),{
        type: 'bar',
        data: {
            labels: webDevelopmentDataUserName,
            datasets:[
                {
                    label: 'Web Design Evaluation Results',
                    backgroundColor: '#7a80b4',
                    data: webDevelopmentDataUserResult
                }
            ]
        },
        options:{
            scales:{
                yAxes:[
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Percentage of Marks',
                            fontSize: 15,
                            fontColor: '#0e0c28'
                        },
                        ticks:{
                            beginAtZero: true,
                            callback: function(value, index, values) {
                                return `${value} %`
                            }
                        }
                    }
                ],
                xAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Student Names',
                            fontSize: 20,
                            fontColor: '#0e0c28'
                        }
                    }
                ]
            }
        }
    })
}


function appDevelopment(){
    new Chart(document.getElementById('appDevelopmentChart'),{
        type: 'bar',
        data: {
            labels: appDevelopmentDataUserName,
            datasets:[
                {
                    label: 'App Development Evaluation Results',
                    backgroundColor: '#6f7bec',
                    data: appDevelopmentDataUserResult
                }
            ]
        },
        options:{
            scales:{
                yAxes:[
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Percentage of Marks',
                            fontSize: 15,
                            fontColor: '#0e0c28'
                        },
                        ticks:{
                            beginAtZero: true,
                            callback: function(value, index, values) {
                                return `${value} %`
                            }
                        }
                    }
                ],
                xAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Student Names',
                            fontSize: 20,
                            fontColor: '#0e0c28'
                        }
                    }
                ]
            }
        }
    })
}