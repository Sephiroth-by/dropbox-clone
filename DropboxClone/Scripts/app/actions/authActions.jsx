var AuthApi = require("../api/authApi.js");
var FolderActions = require("../actions/folderActions");
var axios = require("axios");

var login = function (userName) {
    return {
        type: "LOGIN",
        userName: userName
    }
}

var logout = function () {
    return {
        type: "LOGOUT"
    }
}

function registerAPI(email, password, confirmpassword) {
    return function (dispatch) {
        AuthApi.register(email, password, confirmpassword);
    }
}

function loginAPI(email, password) {
    return function (dispatch) {
        AuthApi.login(email, password).then(response => {
            sessionStorage.setItem("tokenInfo", response.data.access_token);
            sessionStorage.setItem("userName", response.data.userName);
            axios.defaults.headers.common['Authorization'] = "Bearer " + sessionStorage.getItem("tokenInfo");;
            dispatch(login(response.data.userName));
        })
        .then(() => dispatch(FolderActions.getFolderAPI("\\")))
    }
}

function loadUser(username) {
    return function (dispatch) {
        if (sessionStorage.getItem("tokenInfo")) {
            axios.defaults.headers.common['Authorization'] = "Bearer " + sessionStorage.getItem("tokenInfo");
            dispatch(login(username));
        }
    }
}

function logoutAPI() {
    return function (dispatch) {
        AuthApi.logout();
        dispatch(logout());
    }
}

module.exports = { registerAPI, loginAPI, loadUser, logoutAPI };