import React  from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { userActions, alertActions } from '../../../actions';
import MaterialInput from '../../../components/MaterialInput'
import MaterialButton from '../../../components/MaterialButton'

import './LoginPage.scss'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            submitted: false,
            loading: false
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
        const { email, password } = this.state;
        const { dispatch } = this.props;
        dispatch(alertActions.clear());
        dispatch(userActions.loginRedirect(email, password));
    }

    render() {
        const { alert } = this.props;
        const { email, password, submitted } = this.state;
        return (
            <div id="loginPage">
                <form name="form" onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="form-header">
                        <h1>LOGIN</h1>
                    </div>
                    <div className="form-body">
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
                        <div className='text-right'>
                            <NavLink to="/password/email">
                                Forgot password?
                            </NavLink>
                        </div>
                    </div>
                    <div className="form-footer">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        {(alert.message || !submitted) &&
                            <MaterialButton
                                name="Login" />
                        }
                        <hr/>
                        <NavLink to="/register">
                            Don't have an account? Register here.
                        </NavLink>
                    </div>
                </form>
            </div>
        );
    }
}
/*
function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        
        setSubmitted(true)
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(userActions.loginRedirect(email, password));
        }
    }
    return (
        <>
            <Header location={history.location}/>
            <div id="authPage" className="d-flex justify-content-center align-items-start">
                <form name="form" className="auth-form" onSubmit={handleSubmit} autoComplete="off">
                <div className="d-flex justify-content-center auth-header">
                    <h3>Personal</h3>
                    <img src={`${GlobalConstants.BASE_URL}/images/ps-icon.png`} alt=""/>
                    <h3>Streamer</h3>
                </div>
                {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <div className={'mdl-group' + (submitted && !email ? ' has-error' : '')}>
                        <input type="text" name="email" value={email} 
                            onChange={handleChange}
                            autoComplete="off" />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label htmlFor="email">Email</label>
                        {submitted && !email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    
                    <br/>
                    <div className={'mdl-group' + (submitted && !password ? ' has-error' : '')}>
                        <input type="password" 
                            name="password" 
                            value={password} 
                            onChange={handleChange} 
                            autoComplete="off"/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label htmlFor="password">Password</label>
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className='form-group text-center'>
                        <NavLink to="/password/email">
                            Forgot password?
                        </NavLink>
                    </div>
                    <div className="form-group">
                        <button className="button">Login</button>
                    </div>
                </form>
            </div>
        </>
    );
}
*/

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

export default connect(mapStateToProps)(LoginPage)