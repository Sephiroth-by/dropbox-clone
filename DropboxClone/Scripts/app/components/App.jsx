var React = require("react");
var RegisterForm = require("./RegisterForm");
var LoginForm = require("./LoginForm");
var Greeting = require("./Greeting");
var DropBox = require("./DropBox");
var File = require("./File");
var BreadCrumbs = require("./BreadCrumbs");
var DragDropContext = require("react-dnd").DragDropContext;
var HTML5Backend = require("react-dnd-html5-backend");
var connect = require("react-redux").connect;
var SearchActions = require("../actions/searchActions");
var FolderActions = require("../actions/folderActions");
var FileActions = require("../actions/fileActions");
var AuthActions = require("../actions/authActions");
var flow = require('lodash.flow');


class App extends React.Component {

    componentDidMount() {
        if (sessionStorage.getItem("tokenInfo") && sessionStorage.getItem("userName")) {
            this.props.loadUser(sessionStorage.getItem("userName"));
            this.props.getFolder("\\");
        }
    }

    render() {
        var self = this;
        let app = null;
        if (this.props.user.length) {
            if (this.props.searchResult.length > 0) {
                var files = this.props.searchResult.map(function (file, index) {
                    return <File key={index} file={file} downloadFile = {self.props.downloadFile} deleteFile = {self.props.deleteFile}  renameFile = {self.props.renameFile} />
                    });
                app = <div>
                              <Greeting name={this.props.user} logout={this.props.logout} />
                              <BreadCrumbs path={this.props.folder.path} getFolder={this.props.getFolder} triggerSearch = {this.props.finishSearch} />
                              {files}
                      </div>
            }
            else {
                app = <div>
                          <Greeting name={this.props.user} logout={this.props.logout} />
                          <DropBox {...this.props} getFolder = {this.props.getFolder} downloadFile = {this.props.downloadFile} 
                                uploadFile = {this.props.uploadFile} 
                                createFolder = {this.props.createFolder}
                                moveFolder = {this.props.moveFolder}
                                moveFile = {this.props.moveFile}
                                deleteFolder = {this.props.deleteFolder} 
                                renameFolder = {this.props.renameFolder}
                                deleteFile = {this.props.deleteFile} 
                                renameFile = {this.props.renameFile}
                                searchFile = {this.props.searchFile} 
                                triggerSearch = {this.props.finishSearch} />
                      </div>

            }
        }

        else {
            app = <div>
                        <RegisterForm register={this.props.register} />
                        <LoginForm login={this.props.login} />
                  </div>
        }

        return (
            <div>
                {app}
            </div>
      );
    }
}

function mapStateToProps(state) {
    return {
        folder: state.folder,
        searchResult: state.searchResult,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        searchFile: (key) => {
            dispatch(SearchActions.searchFileAPI(key))
        },
        finishSearch: () => {
            dispatch(SearchActions.finishSearch())
        },
        register: (email, password, confirmpassword) => {
            dispatch(AuthActions.registerAPI(email, password, confirmpassword))
        },
        login: (email, password) => {
            dispatch(AuthActions.loginAPI(email, password))
        },
        loadUser: (username) => {
            dispatch(AuthActions.loadUser(username))
        },
        logout: () => {
            dispatch(AuthActions.logoutAPI())
        },
        getFolder: (path) => {
            dispatch(FolderActions.getFolderAPI(path))
        },
        moveFolder: (oldPath, newPath) => {
            dispatch(FolderActions.moveFolderAPI(oldPath, newPath))
        },
        createFolder: (path, name) => {
            dispatch(FolderActions.createFolderAPI(path, name))
        },
        deleteFolder: (path) => {
            dispatch(FolderActions.deleteFolderAPI(path))
        },
        renameFolder: (oldPath, newPath) => {
            dispatch(FolderActions.renameFolderAPI(oldPath, newPath))
        },
        downloadFile: (path) => {
            dispatch(FileActions.downloadFileAPI(path))
        },
        uploadFile: (path, files) => {
            dispatch(FileActions.uploadFileAPI(path, files))
        },
        deleteFile: (path) => {
            dispatch(FileActions.deleteFileAPI(path))
        },
        renameFile: (oldPath, newPath) => {
            dispatch(FileActions.renameFileAPI(oldPath, newPath))
        },
        moveFile: (oldPath, newPath) => {
            dispatch(FileActions.moveFileAPI(oldPath, newPath))
        }
    };
}

module.exports = flow(DragDropContext(HTML5Backend), connect(mapStateToProps, mapDispatchToProps))(App);