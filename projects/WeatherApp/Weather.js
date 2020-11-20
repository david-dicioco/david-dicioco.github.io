var kelvinTemp;
var temperature;
var minTempurature = [];
var maxTempurature = [];
var windSpeed;
var fUnit = "\xB0" + "F";
var cUnit = "\xB0" + "C";

function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

function weatherForecast() {

	//display table and farenheit/celsius buttons
	document.getElementById('forecastTable').style.display = 'inline';

	var dayValue = 0;
	var dayCount = 5;
	var city = document.getElementById("city").value;
	
	var urlWeather = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=celsius&APPID=f61f1cffcc551cd5ba127f1246e4c6da';
	//units default to metric
	var urlForecast = 'http://api.openweathermap.org/data/2.5/forecast/daily?APPID=f61f1cffcc551cd5ba127f1246e4c6da&q=' + city + '&units=metric&cnt=5';

	var jsonData = JSON.parse(Get(urlWeather));
	var jsonDataForecast = JSON.parse(Get(urlForecast));

	var date = new Date();
	var month = date.getMonth() + 1;
	var kelvin = jsonData.main.temp;
	kelvinTemp = jsonData.main.temp;
	//console.log("current month: " + month);
	//console.log("date: " + month + "/" + date.getDate());

	windSpeed = Math.round(jsonData.wind.speed * (18/5));
	//converts kelvin to celsius
	temperature = Math.round(kelvin - 273.15);

	//determine the weather icon
	console.log("weather icon: " + jsonData.weather[0].icon);

	document.getElementById("forecast").innerHTML = jsonData.name + ", " + jsonDataForecast.city.country + "<br>"
	+ "<p id='currenttempurature'>" + temperature + " " + cUnit + "</p>" + jsonData.weather[0].description + "<br>" 
	+ "<img src='images/" + jsonData.weather[0].icon + ".png' height='80' width='80'>"
	+ "<p id='windspeed'> Wind: " + windSpeed + " km/h</p>"
	+ "<p> Humidity: " + jsonData.main.humidity + "%" + "</p>";

	var dateValue = date.getDate();

	//tempurature is celsius by default
	minTempurature = [Math.round(jsonDataForecast.list[0].temp.min), Math.round(jsonDataForecast.list[1].temp.min),
					Math.round(jsonDataForecast.list[2].temp.min), Math.round(jsonDataForecast.list[3].temp.min),
					Math.round(jsonDataForecast.list[4].temp.min)];

	maxTempurature = [Math.round(jsonDataForecast.list[0].temp.max), Math.round(jsonDataForecast.list[1].temp.max),
					Math.round(jsonDataForecast.list[2].temp.max), Math.round(jsonDataForecast.list[3].temp.max),
					Math.round(jsonDataForecast.list[4].temp.max)];

	for (i = 0; i < dayCount; i++) {
		
		dayValue += 1;
		
		document.getElementById("day" + dayValue).innerHTML = month + "/" + dateValue + "<br>" +
		jsonDataForecast.list[i].weather[0].description + "<br>" + "<br>" +
		"<img src='images/" + jsonDataForecast.list[i].weather[0].icon + ".png' height='80' width='80'>" +
		"<p id = ForcastTemp" + dayValue + ">" + "Min: " + minTempurature[i] + " " + cUnit +  ", " + "Max: " +
		maxTempurature[i] + " " + cUnit + "</p>";

		dateValue += 1;
	}
}

function calculateFahrenheit() {

	var mintempvalue = 0;
	var windSpeedImperial;

	var minTemps = [];
	var maxTemps = [];

	minTemps = [Math.round(minTempurature[0] * (9/5) + 32), Math.round(minTempurature[1] * (9/5) + 32),
				Math.round(minTempurature[2] * (9/5) + 32), Math.round(minTempurature[3] * (9/5) + 32),
				Math.round(minTempurature[4] * (9/5) + 32)];

	maxTemps = [Math.round(maxTempurature[0] * (9/5) + 32), Math.round(maxTempurature[1] * (9/5) + 32),
				Math.round(maxTempurature[2] * (9/5) + 32), Math.round(maxTempurature[3] * (9/5) + 32),
				Math.round(maxTempurature[4] * (9/5) + 32)];

	document.getElementById("ForcastTemp1").innerHTML = "Min: " + minTemps[0] + " " + fUnit + ", " + "Max: " + maxTemps[0] + " " + fUnit;
	document.getElementById("ForcastTemp2").innerHTML = "Min: " + minTemps[1] + " " + fUnit + ", " + "Max: " + maxTemps[1] + " " + fUnit;
	document.getElementById("ForcastTemp3").innerHTML = "Min: " + minTemps[2] + " " + fUnit + ", " + "Max: " + maxTemps[2] + " " + fUnit;
	document.getElementById("ForcastTemp4").innerHTML = "Min: " + minTemps[3] + " " + fUnit + ", " + "Max: " + maxTemps[3] + " " + fUnit;
	document.getElementById("ForcastTemp5").innerHTML = "Min: " + minTemps[4] + " " + fUnit + ", " + "Max: " + maxTemps[4] + " " + fUnit;

	temperature = Math.round((9/5) * (kelvinTemp - 273) + 32);
	document.getElementById("currenttempurature").innerHTML = temperature + " " + fUnit;

	windSpeedImperial = Math.round(windSpeed/1.61);
	document.getElementById("windspeed").innerHTML = "Wind: " + windSpeedImperial + " mph";
}

function calculateCelsius() {

	document.getElementById("ForcastTemp1").innerHTML = "Min: " + minTempurature[0] + " " + cUnit + ", " + "Max: " + maxTempurature[0] + " " + cUnit;
	document.getElementById("ForcastTemp2").innerHTML = "Min: " + minTempurature[1] + " " + cUnit + ", " + "Max: " + maxTempurature[1] + " " + cUnit;
	document.getElementById("ForcastTemp3").innerHTML = "Min: " + minTempurature[2] + " " + cUnit + ", " + "Max: " + maxTempurature[2] + " " + cUnit;
	document.getElementById("ForcastTemp4").innerHTML = "Min: " + minTempurature[3] + " " + cUnit + ", " + "Max: " + maxTempurature[3] + " " + cUnit;
	document.getElementById("ForcastTemp5").innerHTML = "Min: " + minTempurature[4] + " " + cUnit + ", " + "Max: " + maxTempurature[4] + " " + cUnit;

	temperature = Math.round(kelvinTemp - 273.15);
	document.getElementById("currenttempurature").innerHTML = temperature + " " + cUnit;

	document.getElementById("windspeed").innerHTML = "Wind: " + windSpeed + " km/h";
}

function validateText() {
    if (document.getElementById("city").value == "") {
        alert("Enter a city");
        document.getElementById("city").focus();
        return false;
    }
    if (!/^[a-zA-Z]*$/g.test(document.getElementById("city").value)) {
        alert("Invalid characters");
        document.getElementById("city").focus();
        return false;
    } else {
		weatherForecast();
	}
}