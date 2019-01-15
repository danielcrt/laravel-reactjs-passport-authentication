import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { userService } from '../../../services';
import { userActions } from '../../../actions';
import './PasswordResetPage.scss'
import MaterialInput from '../../../components/MaterialInput'
import MaterialButton from '../../../components/MaterialButton'
import qs from 'qs'

class PasswordResetPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.match.params.token,
            email: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).email,
            password: '',
            password_confirmation: '',
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
        const { email, password, password_confirmation, token } = this.state;
        const { dispatch } = this.props;
        userService.passwordReset(email, password, password_confirmation, token, (response)=> {
            if(response.error)
            {
                this.setState({
                    submitted: false,
                    error: response.error_message
                }); 
            } else {
                dispatch(userActions.loginRedirect(email, password));
            }
        }, (err) => {
            this.setState({
                submitted: false,
                success: '',
                error: err.data.response_message
            });
        });
    }

    render() {
        const { password_confirmation, password, submitted, error  } = this.state;
        return (
            <div id="resetPage2">
                <form name="form" onSubmit={this.handleSubmit}>
                <div className="form-header">
                        <h1>RESET PASSWORD</h1>
                    </div>
                    <div className="form-body">
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
                            error="Passwords should match"
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
                        {error &&
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        }
                        {!submitted &&
                            <MaterialButton
                            name="Reset password" />
                        }
                        
                        <hr/>
                        <NavLink to="/login">
                            Oh! I've remembered it.
                        </NavLink>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect()(PasswordResetPage)