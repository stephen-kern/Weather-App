// back up of url that works
//"https://api.openweathermap.org/data/3.0/onecall?lat=32.77&lon=-96.79&units=imperial&exclude=minutely,hourly&contd=&appid=7795ade36b76f198c1f697ef13b679fe"


// Variables




const getWeather = function(data){
    // call api
    let apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=32.77&lon=-96.79&units=imperial&exclude=minutely,hourly&contd=&appid=7795ade36b76f198c1f697ef13b679fe";

    // fetch api
    fetch(apiUrl).then((response) => response.json())
    .then((data) => console.log(data));
};



// need a click event for the submit button that retrieves 
// city name, date, and add a weather icon
// temp, wind, humidity, and uv index


//save previous searches to #history-box











getWeather();