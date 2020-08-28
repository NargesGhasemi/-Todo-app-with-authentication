exports.decodeUser = function(jwt) {
    let token = Buffer.from(jwt, 'base64').toString('ascii');
    console.log('token', token);
    let lastIndexOfAnd = token.lastIndexOf('&');
    let fullname = token.substring(11, lastIndexOfAnd);
    let username = token.substr(lastIndexOfAnd + 1, token.length - 1);
    let user = {
        username,
        fullname
    };
    return user;
};
