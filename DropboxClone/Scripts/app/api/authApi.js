var axios = require("axios");

class AuthApi {

    static register(email, password, confirmpassword) {
        return axios({
            url: "/api/Account/Register",
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: { email: email, password: password, confirmpassword: confirmpassword }
        });
    }

    static login(email, password) {
        var data = "grant_type=password&username=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password);
        
        return axios({
            url: "/Token",
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: data
        });
    }

    static logout() {
        sessionStorage.removeItem("tokenInfo");
        sessionStorage.removeItem("userName");;
    }

}

module.exports = AuthApi;