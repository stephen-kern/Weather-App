
// Variables
const apiKey = "7795ade36b76f198c1f697ef13b679fe";
let curTemp = document.getElementById("cur-temp");
let curWind = document.getElementById("cur-wind");
let curHum = document.getElementById("cur-hum");
let curUvi = document.getElementById("cur-uvi");

let array = [];
let todayDate = moment().format('MMMM Do YYYY');

$('#search-btn').on('click', function(){
    let city = $('#search-city').val().trim();
    if (!city.value){
        return;
    }    
    localStorage.setItem(city, JSON.stringify(city));

    // format the api to retrieve the city and current weather
    // let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    
    // fetch the open weather API
    fetch(cityUrl).then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);

        let lat = data.coord.lat;
        let lon = data.coord.lon;

        $('#city-name').text(data.name);
        $('#date').text(todayDate);

        // const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

        fetch(apiUrl).then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data);
        })
        .catch(function(err){
            console.error(err);
        });

        weatherStats(data);

    });
});


function weatherStats(data) {
    $(curTemp).text("Temp: " + data.current.temp + " Deg");
    $(curWind).text("Wind Speed: " + data.current.wind_speed + " MPH");
    $(curHum).text("Humidity: " + data.current.humidity + " %");
    $(curUvi).text("UV Index : " + data.current.uvi);
        if('#cur-uvi' > 7) {
            $('#cur-uvi').addClass('.red .light-text');
        } else if ('#cur-uvi' > 5) {
            $('#cur-uvi').addClass('.yellow .dark-text');
        } else {
            $('#cur-uvi').addClass('.green .light-text');
        }
    $('cur-icon').attr(
        'src', `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`
    ).attr(
        'alt', 'weather status icon'
    );

    for (let i = 1; i < data.daily.length; i++){
        let forecast = array[i];
        if (i === 6) {break;}
        let nextDate = moment().add(i, 'd').format('MMMM Do YYYY');
        let card = $('<div>').addClass('card p-10 col-md-2 m-3 align-items-center text-center bg-light border border-dark-shadow');
        let cardBody = $('<div>').addClass('card-body');
        let cardDate = $('<h5>').addClass('card-subtitle').text(nextDate);
        let cardText = $('<p>')
        .addClass('card-text')
        .text("High Temp : " + data.daily[i].temp.max);
        let cardText2 = $('<p>')
        .addClass('card-text')
        .text('Humidity : ' + data.daily[i].humidity);
        let cardText3 = $('<p>')
        .addClass('card-text')
        .text('Wind : ' + data.daily[i].wind_speed + " MPH");
        let cardText4 = $('<p>')
        .addClass('card-text')
        .text('UV Index : ' + data.daily[i].uvi);
        if (data.daily[i].uvi > 7) {
            cardText4.addClass('bg-danger text-white');
        } else if (data.daily[i] > 5) {
            cardText4.addClass('bg-warning text-dark');
        } else {
            $(cardText4).addClass('bg-success text-white');
        }
        let img = $('<img>').attr(
            'src', `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png`
        ).attr(
            'alt', 'weather icon'
        );

        cardBody.append(
            cardDate,
            cardText,
            cardText2,
            cardText3,
            cardText4,
            img
        );

        card.append(cardBody);
        $('#forecastBox').append(card);
    }
};

