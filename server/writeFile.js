var fs = require("fs"),
    decodeUser = require("./decoder").decodeUser;

exports.writeHandler = function (req, res) {
    var newData = "";
    var savedData = "";
    var savedUser = [];

    var jwt = req.headers.jwt;
    var user = decodeUser(jwt);

    req.on("data", function (data) {
        newData += data.toString('utf-8');
    });

    req.on("end", function () {

        fs.readFile('data.txt', function (err, data) {
            if (err) {
                res.writeHead(500);
                res.write(err.message);
                res.end();
                return;
            }

            savedData += data.toString('utf-8');

            savedUser = JSON.parse(savedData);
            let todos = JSON.parse(newData);

            savedUser.forEach(element => {
                if (element.username === user.username && element.fullname === user.fullname) {
                    element.todos = todos;
                }
            });

            fs.writeFile('data.txt', JSON.stringify(savedUser), function (err) {
                if (err) {
                    res.writeHead(500);
                    res.write(err.message);
                    res.end();
                }
            });

            res.writeHead(200, { "Content-Type": "text/html" });
            res.write('successfull');
            res.end();

        });

    });
};
