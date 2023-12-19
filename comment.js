//Create web server 
//1. Create a web server
//2. Handle HTTP route GET / and POST / i.e. Home
//3. Handle HTTP route GET /:username i.e. /chalkers
//4. Function that handles the reading of files and merge in value
    // read from file and get a string
        // merge values into string
var http = require('http');
var fs = require('fs');

function mergeValues(values, content){
    //Cycle over the keys
    for(var key in values){
        //Replace all {{key}} with the value from the values object
        content = content.replace("{{" + key + "}}", values[key]);
    }
    //return merged content
    return content;
}

function view(templateName, values, response){
    //Read from the template files
    var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});
    //Insert values into the content
    fileContents = mergeValues(values, fileContents);
    //Write out to the response
    response.write(fileContents);
}

function controller(request, response){
    if(request.url == '/'){
        response.writeHead(200, {'Content-Type': 'text/html'});
        view('header', {}, response);
        view('index', {}, response);
        view('footer', {}, response);
        response.end();
    }
    else{
        response.writeHead(404);
        response.end('Not Found');
    }
}

//Create a web server
http.createServer(controller).listen(3000);

