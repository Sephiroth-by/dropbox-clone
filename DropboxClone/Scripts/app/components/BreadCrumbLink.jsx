var React = require("react");

class BreadCrumbLink extends React.Component {

    onClick(e) {
        e.preventDefault();
        this.props.triggerSearch();
        this.props.getFolder(this.props.breadcrumb.link);
    }

    render() {
        return (
                <a href="" onClick={this.onClick.bind(this) }>{this.props.breadcrumb.text}&nbsp;&#x3E;&nbsp;</a>
            )
    };
        }

module.exports = BreadCrumbLink;