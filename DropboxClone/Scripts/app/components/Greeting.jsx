var React = require('react');

class Greeting extends React.Component {
    onClick(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {

        return (
            <div className="logout-form">
                <span className="user-info">Hi: {this.props.name}</span>
                <button type="submit" onClick= {this.onClick.bind(this)} className="btn btn-default">Log Out</button>
            </div>
        )
    }
}

module.exports = Greeting;
