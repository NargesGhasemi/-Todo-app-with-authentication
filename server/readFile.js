var fs = require("fs"),
    decodeUser = require("./decoder").decodeUser;
var savedData = "";
var savedUser = [];
exports.readHandler = function (req, res) {
    var jwt = req.headers.jwt;
    var user = decodeUser(jwt);
    var userTodos = [];

    fs.readFile("./data.txt", function (err, data) {
        if (err) throw err;

        savedData += data.toString('utf-8');

        savedUser = JSON.parse(savedData);

        savedUser.forEach(item => {
            if (user.username === item.username && user.fullname === item.fullname) {
                userTodos = item.todos;
            }
        })

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(JSON.stringify(userTodos));
        res.end();
    });
};
