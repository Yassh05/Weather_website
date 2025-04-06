const weatherform=document.querySelector('.weatherform');
const cityinput=document.querySelector('.cityinput');
const card=document.querySelector('.card');
const apikey = "38da08411eeb1d7bef7abe45ca16ebd1";

weatherform.addEventListener("submit", async event =>{
    event.preventDefault();
    const city=cityinput.value;
    if(city){
            try{
                const weatherdata= await getweatherdata(city);
                displayweather(weatherdata);

            }
            catch(error){
                console.error(error);
                geterror(error);
            }
    }
    else{
        geterror("Please Enter Valid City");
    }



});

async function getweatherdata(city){
    
    const apiurl=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response=await fetch(apiurl);
    console.log(response);
    if(!response.ok){
        throw new Error('could not fetch');
    }
        return await response.json();
}
function displayweather(data){
    console.log(data);

    const {name: city,
           main: {temp,humidity}, 
           weather: [{description, id}]} = data;

         card.textContent="";
        card.style.display="flex";

        const citya=document.createElement("h1");
        const tempa=document.createElement("p");
        const humiditya=document.createElement("p");
        const desca=document.createElement("p");
        const emojia=document.createElement("p");
        citya.textContent=city;
        tempa.textContent=`${(temp-273.15).toFixed(2)}°C`;
        humiditya.textContent=`Humidity: ${humidity}%`;
        desca.textContent=description;
        emojia.textContent=getemoji(id);

        citya.classList.add("city");
        tempa.classList.add("tempdisplay");
        humiditya.classList.add("humiditydisplay");
        desca.classList.add("descdisplay");
        emojia.classList.add("type");

        card.appendChild(citya);
        card.appendChild(tempa);
        card.appendChild(humiditya);
        card.appendChild(desca);
        card.appendChild(emojia);
}
function getemoji(weatherid){
    switch(true){
        case(weatherid>=200 && weatherid<300):
        return "⛈️";
        case(weatherid>=300 && weatherid<400):
        return "🌧️";
        case(weatherid>=500 && weatherid<600):
        return "🌦️";
        case(weatherid>=600 && weatherid<700):
        return "❄️";
        case(weatherid>=700 && weatherid<800):
        return "🌤️";
        case(weatherid===800):
        return "☀️";
        case(weatherid>=801 && weatherid<810):
        return "☁️";
        default:
            return "🌥️";
    }
}
function geterror(message){
        const error=document.createElement("p");
        error.textContent=message;
        error.classList.add("error");

        card.textContent="";
        card.style.display="flex";
        card.appendChild(error);
}