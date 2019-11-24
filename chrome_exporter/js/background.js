document.addEventListener('DOMContentLoaded', function() {
    var exportFavButton = document.getElementById('exportFav');
    exportFavButton.addEventListener('click', function() {
	  	console.log("exportFav!");
	    chrome.bookmarks.getTree(function(items) {
	    	var fvt = JSON.stringify(items);
	    	downloadFav(fvt, "myFavorites.json");
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
		    
	    });
		    
	});
//}, false);

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
}, false);