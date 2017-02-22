$(function () {
  console.log('ready');
  var url = 'http://api.openweathermap.org/data/2.5/weather';
  var apiKey = '4846f8ae0e168b5a24906e0c47ff92b5';

  function getWeather(url, cityName, apiKey, _fetchData) {
    $.ajax({
      dataType: "jsonp",
      url: url,
      //jsonCallback: 'fetchData',
      data: { q: cityName, APPID: apiKey },
      cache: true,
      success: function (data) {
          //data.city = city;
          _fetchData(data);
          console.log('sucess', data);
          var widget = showCity(data);
          $('.weatherData').html(widget);
      }
    }).fail(function(error) {
      console.error("Error", JSON.strigify(error));
      //alert('Error sending request');
    });
  }

//Randomize cities
  var cities = ['London', 'Berlin', 'New York', 'Tokyo', 'New Dehli', 'Moskau', 'Sydney', 'Oakland', 'Los Angeles', 'Boston', 'Rome'];

  $('.random').click(function() {
    var rCities = cities[Math.floor(Math.random()*cities.length)];
		console.log("Cities length: " + Math.floor(Math.random()*cities.length));
    console.log("Random city: ", rCities);
    getWeather(url, rCities, apiKey, fetchData);
    	//console.log('returnedData', fetchData);
      //getWeather(url, rCities, apiKey);
    });
  });

/*
   function showCity(data) {
    return "<h3>Weather: "+ data.weather[0].main  +"</h3>" +
           "<h3>Weather: "+ data.weather[0].description  +"</h3>";
  }
*/


  var prepareData = function(units) {
    var cityName = $('.cityName').val()
    if (cityName && cityName != '') {
      cityName = cityName.trim()
      getWeather()
    } else {
      alert ('Please enter a city name');
    }
  }

  $('.btn-metric').click(function() {
    prepareData('metric');
  })


  function fetchData (forecast) {
    console.log('forecast', forecast);
    var html = '',
    cityName = forecast.name,
    country = forecast.country //sys.country

      html += '<h3> Weather Forecast for ' + cityName + ', ' + country + '</h3>'
      /*forecast.list.forEach(function(forecastEntry, index, list) {
        html += '<p>' + forecastEntry.dt_txt + ': ' + forecastEntry.main.temp + '</p>';
      }) */
      $('.weatherData').html(html);
  };
