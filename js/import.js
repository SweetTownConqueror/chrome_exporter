$(document).ready(function() {
	//$.getScript("js/export.js");
	//alert("000");
	$( "#body-popup" ).load( "./export.html",function(data, status, jqXGR) { 

		$("#right-to-import").on('click', function(e) {
		    // prevent the default action, in this case the following of a link
		    e.preventDefault();
		    $( "#body-popup" ).load( "./import.html",function(data, status, jqXGR) {
		    	toExport();
		    	importJS()
		    } );
		});
		$("#left-to-import").on('click', function(e) {
		    e.preventDefault();
		    $( "#body-popup" ).load( "./import.html",function(data, status, jqXGR) {
		    	toExport();
		    	importJS()
		    } ); 
		});
		//$( "#commun_functions" ).after( "<script>>>" );
		exportJS();
	}); 
});