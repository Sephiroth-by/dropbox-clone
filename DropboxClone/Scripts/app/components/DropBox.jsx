var React = require("react");
var Folder = require("./Folder");
var File = require("./File");
var BreadCrumbs = require("./BreadCrumbs");
var CreateFolderForm = require("./CreateFolderForm");
var SearchForm = require("./SearchForm");


class DropBox extends React.Component {

    onChange(e) {
        const files = e.target.files;
        this.props.uploadFile(this.props.folder.path, files);
    }

    onClick(e) {
        e.preventDefault();
        this.props.triggerCreateFolder();
    }

    render() {
        var self = this;

        var folders = this.props.folder.subFolders.map(function (folder, index) {
            return <Folder key={index} folder={folder} getFolder={self.props.getFolder} moveFolder={self.props.moveFolder}
                            deleteFolder={self.props.deleteFolder} renameFolder={self.props.renameFolder} />
        });
        var files = this.props.folder.files.map(function (file, index) {
            return <File key={index} file={file} downloadFile={self.props.downloadFile} moveFolder={self.props.moveFolder} 
                         deleteFile={self.props.deleteFile} renameFile={self.props.renameFile} />
        });
        return (
            <div>
                   <SearchForm searchFile = {this.props.searchFile} />
                   <BreadCrumbs path={this.props.folder.path} getFolder={self.props.getFolder} triggerSearch = {self.props.triggerSearch} />
                    {folders}
                    {this.props.isCreatingFolder ? (<CreateFolderForm path={this.props.folder.path} createFolder={this.props.createFolder } />) : ""}
                    {files}
                   <div className="btn-group">
                       <input className="inputfile" id="file" type='file' multiple onChange={this.onChange.bind(this)} />
                       <label className="btn btn-primary" htmlFor="file">Choose a file</label>
                       <button type="button" className="btn btn-primary" onClick={this.onClick.bind(this)}>Create Folder</button>
                   </div>
</div>
            )
    };
}

module.exports = DropBox;