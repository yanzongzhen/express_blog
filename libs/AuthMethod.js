var config = require("../config");
var { encrypt, decrypt } = require("./saft");
var models = require("../models");

const gen_password =function(password) {
    return encrypt(password);
};

const verify_password =function(input, password) {
    if (decrypt(password) === input) {
        return true;
    } else {
        return false;
    }
};

const set_session = function(username) {
    const salt = new Date().getTime();
    str = username + "$" + salt;
    return encrypt(str);
};

const get_user= function(sid) {
    const str = decrypt(sid);
    const str_array = str.split("$");
    const username = str_array[0];
    const time = str_array[1];
    if (is_expired(time)) {
        return models.User.findOne({
            where: { username: username }
        }).then(result => {
            if (result.session === sid) {
                return result;
            } else {
                return null;
            }
        });
    } else {
        return null;
    }
};

const is_expired = function(session_time) {
    const now = new Date().getTime();
    const is_expired_time = parseInt(session_time) + parseInt(config.session_expired);
    if (now > is_expired_time) {
        return true;
    } else {
        return false;
    }
};

const login = function(username, password) {
    return models.User.findOne({ where: { username: username } }).then(user => {
        if (verify_password(password, user.password)) {
            user.session = set_session(username);
            user.save();
            return { code: 0, msg: "登陆成功", sid: user.session };
        } else {
            return { code: 1, msg: "登陆失败", sid: null };
        }
    });
};

const logout = async function(sid) {
    let user = await get_user(sid);
    user.session = "";
    user.save();
    return true;
};

const current_user = null;

exports.login = login;
exports.logout = logout;
exports.is_expired = is_expired;
exports.get_user = get_user;
exports.gen_password = gen_password;
exports.verify_password = verify_password;
exports.set_session = set_session;
exports.current_user = current_user;

