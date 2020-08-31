var writeFile = require("./writeFile").writeHandler,
    readFile = require("./readFile").readHandler,
    signUpFile = require("./signupFile").signUpHandler,
    signInFile = require("./signInFile").signInHandler,
    staticFilesHandler = require("./staticFilesHandler").staticFilesHandler,
    urlProvider = require("./decoder").decodeUser,
    validateToken = require("./validToken").validateToken;

exports.routeHandlers = function (req, res) {
    console.log("req.url: ", req.url);
    console.log("req.method: ", req.method);
    var routes;

    if (req.method === "GET" && !req.url.includes("."))
        req.url = req.url + ".html";
  
    if (req.method === "GET" && req.url === "/read") {
        var jwt = req.headers.jwt;
        if (!validateToken(jwt)) {
            res.writeHead(401);
            res.write('sorry You have not Access!');
            res.end();
            return;
        }
        routes = readFile;
    }

    else if (req.method === "POST" && req.url === "/write" && req.url !== "/read") {
        var jwt = req.headers.jwt;
        if (!validateToken(jwt)) {
            res.writeHead(401);
            res.write('sorry You have not Access!');
            res.end();
            return;
        }
        routes = writeFile;
    }

    else if (req.method === "POST" && req.url === "/signUp") {
        routes = signUpFile;
    }

    else if (req.method === "POST" && req.url === "/signIn") {
        routes = signInFile;
    }
    
    else {
        routes = staticFilesHandler;
    }

    routes(req, res);
};
