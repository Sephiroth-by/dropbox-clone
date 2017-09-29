var FileApi = require("../api/fileApi.js");
var FolderApi = require("../api/folderApi.js");

var uploadFile = function (files) {
    return {
        type: "UPLOAD_FILE",
        files: files
    }
}

var deleteFile = function (file) {
    return {
        type: "DELETE_FILE",
        file: file
    }
}

var renameFile = function (oldName, newName) {
    return {
        type: "RENAME_FILE",
        oldName: oldName,
        newName: newName
    }
}

var moveFile = function (file) {
    return {
        type: "MOVE_FILE",
        file: file
    }
}

function downloadFileAPI(path) {
    return function (dispatch) {
        FileApi.downloadFile(path).then(response => {
            var blob = response.data;
            saveAs(blob, path.split('\\').pop());
        })
    }
}

function uploadFileAPI(path, files) {
    return function (dispatch) {
        FileApi.uploadFile(path, files).then(response =>dispatch(uploadFile(response.data)))
    }
}

function deleteFileAPI(path) {
    return function (dispatch) {
        FileApi.deleteFile(path).then(response =>dispatch(deleteFile(response.data)))
    }
}

function renameFileAPI(oldPath, newPath) {
    return function (dispatch) {
        FileApi.renameFile(oldPath, newPath).then(response =>dispatch(renameFile(response.data.oldName, response.data.newName)))
    }
}

function moveFileAPI(oldPath, newPath) {
    return function (dispatch) {
        FolderApi.moveFolder(oldPath, newPath).then(response =>dispatch(moveFile(response.data)))
    }
}

module.exports = { downloadFileAPI, uploadFileAPI, deleteFileAPI, renameFileAPI, moveFileAPI };