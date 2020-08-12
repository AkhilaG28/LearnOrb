random = () => {
    return Math.floor( Math.random() * 255 )
}

randomColor = () => {
    return `rgb(${ random() },${ random() },${ random() })`
}

let lang = [ 'HTML', 'CSS', 'JavaScript', 'React', 'Java', 'Python', 'MySQL' ]
let generateColor = []

for ( let i = 0; i < lang.length; i++ ) {
    generateColor.push( randomColor() )
}

donut = () => {
    new Chart( document.getElementById( 'languages' ), {
        type: 'doughnut',
        data: {
            labels: lang,
            datasets: [
                {
                    label: 'Languages',
                    backgroundColor: generateColor,
                    borderColor: '#2196f3',
                    data: [ 13, 12, 14, 18, 25, 20, 10 ]
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Languages',
                fontSize: 45,
                fontColor: '#1d3c6a'
            }
        }
    } );
}

let years = [ 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020 ]
let students = [ 40, 55, 70, 100, 250, 480, 690, 925, 1200, 1600, 1898 ]

lineGraph = () => {
    new Chart( document.getElementById( 'graduatedStudents' ), {
        type: 'line',
        data: {
            labels: years,
            datasets: [ {
                label: 'Graduated Students',
                backgroundColor: '#009688',
                borderColor: 'rgb(0,0,0)',
                borderWidth: 2,
                fill: true,
                data: students
            },
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Graduated Students',
                fontSize: 45,
                fontColor: '#1d3c6a'
            },
            scales: {
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Number of Graduated Students',
                            fontSize: 15,
                            fontColor: 'crimson'
                        }
                    }
                ],
                xAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Years',
                            fontSize: 20,
                            fontColor: 'crimson'
                        }
                    }
                ]
            }
        }
    } )
}

window.addEventListener( 'load', () => {
    donut()
    lineGraph()
} )
