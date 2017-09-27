var React = require("react");
var DragSource = require("react-dnd").DragSource;
var Types = require("./ItemTypes");

var fileSource = {
    beginDrag: function (props) {
        return { file: props.file };
    },

    endDrag: function (props, monitor, component) {
        var item = monitor.getItem();
        var dropResult = monitor.getDropResult();
        if (dropResult && item.file.path != dropResult.folder.path) {
            props.moveFolder(item.file.path, dropResult.folder.path);
        }
    }
};

class File extends React.Component {

    constructor(props) {
        super(props);

        this.state = { isEditing: false };
    }

    onClick(e) {
        e.preventDefault();
        this.props.downloadFile(this.props.file.path);
    }

    onSubmit(e) {
        e.preventDefault();
        var oldName = this.props.file.name;
        var oldPath = this.props.file.path;
        var newName = this.refs.filename.value;
        var newPath = oldPath.substring(0, oldPath.lastIndexOf(oldName)) + newName;
        this.props.renameFile(oldPath, newPath);
        this.triggerRename();
    }

    triggerRename() {
        this.setState({ isEditing: this.state.isEditing ? false : true });
    }

    onClickDelete() {
        this.props.deleteFile(this.props.file.path);
    }

    render() {
        var isDragging = this.props.isDragging;
        var connectDragSource = this.props.connectDragSource;
        var opacity = isDragging ? 0.4 : 1;
        var styles = {
            opacity: opacity,
        };
        return connectDragSource(
            <div>
                { this.state.isEditing ? <form onSubmit={this.onSubmit.bind(this)} className="file-form">
                                             <input type="text" autoFocus={true} className="form-control" defaultValue={this.props.file.name} ref="filename" onBlur={this.triggerRename.bind(this)} />
                </form>
                : <div style={ styles } className="file">
                                            <a className="file-link" href="" onClick={this.onClick.bind(this) }>{this.props.file.name}
                                            </a>
                                            <div onClick={this.onClickDelete.bind(this)} className="pull-right delete"></div>
                                            <div onClick={this.triggerRename.bind(this)} className="pull-right edit"></div>
                                            <div className="statistics pull-right">{this.props.file.modifiedDate}</div>
                                      </div>
                }
                  <hr className="my-hr" />
            </div>
            );
    }
}
module.exports = DragSource(Types.FILE, fileSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }))(File);
