var fs=require('fs');
var url=require('url');

function renderHtml(path,response){
    response.writeHead(200,{'Content-Type':'text/html'});
    fs.readFile(path,null,function(error,data){
        if(error){
            response.writeHead(404);
            response.write("File Not Found !");
        }
        else{
            response.write(data);
        }
        response.end();
    });
}

function renderJson(path,response){
    var obj={};
    response.writeHead(200,{'Content-Type':'application/json'});
    response.write();
    response.end();
}

module.exports={
    onRequest:function(request,response){
        response.writeHead(200,{'Content-Type':'text/html'});
        var path=url.parse(request.url).pathname;

        switch(path){
            case '/':renderHtml('./index.html',response);
                    break;
            default:renderJson(path,response);        
        }
    }
};