import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { userActions, alertActions } from '../../../actions';
import MaterialInput from '../../../components/MaterialInput'
import MaterialButton from '../../../components/MaterialButton'
import './RegisterPage.scss'
class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: {},
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { name, email, password, password_confirmation } = this.state;
        const { dispatch } = this.props;
        dispatch(alertActions.clear());
        dispatch(userActions.register(name, email, password, password_confirmation));
    }

    render() {
        const { alert } = this.props;
        const { name, email, password, password_confirmation, submitted, errors } = this.state;

        return (
        <div id="registerPage">
            <form name="form" onSubmit={this.handleSubmit} autoComplete="off">
                <div className="form-header">
                    <h1>REGISTER</h1>
                </div>
                <div className="form-body">
                    <MaterialInput
                        submitted={submitted}
                        hasError={!name}
                        error="Name is required"
                        label="Name"
                        inputProps={{
                            name: "name",
                            type: "text",
                            value: name,
                            onChange: this.handleChange,
                            autoComplete: "off",
                            required: "required"
                        }}/>
                    <MaterialInput
                            submitted={submitted}
                            hasError={!email}
                            error="Email is required"
                            label="Email"
                            inputProps={{
                                type: "text",
                                name: "email",
                                value: email,
                                onChange: this.handleChange,
                                autoComplete: "off",
                                required: "required"
                            }}/>
                    <MaterialInput
                        submitted={submitted}
                        hasError={!password}
                        error="Password is required"
                        label="Password"
                        inputProps={{
                            type: "password",
                            name: "password",
                            value: password,
                            onChange: this.handleChange,
                            autoComplete: "off",
                            required: "required"
                        }}/>
                    <MaterialInput
                        submitted={submitted}
                        hasError={password != password_confirmation}
                        error="Passwords must match"
                        label="Password confirmation"
                        inputProps={{
                            type: "password",
                            name: "password_confirmation",
                            value: password_confirmation,
                            onChange: this.handleChange,
                            autoComplete: "off",
                            required: "required"
                        }}/>
                </div>
                <div className="form-footer">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    {(!submitted || alert.message) &&
                        <MaterialButton
                            name="Register" />
                    }
                    <hr/>
                    <NavLink to="/login">
                        Already have an account?
                    </NavLink>
                </div>
            </form>
        </div>
        );
    }
}


function mapStateToProps(state) {
    const { alert } = state; 
    return {
        alert
    };
}

export default connect(mapStateToProps)(RegisterPage)