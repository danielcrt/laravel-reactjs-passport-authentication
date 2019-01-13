import React from 'react';
import { connect } from 'react-redux';
import { userService } from '../../../services';
import { userActions } from '../../../actions';
//import qs from 'query-string';
import { history } from '../../../helpers';
import Header from '../../../components/Header/Header';


class PasswordResetPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.match.params.token,
            email: qs.parse(this.props.location.search).email,
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
        if (email && password && password_confirmation && password == password_confirmation) {
            userService.passwordReset(email, password, password_confirmation, token, (response)=> {
                if(response.error)
                {
                    this.setState({
                        error: response.error_message
                    }); 
                } else {
                    dispatch(userActions.loginRedirect(email, password));
                }
            }, (err) => {
                this.setState({
                    success: '',
                    error: err.message
                });
            });
        }
    }

    render() {
        const { alert } = this.props;
        const { password_confirmation, password, submitted,error  } = this.state;
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
                        {error &&
                            <div className="alert alert-danger" role="alert">
                              {error}
                            </div>
                        }
                        <div className={'mdl-group' + (submitted && !password ? ' has-error' : '')}>
                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} placeholder="password"
                            autoComplete="off"/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label htmlFor="password">Password</label>
                            {submitted && !password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <br/>
                        <div className={'mdl-group' + (submitted && !password_confirmation && (password != password_confirmation) ? ' has-error' : '')}>
                            <input type="password" name="password_confirmation" value={password_confirmation} onChange={this.handleChange} placeholder="confirm password"
                            autoComplete="off"/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label htmlFor="password_confirmation">Password</label>
                            {submitted && !password_confirmation &&
                                <div className="help-block">Password is required</div>
                            }
                            {submitted && (password != password_confirmation) &&
                                <div className="help-block">Passwords must match</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="button">Reset password</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert, authentication } = state;
    return {
        alert
    };
}

export default connect(mapStateToProps)(PasswordResetPage)