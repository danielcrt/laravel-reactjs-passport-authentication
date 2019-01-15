import React from 'react';
import { NavLink } from 'react-router-dom';
import { userService } from '../../../services';
import './PasswordEmailPage.scss'
import MaterialInput from '../../../components/MaterialInput'
import MaterialButton from '../../../components/MaterialButton'

class PasswordEmailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            success: '',
            error: '',
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

        const { email } = this.state;
        this.setState({ submitted: true });
        
        userService.passwordEmail(email, ()=> {
            this.setState({
                success: 'You should receive an email with a reset link',
                error: '',
            });
        }, (err) => {
            this.setState({
                success: '',
                submitted: false,
                error: err.data.response_message
            });
        });
    }

    render() {
        const { email, submitted, success, error } = this.state;
        return (
            <div id="resetPage1">
                <form name="form" onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="form-header">
                        <h1>RESET PASSWORD</h1>
                    </div>
                    <div className="form-body">
                        <MaterialInput
                            submitted={submitted}
                            hasError={email.length<6}
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
                    </div>
                    <div className="form-footer">
                        {success &&
                            <div className="alert alert-success" role="alert">
                                {success}
                            </div>
                        }
                        {error &&
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        }
                        {!submitted &&
                            <MaterialButton
                            name="Send reset link" />
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

export default PasswordEmailPage