var React = require("react");
var BreadCrumbLink = require("./BreadCrumbLink");

class BreadCrumbs extends React.Component {

    render() {
        var path = this.props.path.split('\\').slice(1, -1);
        var parts = [{ text: 'Home', link: '\\' }];
        for (var i = 0; i < path.length; i++) {
            var part = path[i];
            var text = part.toUpperCase();
            var link = '\\' + path.slice(0, i + 1).join('\\') + '\\';
            parts.push({ text: text, link: link });
        }
        var self = this;

        return (
            <div className="breadcrumb">
                {
                 parts.map(function (item, index) {
                     return (
                        <BreadCrumbLink key={index} breadcrumb={item} getFolder = {self.props.getFolder} triggerSearch = {self.props.triggerSearch} />
                    )
                 })
                }
            </div>
            )
    };
}

module.exports = BreadCrumbs;