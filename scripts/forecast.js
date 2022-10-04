const key = 'g468KxtBRjlI8xe2G8aiFy0eBnUTqxdN'; //api key

//get weater information
const getWeather= async (id) => { //id della città
      const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
      const query = `${id}?apikey=${key}`;

      const response = await fetch(base + query);
      const data = await response.json();

      return data[0];
};

//get city information
const getCity = async (city) => {
   const base = 'https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/locations/v1/cities/search'; //url dell' api endpoint per la città
   const query = `?apikey=${key}&q=${city}`;
   
   const response = await fetch(base + query); //prende base e query e li passa come un solo parametro 
   const data = await response.json();

   return data[0];
};



