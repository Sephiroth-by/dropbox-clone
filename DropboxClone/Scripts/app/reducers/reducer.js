var combineReducers = require("redux").combineReducers;

var folder = function(state = { path: "", name: "", subFolders: [], files: [], modifiedDate: ""}, action) {
    switch (action.type) {
        case "GET_FOLDER":
            return action.folder;
        case "MOVE_FOLDER":
            var newState = Object.assign({}, state);
            newState.subFolders = newState.subFolders.filter(folder => folder.name != action.folder);
            return newState;
        case "CREATE_FOLDER":
            var newState = Object.assign({}, state);
            newState.subFolders.push(action.folder);
            return newState;
        case "DELETE_FOLDER":
            var newState = Object.assign({}, state);
            newState.subFolders = newState.subFolders.filter(folder => folder.name != action.folder);
            return newState;
        case "RENAME_FOLDER":
            var newState = Object.assign({}, state);
            newState.subFolders.map(function(folder, index){
                if(folder.name == action.oldName){
                    folder.name = action.newName;
                    folder.path = action.newPath;
                }
            });
            return newState;
        case "UPLOAD_FILE":
            var newState = Object.assign({}, state);
            newState.files.push.apply(newState.files, action.files);
            return newState;
        case "DELETE_FILE":
            var newState = Object.assign({}, state);
            newState.files = newState.files.filter(file => file.name != action.file);
            return newState;
        case "RENAME_FILE":
            var newState = Object.assign({}, state);
            newState.files.map(function(file, index){
                if(file.name == action.oldName){
                    file.name = action.newName;
                    file.path = action.newPath;
                }
            });
            return newState;
        case "MOVE_FILE":
            var newState = Object.assign({}, state);
            newState.files = newState.files.filter(file => file.name != action.file);
            return newState;
        default:
            return state;
    }
    return state;
};

var searchResult = function(state = [], action) {
    switch (action.type) {
        case "SEARCH_FILES":
            return action.files;
        case "FINISH_SEARCH":
            return [];
        default:
            return state;
    }
    return state;
};

    var user = function(state = "", action) {
        switch (action.type) {
            case "LOGIN":
                return action.userName;
            case "LOGOUT":
                return "";
            default:
                return state;
        }
        return state;
    };

        const reducer = combineReducers({
            folder,
            searchResult,
            user
        });

        module.exports = reducer;
