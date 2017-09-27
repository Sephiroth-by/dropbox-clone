var React = require("react");

class RegisterForm extends React.Component {

    onSubmit(e) {
        e.preventDefault();
        this.props.register(this.refs.email.value, this.refs.password.value, this.refs.confirmpassword.value);
    }

    render() {
        return (
                      <div className="col-xs-12 col-sm-6">
                        <form onSubmit = {this.onSubmit.bind(this)} className="register-form">
                            <h3>Please Register</h3>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" defaultValue="" ref="email" placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" defaultValue="" ref="password" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmpassword">Confirm Password</label>
                                <input type="password" className="form-control" defaultValue="" ref="confirmpassword" placeholder="Confirm Password" />
                            </div>
                            <button type="submit" className="btn btn-default">Register</button>
                        </form>
                   </div>
           );
    }
}

module.exports = RegisterForm;