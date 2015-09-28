$('.graph').click(function() {


	$('.graph').css('border-color', 'rgba(72,194,246,1)');
	$('.mapp').css('border-color', 'rgba(255,255,255,0.5)');



	$('.guide_complain').css('visibility', 'visible');
	$('#viz').css('visibility', 'visible');
	$('#map').css('visibility', 'hidden');
	$('form#colors').hide();
	$('.datainfo').hide();



	svg.selectAll("circle").each(function(e) {

		 e.cx = x( getX(e.Neighborhood) );
		 e.cy = y( getY(e.Neighborhood) );
	});

	force.resume();
});

$('.mapp').click(function() {

	
	$('.graph').css('border-color', 'rgba(255,255,255,0.5)');
	$('.mapp').css('border-color', 'rgba(72,194,246,1)');

	$('form#colors').show();
	$('.datainfo').show();

	$('#map').css('visibility', 'visible');
	$('.guide_complain').css('visibility', 'hidden');
	$('#viz').css('visibility', 'hidden');

});




