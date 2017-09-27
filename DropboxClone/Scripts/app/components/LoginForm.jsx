var React = require('react');

class LoginForm extends React.Component {

    onSubmit(e) {
        e.preventDefault();
        this.props.login(this.refs.email.value, this.refs.password.value);
    }

    render() {

        return (
            <div className="col-xs-12 col-sm-6">
                <form onSubmit = {this.onSubmit.bind(this)} className="login-form">
                    <h3>Or Login</h3>
                    <div className="form-group">
                        <label htmlFor="emailLogin">Email</label>
                        <input type="email" className="form-control" defaultValue="" ref="email" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordLogin">Password</label>
                        <input type="password" className="form-control" defaultValue="" ref="password" placeholder="Password" />
                    </div>

                    <button type="submit" className="btn btn-default">Login</button>
                </form>
            </div>
        )
    }
}

module.exports = LoginForm;
