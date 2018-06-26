var fs = require('fs');
var url = require('url');

function renderHtml(path, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile(path, null, function (error, data) {
        if (error) {
            response.writeHead(404);
            response.write("FIle not found !");
        }
        else {
            response.write(data);
        }
        response.end();
    });
}

function renderJson(response){
    var obj={};
    response.writeHead(200,{'Content-Type':'application/json'});
    obj["unix"]="1234";
    response.write(JSON.stringify(obj));
    response.end();
}
function findip(remoteAddress){
     let isV6 = remoteAddress.indexOf(':') >= 0;
 
    // We split the address every colon, then reverse the array
    // and grab the first item, which will be the actual IPv4 address
    return isV6 ? remoteAddress.split(':').reverse()[0] : remoteAddress;
}
module.exports = {
    onRequest: function (request, response) {
       // console.log(request.headers);
       //console.log(request.connection.remoteAddress);
        //console.log(request.socket.remotePort);
      // console.log( request.headers);
      
      // console.log(findip(request.connection.remoteAddress));
        response.writeHead(200, { 'Content-Type': 'text/html' });
        var path = url.parse(request.url).pathname;
//console.log( request.headers["host"]);
        switch (path) {
            case '/': renderHtml('./index.html', response);
                break;
            case '/api/whoami':renderJson(response);   
                                break; 
            default:renderHtml('',response);    
        }
    }
};