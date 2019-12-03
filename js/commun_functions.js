function aaa(){
	alert("coucouu");
}

function toExport(){
	$("#right-to-export").on('click', function(e) {
	    e.preventDefault();
	    toImport();
	});
	$("#left-to-export").on('click', function(e) {
	    e.preventDefault();
	    toImport()
	});
}

function toImport(){
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
		exportJS();
	});
}

// Act on clicks to a element
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



function exportJS(){
    var exportFavButton = document.getElementById('exportFav');
    exportFavButton.addEventListener('click', function() {
	  	console.log("exportFav!");
	    chrome.bookmarks.getTree(function(items) {
	    	var fvt = JSON.stringify(items);
	    	downloadFav(fvt, "myFavorites.json");
	    });
		    
	});

    var exportCookiesButton = document.getElementById('exportCookies');
    exportCookiesButton.addEventListener('click', function() {
	    console.log("exportCookies!");
	    chrome.cookies.getAll({}, function(cookies) {
	    	console.log(cookies);
	    	var cookies = JSON.stringify(cookies);
	    	downloadFav(cookies, "myCookies.json");
	    });
  	}, false);

    var exportHistoryButton = document.getElementById('exportHistory');
    exportHistoryButton.addEventListener('click', function() {
	    console.log("exportHistory!");
	    chrome.history.search({"text" : "", "maxResults" : 10000}, function(history) {
	    	console.log(history);
	    	var history = JSON.stringify(history);
	    	downloadFav(history, "myHistory.json");
	    });
    }, false);
  function downloadFav(textToSave, nameFile){
	var blob = new Blob([textToSave]);
	if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
	    window.navigator.msSaveBlob(blob, nameFile);
	else
	{
	    var a = window.document.createElement("a");
	    a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
	    a.download = nameFile;
	    document.body.appendChild(a);
	    a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
	    document.body.removeChild(a);
	}
  }
}


function importJS(){
    var importFavButton = document.getElementById('importFav');
    importFavButton.addEventListener('click', function() {
	  	console.log("importFav!");
	  	var favJson = getTextAreaValue("textAreaJsonContent");
console.log("jsoncontent:"+ favJson);
	  	//var fav = JSON.stringify(favJson);
	  	var fav = JSON.parse(favJson);
console.log("fav:");
console.log(fav);
console.log("recursiveBrowse::");
/*
console.log(fav.length);
console.log(fav[0]);
console.log(fav[0]["children"]);
console.log(fav[0]["children"][0]);
console.log(fav[0]["children"][0]["children"]);
console.log(fav[0]["children"][0]["children"][0]);*/
console.log(typeof fav[0]);
console.log(fav[0]);
// console.log(fav.title);
// console.log(fav["title"]);
/*createBookmarkNodes(parentid, bookmarks) {
    bookmarks.forEach(function(bm) {
        chrome.bookmarks.create({
            parentId: parentid,
            title: bm.title,
            url: bm.url
        }, function(result) {
            if (bm.submenu && bm.submenu.length > 0) {
                createBookmarkNodes(result.id, bm.submenu);
            }
        });
    });
}
*/

console.log("cocou");
//var myFavs = fav[0]["children"][0]["children"];
var myFavs = fav;
console.log(myFavs);
//console.log(myFavs[0]);

myFct(myFavs);
function myFct(_fav){
	_fav.forEach(function(bm) {
		// chrome.bookmarks.onCreated.addListener(function(id, bookmark) {
		// 					console.log("youpiiiiii"+id);
		// 					console.log(bookmark);
		// 				});
		//if(bm.hasOwnProperty("children")){
//console.log("children!!!");
//console.log(bm.children);
			//console.log(bm);
			if(typeof bm.parentId === "undefined"){
				console.log("dossier racine");
				if(typeof bm.children !== "undefined"){
					console.log("a des enfants");
					myFct(bm.children);
				}
			}else{
				console.log("dossier enfant");
				//console.log(bm.children);
				if(typeof bm.children !== "undefined"){
					//on cree le dossier et on appelle recursivement cette fonction
					console.log(bm.title);
					console.log(bm.parentId);
					console.log(bm.index);
					console.log(bm.url);
					//si le parent est pas un des 2 dossier non modifiable dans le dossier racine
					if(bm.id !== "1" && bm.id !== "2"){
						chrome.bookmarks.create({"parentId": bm.parentId, "index": parseInt(bm.index), "title": bm.title, "url": bm.url});

						/*
, function(result){
						console.log("folder created!!");
						console.log(result);
						if(typeof result !== "undefined" && result.hasOwnProperty("id")){
							bm.id = result.id;
						console.log(bm);
						myFct(bm.children);
						}
					}
						*/
					}else{
						myFct(bm.children);
					}
				}else{
					//on crée juste le bookmark
					console.log(bm.title);
					console.log(bm.parentId);
					console.log(bm.index);
					console.log(bm.url);
					chrome.bookmarks.create({"parentId": bm.parentId, "index": parseInt(bm.index), "title": bm.title, "url": bm.url});
					/*
, function(result){
						console.log("bookmark created!!");
						console.log(result);
						if(typeof result !== "undefined" && result.hasOwnProperty("id")){
							bm.id = result.id;
						console.log(bm);
						//myFct(bm.children);
						}
					}
					*/
				}
			}
	});
}
		    
	});

    var importCookiesButton = document.getElementById('importCookies');
    importCookiesButton.addEventListener('click', function() {
	    console.log("importCookies!");
	    /*chrome.cookies.getAll({}, function(cookies) {
	    	console.log(cookies);
	    	var cookies = JSON.stringify(cookies);
	    	downloadFav(cookies, "myCookies.json");
	    });*/
  	}, false);

    var importHistoryButton = document.getElementById('importHistory');
    importHistoryButton.addEventListener('click', function() {
	    console.log("importHistory!");
	    /*chrome.history.search({"text" : "", "maxResults" : 10000}, function(history) {
	    	console.log(history);
	    	var history = JSON.stringify(history);
	    	downloadFav(history, "myHistory.json");
	    });*/
    }, false);

    function getTextAreaValue(_idTextArea){
    	return $('textarea#'+_idTextArea).val();
    }
}





/*
	    	USE A RECURSIVE FCT TO PARSE EVERYTHG
	    	for (var i = 0; i < items.length; i++) {
	    		//console.log(items[i]);
	    		//console.log("hihi");
	    		//console.log(items[i]);
	    		//console.log(items[i]["children"].length);
				for (var j = 0; j < items[i]["children"].length; j++) {
					//console.log("haha");
					//console.log(items[i]["children"][j]["children"]);
					for (var k = 0; k < items[i]["children"][j]["children"].length; k++) {
						console.log(items[i]["children"][j]["children"][k]);
						for (var l = 0; l < items[i]["children"][j]["children"].length; k++) {
							console.log("haha");
							console.log(items[i]["children"][j]["children"][k]);
						}
					}
				}
			}*/