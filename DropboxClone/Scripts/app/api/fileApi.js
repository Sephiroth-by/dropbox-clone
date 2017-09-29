var axios = require("axios");

class FileApi {

    static downloadFile(path) {
        return axios({
            url: "/api/file/downloadfile?path=" + path,
            timeout: 20000,
            method: 'get',
            responseType: 'blob'
        });
    }

    static uploadFile(path, files) {
        var fd = new FormData();
        $.each(files, function (i, file) {
            fd.append("file", file);
        });

        return axios({
            url: '/api/file/uploadfile?path=' + path,
            timeout: 20000,
            method: 'post',
            responseType: 'json',
            data: fd
        });
    }

    static deleteFile(path) {
        return axios({
            url: '/api/file/deletefile?path=' + path,
            timeout: 20000,
            method: 'post',
            responseType: 'json'
        });
    }

    static renameFile(oldPath, newPath) {
        return axios({
            url: '/api/file/renamefile?oldPath=' + oldPath + "&newPath=" + newPath,
            timeout: 20000,
            method: 'post',
            responseType: 'json'
        });
    }
}

module.exports = FileApi;