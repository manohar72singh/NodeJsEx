//console.log("Starting");
const http = require("http");
const server = http.createServer((request,response)=>{
    console.log("Got  Result");
    response.end("Here is your result");
});

server.listen(2610,'127.0.0.1',()=>{
    console.log("Server Is Live");
});