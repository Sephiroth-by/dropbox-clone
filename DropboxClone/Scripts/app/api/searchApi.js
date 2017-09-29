var axios = require("axios");

class SearchApi {

    static searchFile(key) {
        return axios({
            url: "/api/search?key=" + key,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        });
    }
}

module.exports = SearchApi;