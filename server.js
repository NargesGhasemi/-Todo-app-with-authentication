var http = require("http"),
    routeHandlers = require("./server/handlers").routeHandlers;

 http.createServer(routeHandlers).listen(8081);
