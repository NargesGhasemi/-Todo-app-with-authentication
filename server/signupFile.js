var fs = require("fs");
var savedData = '';
var newData = '';
var savedUser = [];

var encodeUser = require('./encoder').encodeUser;

exports.signUpHandler = function (req, res) {

    req.on("data", function (data) {
        newData += data.toString('utf-8');
    });

    req.on("end", function () {
        fs.readFile("data.txt", function (err, data) {
            if (err) {
                res.writeHead(500);
                res.write("error to read user info from server" + err.message);
                res.end();
                return;
            }

            savedData += data.toString('utf-8');
            console.log('saved data: ', savedData);

            if (savedData !== "") {
                savedUser = JSON.parse(savedData);
            }

            newData = JSON.parse(newData);

            if (savedUser.some(item => item.username === newData.username)) {
                res.writeHead(401);
                res.write('The username is already taken.');
                res.end();
                return;
            }

            newData.todos = [];

            savedUser.push((newData));
            let jwt = encodeUser(newData.fullname, newData.username);

            console.log('saved User: ', savedUser);

            fs.writeFile('data.txt', JSON.stringify(savedUser), function (err) {
                if (err) {
                    res.writeHead(500);
                    res.write("error to save new user." + err.message);
                    res.end();
                    return;
                }
                res.writeHead(200, {
                    'jwt': `${jwt}`
                });
                res.write('successful');
                res.end();
            });
        });
    });
};
