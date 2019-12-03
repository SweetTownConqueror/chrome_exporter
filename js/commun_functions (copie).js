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
rec(fav)
function rec(_fav){
	function callback() {
	    if (chrome.runtime.lastError) {
	        console.log(chrome.runtime.lastError.message);
	    } else {
	        // Tab exists
	    }
	}
	for(var i = 0; i< _fav[i].length; i++){
			//console.log("objet");
			if( (typeof _fav[i] !== "undefined") && ("children" in _fav[i]) ){
				console.log("itisafolder");console.log(_fav[i]);
				//console.log("icii");
				//console.log(_fav[i]["children"]);
				//if(typeof _fav[i]["parentId"] === "undefined"){
				//	console.log("---parentId undefined");
				//}else{
					//creation dossier
					
					console.log("folder");
					console.log("parent id: "+_fav[i]["parentId"]);
					console.log("index: "+_fav[i]["index"]);
					console.log("title: "+_fav[i]["title"]);
					console.log("id: "+_fav[i]["id"]);
					chrome.bookmarks.create({"parentId" : _fav[i]["parentId"], "index" : _fav[i]["index"], "title" : _fav[i]["title"]}, function(result){
						console.log("folder created!!");
						console.log(result);
						/*if(typeof result !== "undefined"){
							console.log("theresultisundefined")
						}*/
					});
					/*chrome.bookmarks.create({"parentId" : _fav[i]["parentId"], "index" : _fav[i]["index"], "title" : _fav[i]["title"]}, function(result) {
			            // if (bm.submenu && bm.submenu.length > 0) {
			            //     createBookmarkNodes(result.id, bm.submenu);
			            // }
			            console.log("-------------");
			            console.log(_fav[i]);
			            console.log("-------------");
			            console.log("folder created parentId: "+_fav[i]["parentId"]+" index: "+_fav[i]["index"]+" title: "+_fav[i]["title"]+" id:"+_fav[i]["id"]);
		        
		        }); */
				//}
				rec(_fav[i]["children"]);
			}/*else{
				//creation du favoris
				console.log("file");
				console.log(_fav[i]["title"]);
				console.log(_fav[i]["url"]);
				console.log(_fav[i]["parentId"]);
				console.log(_fav[i]["index"]);
				if(typeof _fav[i]["parentId"] === "undefined"){
					console.log("bookmarkparentidundefined!!!");
					console.log(_fav[i]);
				}
				chrome.bookmarks.create({"parentId" : _fav[i]["parentId"], "index" : _fav[i]["index"], "title" : _fav[i]["title"], "url" : _fav[i]["url"]});
			}*/
	}
}

/*for(var i in fav){
	console.log(typeof i);
	if(typeof i === 'object' && i !== null){
		console.log("je passe par ici");
		console.log(i["children"]);
	}else{
		console.log("je passe par la");
		console.log(i);
	}
}*/

/*
for(var i in fav){
	console.log(i);
	//console.log(i.length);
	for(j in i){
		console.log(j);
	}
}*/
		//recursiveBrowse(fav);
	
	/*function recursiveBrowse(_children){
		for (var i in _children) {
			console.log(i);
			console.log(i["children"]);
		}
	}*/
	  	//const url = chrome.runtime.getURL('/home/toto/Téléchargements/myFavorites (1).json');
	  	//fileHandle = await window.chooseFileSystemEntries();
	  	/*chrome.fileSystem.chooseEntry({}, function callback(){

	  	} );*/
	    /*chrome.bookmarks.getTree(function(items) {
	    	var fvt = JSON.stringify(items);
	    	downloadFav(fvt, "myFavorites.json");
	    });*/
		    
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