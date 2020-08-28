const key = "56A6C334A3";
exports.validateToken = function (jwt) {
    let token = Buffer.from(jwt, 'base64').toString('ascii');
    if (token.substr(0, 10) === key)
        return true;
    else
        return false;

};
