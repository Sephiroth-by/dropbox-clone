var React = require("react");
var RegisterForm = require("./RegisterForm");
var LoginForm = require("./LoginForm");
var Greeting = require("./Greeting");
var DropBox = require("./DropBox");
var File = require("./File");
var BreadCrumbs = require("./BreadCrumbs");
var DragDropContext = require("react-dnd").DragDropContext;
var HTML5Backend = require("react-dnd-html5-backend");

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            folder: {
                path: "",
                name: "",
                subFolders: [],
                files: [],
                modifiedDate: ""
            },
            searchResult: [],
            user: sessionStorage.getItem("userName") != null && sessionStorage.getItem("tokenInfo") != null ? sessionStorage.getItem("userName") : "",
            isCreatingFolder: false
        };
    }

    componentDidMount() {
        if (this.state.user) {
            this.getFolder("\\");
        }
    }

    register(email, password, confirmpassword) {
        if (email && password && confirmpassword) {
            var data = { email: email, password: password, confirmpassword: confirmpassword }
            $.ajax({
                type: 'POST',
                url: '/api/Account/Register',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data)
            }).success(function (data) {
                alert("Registration Complete");
            }).fail(function (data) {
                alert("Error During Registration Process");
            });
        }
    }

    login(email, password) {
        if (email && password) {
            var loginData = {
                grant_type: 'password',
                username: email,
                password: password
            };

            $.ajax({
                type: 'POST',
                url: '/Token',
                data: loginData
            }).success(response => {
                sessionStorage.setItem("tokenInfo", response.access_token);
                sessionStorage.setItem("userName", response.userName);
                console.log(response.access_token);
                this.setState({ user: response.userName });
                this.getFolder("\\");
            }).fail(response => alert('Error During Login Process'));
        }
    }

    logout() {
        sessionStorage.removeItem("tokenInfo");
        sessionStorage.removeItem("userName");
        this.setState({ user: "" });
    }

    getFolder(path) {
        $.ajax({
            type: 'GET',
            url: '/api/folder/getfolder?path=' + path,
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem("tokenInfo");
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
        }).success(response => {
            this.setState({ folder: response, isCreatingFolder: false });
        }).fail(response => alert('Error During Fething Folder'));
    }

    downloadFile(path) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                var blob = this.response;
                saveAs(blob, path.split('\\').pop());
                }
        }

        xhr.onerror = function () {
            alert('Error During Downloading File')
        };

        xhr.open('GET', "/api/file/downloadfile?path=" + path);
        var token = sessionStorage.getItem("tokenInfo");
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.responseType = 'blob';
        xhr.send();   
    }

    uploadFile(path, files) {
        var fd = new FormData();
        $.each(files, function (i, file) {
            fd.append("file", file);
        });
       
        $.ajax({
            type: 'POST',
            url: '/api/file/uploadfile?path=' + path,
            data: fd,
            processData: false,
            contentType: false,
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem("tokenInfo");
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
        }).success(response => {
            this.getFolder(this.state.folder.path);
        }).fail(response => alert('Error During Uploading File'));
    }

    moveFolder(oldPath, newPath) {
        $.ajax({
            type: 'POST',
            url: '/api/folder/movefolder?oldPath=' + oldPath + "&newPath=" + newPath,
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem("tokenInfo");
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
        }).success(response => {
            this.getFolder(this.state.folder.path);
        }).fail(response => alert('Error During Moving Folder'));
    }

    createFolder(path, name) {
        $.ajax({
            type: 'POST',
            url: '/api/folder/createfolder?path=' + path + "&name=" + name,
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem("tokenInfo");
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
        }).success(response => {
            this.setState({ isCreatingFolder: false });
            this.getFolder(this.state.folder.path);
        }).fail(response => alert('Error During Creation Folder'));
    }

    deleteFolder(path) {
        $.ajax({
            type: 'POST',
            url: '/api/folder/deletefolder?path=' + path,
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem("tokenInfo");
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
        }).success(response => {
            this.getFolder(this.state.folder.path);
        }).fail(response => alert('Error During Deleting Folder'));
    }

    renameFolder(oldPath, newPath) {
        $.ajax({
            type: 'POST',
            url: '/api/folder/renamefolder?oldPath=' + oldPath + "&newPath=" + newPath,
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem("tokenInfo");
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
        }).success(response => {
            this.getFolder(this.state.folder.path);
        }).fail(response => alert('Error During Renaming Folder'));
    }

    deleteFile(path) {
        $.ajax({
            type: 'POST',
            url: '/api/file/deletefile?path=' + path,
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem("tokenInfo");
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
        }).success(response => {
            this.getFolder(this.state.folder.path);
        }).fail(response => alert('Error During Deleting File'));
    }

    renameFile(oldPath, newPath) {
        $.ajax({
            type: 'POST',
            url: '/api/file/renamefile?oldPath=' + oldPath + "&newPath=" + newPath,
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem("tokenInfo");
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
        }).success(response => {
            this.getFolder(this.state.folder.path);
        }).fail(response => alert('Error During Renaming File'));
    }

    searchFile(key) {
        $.ajax({
            type: 'GET',
            url: '/api/search?key=' + key,
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem("tokenInfo");
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
        }).success(response => {
            this.setState({ searchResult: response });
        }).fail(response => alert('Error During Searching'));
    }

    triggerCreateFolder() {
        this.setState({ isCreatingFolder: true });
    }

    triggerSearch() {
        this.setState({ searchResult: [] });
    }

    render() {
        var self = this;
        let app = null;
        if (this.state.user) {
            if (this.state.searchResult.length > 0) {
                var files = this.state.searchResult.map(function (file, index) {
                    return <File key={index} file={file} downloadFile = {self.downloadFile.bind(this)} deleteFile = {self.deleteFile.bind(this)}  renameFile = {self.renameFile.bind(this)} />
                    });
                app = <div>
                              <Greeting name={this.state.user} logout={this.logout.bind(this)} />
                              <BreadCrumbs path={this.state.folder.path} getFolder={this.getFolder.bind(this)} triggerSearch = {this.triggerSearch.bind(this)} />
                              {files}
                      </div>
            }
            else {
                app = <div>
                          <Greeting name={this.state.user} logout={this.logout.bind(this)} />
                          <DropBox {...this.state} getFolder = {this.getFolder.bind(this)} downloadFile = {this.downloadFile.bind(this)} 
                                uploadFile = {this.uploadFile.bind(this)} 
                                createFolder = {this.createFolder.bind(this)}
                                triggerCreateFolder = {this.triggerCreateFolder.bind(this)}
                                moveFolder = {this.moveFolder.bind(this)}
                                deleteFolder = {this.deleteFolder.bind(this)} 
                                renameFolder = {this.renameFolder.bind(this)}
                                deleteFile = {this.deleteFile.bind(this)} 
                                renameFile = {this.renameFile.bind(this)}
                                searchFile = {this.searchFile.bind(this)} 
                                triggerSearch = {this.triggerSearch.bind(this)} />
                      </div>

            }
        }

        else {
            app = <div>
                        <RegisterForm register={this.register.bind(this)} />
                        <LoginForm login={this.login.bind(this)} />
                  </div>
        }

        return (
            <div>
                {app}
            </div>
      );
    }
}

module.exports = DragDropContext(HTML5Backend)(App);