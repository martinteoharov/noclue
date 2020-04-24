const userService = require('../users/user.service');
const fs          = require('fs');
const secret      = fs.readFileSync('secret.txt');
const jwt         = require('jsonwebtoken');

const socketAuth = async(_jwt) => {
        // check for jwt auth header
        if (!_jwt || _jwt.indexOf('jwt ') === -1) {
                return false;
        }

        const jwt_token = _jwt.substring(4);
        // verify auth JWT
        const data = jwt.verify(jwt_token, secret);
        const username = data.user.username;
        const password = data.user.password;
        const user = await userService.authenticate({username, password});

        if (!user) {
                return false;
        }

        return user;
}

module.exports = socketAuth;
