L.mapbox.accessToken = 'pk.eyJ1Ijoiaml3b255b29uIiwiYSI6IklscjNONVkifQ.UR5XyoM6aKmj2DqVh4xWRw';
var map = L.mapbox.map('map')
    .setView([40.739, -73.986], 11);


var baseLayer = L.mapbox.tileLayer('mapbox.dark');
baseLayer.setOpacity(0.9);
baseLayer.addTo(map);



var overlays = L.layerGroup();

var layers;

var width = $('#map').width(),
	height = $('#map').height();

var filters = document.getElementById('colors').filters;
var list = [];

function showStations(){
	list.length = 0; 
    for (var i = 0; i < filters.length; i++) {

        if (filters[i].checked) list.push(filters[i].value);


    }
            console.log(list);
            getData();
}


function getData(){
	d3.csv('mapdata.csv', function(error, data){
	// showStations();	
		    overlays.clearLayers();
	data.forEach(function(d) {makeMap(d);});	

	overlays.addTo(map);	


	})
}

function makeMap(d) {

    if (list.indexOf(d.Complaint_Type) !== -1) {
    	init(d);
        }
    }

   
function init(d){


	var color = getColor2(d);
	var lat = parseFloat(d.Latitude);
	var lon = parseFloat(d.Longitude);



    var marker = L.circleMarker([lat, lon], {
        radius: 2,
        fillColor: color,
        fillOpacity: 0.7,
        weight: 0.5,

      }).bindPopup("<strong>"+d.City+"</strong>" + "</br>"+ "Type: " + d.Complaint_Type + "</br>" +"Reason: "+ d.Descriptor)
	.addTo(overlays);



}






function getColor2(d){

	   if(d.Complaint_Type == 'Blocked Driveway') { return '#f6c532'; }
  else if(d.Complaint_Type == 'Dirty Conditions') { return '#76f024'; }
  else if(d.Complaint_Type == 'Illegal Parking') { return '#2b52a0'; }
  else if(d.Complaint_Type == 'Noise') { return '#4ac0f3'; }
  else if(d.Complaint_Type == 'PAINT/PLASTER') { return '#fcf733'; }
  else if(d.Complaint_Type == 'PLUMBING') { return '#f28330'; }
  else if(d.Complaint_Type == 'Street Condition') { return '#ed462f'; }
  else if(d.Complaint_Type == 'Street Light Condition') { return '#60e4fc'; }
  else if(d.Complaint_Type == 'UNSANITARY CONDITION') { return '#f8b732'; }
    else if(d.Complaint_Type == 'Water System') { return '#72f4ac'; }	


}

