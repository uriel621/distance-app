fetch('/retrieve_places')
    .then(function(response){ 
        return response.json()
    })
    .then(function(data) {
        if(data.length){
            location_history(data.reverse());
        }
})   


// https://developers.google.com/maps/documentation/javascript/distancematrix

// add input listeners
google.maps.event.addDomListener(window, 'load', function () {
    var from_places = new google.maps.places.Autocomplete(document.getElementById('from_places'));
    var to_places = new google.maps.places.Autocomplete(document.getElementById('to_places'));

        google.maps.event.addListener(from_places, 'place_changed', function () {
            var from_place = from_places.getPlace();
            var from_address = from_place.formatted_address;
            document.getElementById('origin').value = from_address;
        });

        google.maps.event.addListener(to_places, 'place_changed', function () {
            var to_place = to_places.getPlace();
            var to_address = to_place.formatted_address;
            document.getElementById('destination').value = to_address;
        });
});

// calculate distance
function calculateDistance() {
    var origin =  document.getElementById('origin').value;
    var destination =  document.getElementById('destination').value;
    var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                avoidHighways: false,
                avoidTolls: false
            }, callback);
}
// get distance results
function callback(response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {
        console.log('error', err);
    } 
    else if(response.rows[0].elements[0].status === 'NOT_FOUND'){
        alert('Your destinations is not found');
    }
    else {
        var origin = response.originAddresses[0];
        var destination = response.destinationAddresses[0];
        if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
            alert("There are no roads between "  + origin + " and " + destination);
        } 
        else {
            var locations = origin + ' / ' + destination;
            var distance = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;

            var td = '\
                    <td>'+locations+'</td> \
                    <td>'+distance+'</td> \
                    <td>'+duration+'</td> \
            ';
            var tr = document.createElement('TR');
                tr.innerHTML = td;
            document.getElementById('locations').insertBefore(tr, document.getElementById('locations').childNodes[0]);
            document.getElementById('from_places').value = '';
            document.getElementById('to_places').value = '';

            var form_data = new FormData()
                form_data.append('locations', locations);
                form_data.append('distance', distance);
                form_data.append('duration', duration);
            
            var request = new XMLHttpRequest();
                request.open('POST', '/insert', true);
                request.send(form_data);
        }
    }
}

// makes  <tr> tags 
function location_history(history_array){
    for(var obj of history_array){
        var td = '\
            <td>'+obj.locations+'</td> \
            <td>'+obj.distance+'</td> \
            <td>'+obj.travel_time+'</td> \
        ';
        var tr = document.createElement('TR');
            tr.innerHTML = td;
        document.getElementById('locations').appendChild(tr);
    }
}

// print results on submit the form
document.getElementById('distance_form').addEventListener('submit', function(e){
    e.preventDefault();
    calculateDistance();
})