var axios = require("axios");

class FolderApi {

    static getFolder(path) {
        return axios({
            url: "/api/folder/getfolder?path=" + path,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        });
    }

    static moveFolder(oldPath, newPath) {
        return axios({
            url: "/api/folder/movefolder?oldPath=" + oldPath + "&newPath=" + newPath,
            timeout: 20000,
            method: 'post',
            responseType: 'json'
        });
    }

    static createFolder(path, name) {
        return axios({
            url: '/api/folder/createfolder?path=' + path + "&name=" + name,
            timeout: 20000,
            method: 'post',
            responseType: 'json'
        });
    }

    static deleteFolder(path) {
        return axios({
            url: '/api/folder/deletefolder?path=' + path,
            timeout: 20000,
            method: 'post',
            responseType: 'json'
        });
    }

    static renameFolder(oldPath, newPath) {
        return axios({
            url: '/api/folder/renamefolder?oldPath=' + oldPath + "&newPath=" + newPath,
            timeout: 20000,
            method: 'post',
            responseType: 'json'
        });
    }
}

module.exports = FolderApi;