var fs = require("fs");
var savedData = '';
var newData = '';
var savedUser = [];

var encoder = require('./encoder').encodeUser;

exports.signInHandler = function (req, res) {

    req.on("data", function (data) {
        newData = data.toString('utf-8');
    });

    req.on("end", function () {
        fs.readFile("data.txt", function (err, data) {
            if (err) {
                res.writeHead(500);
                res.write("error to read user info from server" + err.message);
                res.end();
                return;
            }
            savedData = data.toString('utf-8');
            console.log('savedData: ', savedData);
            if (savedData == "") {
                res.writeHead(500);
                res.write('You have not signed in yet.');
                res.end();
                return;
            }
            else {
                if (savedData)
                    savedUser = JSON.parse(savedData);
                if (newData)
                    newData = JSON.parse(newData);

                if (!(savedUser.some(item => item.username === newData.username ))) {
                    res.writeHead(401);
                    res.write('You have not signed in yet.');
                    res.end();
                    return;
                }
                else if (!(savedUser.some(item => item.username === newData.username && item.password === newData.password))) {
                    res.writeHead(401);
                    res.write('Username or password is incorrect.');
                    res.end();
                    return;
                }

                savedUser.forEach(item => {
                    if (item.username === newData.username) {
                        newData = {
                            username: item.username,
                            password: item.password,
                            fullname: item.fullname,
                            todos: item.todos
                        }
                    }

                });
                console.log('userrrrrrr', savedUser);
                fs.writeFile('data.txt', JSON.stringify(savedUser), function (err) {
                    if (err) {
                        res.writeHead(500);
                        res.write('error to save data' + err.message);
                        res.end();
                        return;
                    }

                    let jwt = encoder(newData.fullname, newData.username);
                    console.log('jwt ', jwt);

                    let responseData = newData.todos;  

                    res.writeHead(200, { 'jwt': jwt });
                    res.write(JSON.stringify(responseData));
                    res.end();
                });
            }
        });
    });
};
