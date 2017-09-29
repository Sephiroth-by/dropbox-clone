var SearchApi = require("../api/searchApi.js");

var searchFile = function (files) {
    return {
        type: "SEARCH_FILES",
        files: files
    }
}

var finishSearch = function () {
    return {
        type: "FINISH_SEARCH",
    }
}

function searchFileAPI(key) {
    return function (dispatch) {
        SearchApi.searchFile(key).then(response =>dispatch(searchFile(response.data)))
    }
}


module.exports = { searchFileAPI, finishSearch };