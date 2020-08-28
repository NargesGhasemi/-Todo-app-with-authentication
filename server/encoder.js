
exports.encodeUser = function (name, username) {
    console.log('key : ', '56A6C334A3=' + name + "&" + username);
    let key = '56A6C334A3=' + name + "&" + username;
    let base64Key = Buffer.from(key).toString('base64');
    return base64Key;
};
