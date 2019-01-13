import React from 'react';
import { connect } from 'react-redux';
import { userService } from '../../../services';
import { history } from '../../../helpers';
import Header from '../../../components/Header/Header';

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
        if (email) {
            this.setState({ submitted: true });

            userService.passwordEmail(email, ()=> {
                this.setState({
                    success: 'You should receive an email with a reset link',
                    error: '',
                });
            }, () => {
                this.setState({
                    success: '',
                    submitted: false,
                    error: 'Unexpected error'
                });
            });
        }
    }

    render() {
        const { alert } = this.props;
        const { email, submitted, success, error } = this.state;
        return (
            <div>
                <Header location={history.location}/>

                <div id="authPage" className="d-flex justify-content-center align-items-start">
                    <form name="form" className="auth-form" onSubmit={this.handleSubmit}>
                    <h2>reset password</h2>
                    <br/>
                    {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
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
                        <div className={'mdl-group' + (submitted && !email ? ' has-error' : '')}>
                            <input type="text" name="email" value={email} onChange={this.handleChange} placeholder="email"
                            autoComplete="off"/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label htmlFor="email">Email</label>
                            {submitted && !email &&
                                <div className="help-block">Email is required</div>
                            }
                        </div>
                        <br/>
                        {!submitted && 
                            <div className="form-group">
                                <button className="button">Send reset link</button>
                            </div>
                        }
                    </form>
                </div>
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

export default connect(mapStateToProps)(PasswordEmailPage)