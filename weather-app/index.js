$(function() {
    var geoCoder;
    var API_KEY = "939efa48cb363b754c447eb705942aa0";
    var API_URL = "https://api.darksky.net/forecast/" + API_KEY + "/";
    var skycons = new Skycons({"color": "black"});
    var celciusWeather = 0;

    function getLocationSuccess(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var latlng = new google.maps.LatLng(lat, long);
        
        geoCoder.geocode({'latLng':latlng}, onGetGeoLocation);

        getWeatherInfo(lat, long).done(function(response) {
            $('#weather-degree').text(response.currently.temperature);
            celciusWeather = response.currently.temperature;
            $('#weather-type').text(response.currently.summary);
            loadWeatherIcon(response.currently.icon);
            $('#loader').hide();
        });
    }

    function onGetGeoLocation(result, status) {
        var location = result[0].address_components.filter(function(data) {
                return data.types[0] === "locality" || data.types[0] === "country";
        });
        $('#city-name').text(location[0].long_name);
        $('#country-name').text(location[1].short_name);
    }

    function getWeatherInfo(lat, long) {
        var completeURL = API_URL + lat + "," + long + "?exclude=minutely,hourly,daily,alerts,flags&units=si"
        return $.ajax({
            url: completeURL,
            type: "GET",
            dataType: "jsonp"
        });
    }

    function loadWeatherIcon(iconName) {
        skycons.set("weather-icon", iconName);
        skycons.play();
    }

    $(document).ready(function() {
        $("#loader").show();
        if (navigator.geolocation) {
            geoCoder = new google.maps.Geocoder();
            navigator.geolocation.getCurrentPosition(getLocationSuccess);
        }

        $('#unit-toggle').click(function(){
            var val = $(this).text();
            var updatedWeatherValue = 0;
            if (val === "C") {
                updatedWeatherValue = celciusWeather * 9 / 5 + 32;
                $(this).text("F");
            }else{
                updatedWeatherValue = celciusWeather;
                $(this).text("C");
            }

            $('#weather-degree').text(updatedWeatherValue.toFixed(2));
        })        
    });
});