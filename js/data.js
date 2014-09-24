
$(document).ready(function(){
    console.log("Initial");/*
    $.ajax({
        url: 'http://www.cs.odu.edu/~ibl/JSON/fall14.js',
        dataType: 'script',
        crossDomain: true,
        success: function(data){

            var text = '';

            console.log("ajax success");
            console.log(data);

        },
        error: function(e){
            console.log("ajax error");
            console.log(e)
        }
    });*/
    /*
    function callbackFunction(response){
        console.log(response);
    }

    function request(callback){
        console.log("-- called request");

        return 
            $.ajax({
                url: 'http://www.cs.odu.edu/~ibl/JSON/fall14.js',
                dataType: 'script',
                crossDomain: true,
                success: callback
            });
    }


    request(callbackFunction);
    */
    /*
    function requestClasses(crossDomainUrl) {
        return $.ajax({
            url: crossDomainUrl,
            type : 'GET',
            dataType: 'jsonp',
            crossDomain: true
         });
    }

    requestClasses('http://www.cs.odu.edu/~ibl/JSON/fall14.js')
        .done(function(data) {
            console.log("success: " + data);
        })
        .fail(function(jqXHR, textStatus, ex) {
            console.log("failed: " + textStatus);
        });
    */

    /*
    $.getScript('http://www.cs.odu.edu/~ibl/JSON/fall14.js', function(data, textStatus, jqxhr){
        console.log( data ); // Data returned
        console.log( textStatus ); // Success
        console.log( jqxhr.status ); // 200
    })

    */

    $.ajax({
        url: "data/fall_2014.js",
        jsonp: false,
        dataType: "script",
        success: function(data){
            console.log(data.JASON.main);
        }
    })

})
        
/*
function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        // XHR has 'withCredentials' property only if it supports CORS
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){ // if IE use XDR
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

var request = createCORSRequest( "get", "http://www.google.com" );

if ( request ){
    // Define a callback function
    request.onload = function(){};
    // Send request
    request.send();
}
*/