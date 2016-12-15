$(function() {
    var geoCoder;
    function getLocationSuccess(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        var latlng = new google.maps.LatLng(lat, long);
        geoCoder.geocode({'latLng':latlng}, function(result, status) {
            var location = result[0].address_components.filter(function(data) {
                return data.types[0] === "locality" || data.types[0] === "country";
            });
            $('#city-name').text(location[0].long_name);
            $('#country-name').text(location[1].short_name);
            console.log(location);
            $("#loader").hide();
        });
    }


    $(document).ready(function() {
        $("#loader").show();
        if (navigator.geolocation) {
            geoCoder = new google.maps.Geocoder();
            navigator.geolocation.getCurrentPosition(getLocationSuccess);
        }
    });
});