var React = require("react");
var DropTarget = require("react-dnd").DropTarget;
var DragSource = require("react-dnd").DragSource;
var flow = require('lodash.flow');
var Types = require("./ItemTypes");

var folderSource = {
    beginDrag: function (props) {
        return { folder: props.folder };
    },

    endDrag: function (props, monitor, component) {
        var item = monitor.getItem();
        var dropResult = monitor.getDropResult();
        if (dropResult && item.folder.path != dropResult.folder.path) {
            props.moveFolder(item.folder.path, dropResult.folder.path);
        }
    }
};

var folderTarget = {
    drop: function (props) {
        return { folder: props.folder };
    },
};

class Folder extends React.Component {

    constructor(props) {
        super(props);

        this.state = { isEditing: false };
    }

    onClick(e) {
        e.preventDefault();
        this.props.getFolder(this.props.folder.path);
    }

    onSubmit(e) {
        e.preventDefault();
        var oldName = this.props.folder.name;
        var oldPath = this.props.folder.path;
        var newName = this.refs.foldername.value;
        var newPath = oldPath.substring(0,oldPath.lastIndexOf(oldName)) + newName;
        this.props.renameFolder(oldPath, newPath);
        this.triggerRename();
    }

    triggerRename() {
        this.setState({ isEditing: this.state.isEditing ? false : true });
    }

    onClickDelete() {
        this.props.deleteFolder(this.props.folder.path);
    }

    render() {
        var isDragging = this.props.isDragging;
        var connectDragSource = this.props.connectDragSource;
        var canDrop = this.props.canDrop;
        var isOver = this.props.isOver;
        var connectDropTarget = this.props.connectDropTarget;
        var isActive = canDrop && isOver;
        var opacity = isDragging ? 0.4 : 1;
        var background = isActive ? "#EBF4FD" : (canDrop ? "rgba(237,250,241,0.5)" : "");
        var styles = {
            opacity: opacity,
            backgroundColor: background
        };

        return connectDragSource(connectDropTarget(
            <div>
                { this.state.isEditing ? <form onSubmit={this.onSubmit.bind(this)} className="folder-form">
                                                <input type="text" autoFocus={true} className="form-control" defaultValue={this.props.folder.name} ref="foldername" onBlur={this.triggerRename.bind(this)} />
                                        </form>
                                      : <div style={ styles } className="folder">
                                            <a className="folder-link pull-left" href="" onClick={this.onClick.bind(this) }>
                                                {this.props.folder.name}
                                            </a>
                                            <div onClick={this.onClickDelete.bind(this)} className="pull-right delete"></div>
                                            <div onClick={this.triggerRename.bind(this)} className="pull-right edit"></div>
                                            <div className="statistics pull-right">{this.props.folder.modifiedDate}</div>
                                        </div>
                }
                <hr className="my-hr" />
            </div>
            ));
    }
}

module.exports = flow(
    DragSource(Types.FOLDER, folderSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    })),
DropTarget([Types.FOLDER, Types.FILE], folderTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
})))(Folder);