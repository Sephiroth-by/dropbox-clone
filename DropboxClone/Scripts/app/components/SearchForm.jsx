var React = require("react");

class SearchForm extends React.Component {

    onSubmit(e) {
        e.preventDefault();
        this.props.searchFile(this.refs.searchkey.value);
        this.refs.searchkey.value = "";
    }

    render() {

        return (
                       <form onSubmit={this.onSubmit.bind(this)} className="search-form">
                                <div className="form-group">
                                    <input type="text" className="form-control" defaultValue="" ref="searchkey" placeholder="Search" />
                                </div>
                        </form>
            )
    };
}

module.exports = SearchForm;