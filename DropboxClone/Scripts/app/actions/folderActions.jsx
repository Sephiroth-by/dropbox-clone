var FolderApi = require("../api/folderApi.js");

var getFolder = function (folder) {
    return {
        type: "GET_FOLDER",
        folder: folder
    }
}

var moveFolder = function (folder) {
    return {
        type: "MOVE_FOLDER",
        folder: folder
    }
}

var createFolder = function (folder) {
    return {
        type: "CREATE_FOLDER",
        folder: folder
    }
}

var deleteFolder = function (folder) {
    return {
        type: "DELETE_FOLDER",
        folder: folder
    }
}

var renameFolder = function (oldName, newName, newPath) {
    return {
        type: "RENAME_FOLDER",
        oldName: oldName,
        newName: newName,
        newPath: newPath
    }
}

function getFolderAPI(path) {
    return function (dispatch) {
        FolderApi.getFolder(path).then(response =>dispatch(getFolder(response.data)))
    }
}

function moveFolderAPI(oldPath, newPath) {
    return function (dispatch) {
        FolderApi.moveFolder(oldPath, newPath).then(response =>dispatch(moveFolder(response.data)))
    }
}

function createFolderAPI(path, name) {
    return function (dispatch) {
        FolderApi.createFolder(path, name).then(response =>dispatch(createFolder(response.data)))
    }
}

function deleteFolderAPI(path) {
    return function (dispatch) {
        FolderApi.deleteFolder(path).then(response =>dispatch(deleteFolder(response.data)))
    }
}

function renameFolderAPI(oldPath, newPath) {
    return function (dispatch) {
        FolderApi.renameFolder(oldPath, newPath).then(response =>dispatch(renameFolder(response.data.oldName, response.data.newName, response.data.newPath)))
    }
}

module.exports = { getFolderAPI, moveFolderAPI, createFolderAPI, deleteFolderAPI, renameFolderAPI };