const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details')
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')

const updateUI = (data) => {
//    const cityDets = data.cityDets;
//    const weather = data.weather;

//destructure properties prendo proprietà da un oggetto e le metto in una costante con lo stesso nome
const {cityDets, weather} = data;
console.log(data);

   //update details template
   details.innerHTML = `
     <h5 class="my-3">${cityDets.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
       <div class="display-4 my-4">
       <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
      </div>
   `;

    //update night/day & icon images
     const iconSrc = `img/icons/${weather.WeatherIcon}.svg`; //weather icon propietà di weather il suo numero corrisponde all'immagine che ho in icon
    icon.setAttribute('src', iconSrc);

    // let timeSrc = null; //source dell'immagine che voglio 
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg';
    // } else{
    //     timeSrc = 'img/night.svg';
    // }

    // //ternary operator
    // const result = condition ? 'value 1' : 'value 2'; //risultato della condizione? true value 1 false velue 2 salva il risultato in result
 
      let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timeSrc);

    //remove d-none class
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};
  
  
   
  
const updateCity = async (city) => {
    
    const cityDets = await getCity(city); //await perché aspetto che la funzione sia finita prima di assegnare il valore alle costanti
    const weather = await getWeather(cityDets.Key);

    // return {
    //     cityDets: cityDets,
    //     weather: weather
    // }; quando il nome e il valore coincidono posso non scrivere il nome
    return {
         cityDets,
          weather
    };
};

cityForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      //get cuty value
      const city = cityForm.city.value.trim();
      cityForm.reset();

      //update ui with new city
      updateCity(city)
      .then(data =>  updateUI(data))
      .catch(err => console.log(err))
    });
