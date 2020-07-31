const main = document.getElementById('mainDiv');
const date = document.getElementById('date');
const blink = document.getElementById('blink');
const sample = document.getElementById('sample');
const confirmedCases = document.getElementById('confirmedCases');
const activeCases = document.getElementById('activeCases');
const discharged = document.getElementById('discharged');
const death = document.getElementById('death');
const table = document.getElementById('table');


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
},400)

//GETTING THE API

gettingAPI = ()=>{
    let request = new XMLHttpRequest();
    request.open('GET', 'https://covidnigeria.herokuapp.com/api', true);

    request.onload = ()=>{
            data = JSON.parse(request.responseText);

            let output = '';

                for (let i in data){

                    sample.innerHTML = data[i].totalSamplesTested;
                    confirmedCases.innerHTML = data[i].totalConfirmedCases;
                    activeCases.innerHTML = data[i].totalActiveCases;
                    discharged.innerHTML = data[i].discharged;
                    death.innerHTML = data[i].death;
                    
                    //LETS GET THE STATES INDEX
                    let s = data[i].states;

                    //NOW WE CAN LOOP THROUGH THEM
                    for(let ii in s){

                        output += '</tr>'+'<tr>'+'<td>'+s[ii].state+'</td>'+'<td>'+s[ii].confirmedCases+'</td>'+'<td>'+s[ii].casesOnAdmission+'</td>'+'<td>'+s[ii].discharged+'</td>'+'<td id="deathColumn">'+s[ii].death+'</td>';
                    }
                
                    table.insertAdjacentHTML("beforeend", output);   
                 }
                 
    }

    //IF IN CASE ANYTHING GOES WRONG, LET'S ALERT THE CLIENT
    request.onerror = ()=>{
        alert('An error occured while communicating with the server at the moment. If you keep getting this error message, please inform the developer @twitter.com/shamxeed05')
}

    request.send();
}
gettingAPI();