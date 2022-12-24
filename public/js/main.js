const submitBtn= document.getElementById("submitBtn");
const cityName= document.getElementById("cityName");
const city_name= document.getElementById("city_name");

const temp_status= document.getElementById("temp_status");
const temp= document.getElementById("temp_data");
const datahide= document.querySelector('.middle_layer');

// function getDayName(date = new Date(), locale = 'en-US') {
//     return date.toLocaleDateString(locale, {weekday: 'long'});
// }

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
let current_datetime = new Date();
var dayName = days[current_datetime.getDay()];
document.getElementById("day").innerText= dayName;
let formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear();
document.getElementById("today_date").innerText= formatted_date;


const getInfo= async(event) =>{
    event.preventDefault();
    let cityVal= cityName.value;
    console.log(cityVal);
    
    if(cityVal===""){
        city_name.innerText= "Enter some city name before search";
        datahide.classList.add('data_hide');
    }else{
        try{
        let url= `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=f7b17195f435b1a5655c2d4edee5e356`
        const response= await fetch(url);
        const data= await response.json();
        const arrData= [data];

        const weatherState= arrData[0].weather[0].main;
        if(weatherState=="Clouds"){
            temp_status.innerHTML= '<i class="fa-solid fa-cloud"></i>'
        }else if(weatherState=="Rain"){
            temp_status.innerHTML= '<i class="fa-solid fa-cloud-rain"></i>'
        }else if(weatherState=="Clear"){
            temp_status.innerHTML= '<i class="fa-solid fa-sun"></i>'
        }else if(weatherState=="Smoke"){
            temp_status.innerHTML= '<i class="fa-solid fa-smog"></i>'
        }else if(weatherState=="Snow"){
            temp_status.innerHTML= '<i class="fa-solid fa-snowflake"></i>'
        }else if(weatherState=="Wind"){
            temp_status.innerHTML= '<i class="fa-solid fa-wind"></i>'
        }else {
            temp_status.innerHTML= weatherState;
        }
        datahide.classList.remove('data_hide');
        console.log(data);
        temp.innerText= arrData[0].main.temp;
        city_name.innerText= `${arrData[0].name}, ${arrData[0].sys.country}`

        }catch(e){
            console.log(e);
            city_name.innerText= "Enter some valid city name";
            datahide.classList.add('data_hide');
        }

    }
}
submitBtn.addEventListener('click',getInfo);