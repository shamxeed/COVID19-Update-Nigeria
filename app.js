const main = document.getElementById('mainDiv');
const date = document.getElementById('date');
const blink = document.getElementById('blink');
const sample = document.getElementById('sample');
const confirmedCases = document.getElementById('confirmedCases');
const activeCases = document.getElementById('activeCases');
const dischargedCard = document.getElementById('discharged');
const deathCard = document.getElementById('death');
const table = document.getElementById('table');

const numberWithCommas = x =>  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')


//DISPLAYING DATE
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

window.addEventListener('load', ()=>{
    
    let day = new Date().getDay()
    let counter = (day - 1);
    let output = '';
    for(let i = counter; i < days.length; i++ ){
        output += days[day];
        if(i === counter){
            break;
        }
    }
    setInterval(()=>{

       let newDate = new Date();
       today = newDate.toLocaleString();
       date.innerHTML = `${output}, ${today}`;

    }, 1000)
})

//DANGER BLINK
setInterval(()=>{
    blink.style.backgroundColor = blink.style.backgroundColor == 'red' ? '#444' : 'red';
}, 400)

//GETTING THE API
gettingAPI = ()=>{
    let request = new XMLHttpRequest();
    request.open('GET', 'https://covidnigeria.herokuapp.com/api', true);

    request.onload = ()=>{

            response = JSON.parse(request.responseText);

            let output = '';

            const { totalSamplesTested, totalConfirmedCases, totalActiveCases, discharged, death, states } = response?.data || {}

            sample.innerHTML = numberWithCommas(totalSamplesTested)
            confirmedCases.innerHTML = numberWithCommas(totalConfirmedCases);
            activeCases.innerHTML = numberWithCommas(totalActiveCases)
            dischargedCard.innerHTML = numberWithCommas(discharged)
            deathCard.innerHTML = numberWithCommas(death)
            
            for(let i in states){

                output += '</tr>'+'<tr>'+'<td>'+states[i].state+'</td>'+'<td>'+states[i].confirmedCases+'</td>'+'<td>'+states[i].casesOnAdmission+'</td>'+'<td>'+states[i].discharged+'</td>'+'<td id="deathColumn">'+states[i].death+'</td>';
            }
        
            table.insertAdjacentHTML("beforeend", output)
                 
    }

    //IF IN CASE ANYTHING GOES WRONG, LET'S ALERT THE USER
    request.onerror = ()=>{
        alert('An error occured while communicating with the server at the moment. If you keep getting this error message, please inform the developer @twitter.com/shamxeed05')
}

    request.send();
}
gettingAPI();