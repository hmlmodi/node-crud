const bcrypt = require("bcrypt");
const saltRounds = 10;
const jsonwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");


const passwordEncrypt = (password) => {
    var data = bcrypt.hash(password, saltRounds);
    return data;
};

const passwordCompare = (enterPassword, savePassword) => {
    return bcrypt.compare(enterPassword, savePassword).then(function (result) {
        return result;
    });
};

const jsonTokenGenerate = (payload) => {
    return jsonwt.sign(payload, process.env.JWT_ATUH_SECRET);
};

const encrypt = (text) => {
    var Ciphertext = CryptoJS.AES.encrypt(text, "secret key 123").toString();
    return Ciphertext;
};

const decrypt = (text) => {
    var bytes = CryptoJS.AES.decrypt(text, "secret key 123");
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};

module.exports = {
    secret: process.env.JWT_SECRET,
    passwordCompare,
    passwordEncrypt,
    jsonTokenGenerate,
    encrypt,
    decrypt,
};
