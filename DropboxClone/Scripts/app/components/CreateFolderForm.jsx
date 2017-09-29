var React = require("react");

class CreateFolderForm extends React.Component {

    componentDidMount() {
        this.refs.foldername.focus();
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.createFolder(this.props.path, this.refs.foldername.value);
        this.props.triggerCreateFolder();
    }

    render() {
        return (
                             <form onSubmit={this.onSubmit.bind(this)} className="folder-form">
                                <div className="form-group">
                                    <input type="text" className="form-control" defaultValue="" ref="foldername" placeholder="Folder Name" />
                                </div>
                            </form>
            )
    };
        }

module.exports = CreateFolderForm;
