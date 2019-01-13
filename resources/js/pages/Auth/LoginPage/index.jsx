import React  from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { userActions } from '../../../actions';
import { history } from '../../../helpers';
import Header from '../../../components/Header/Header';
import './LoginPage.scss'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
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
        const { email, password } = this.state;
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(userActions.loginRedirect(email, password));
        }
    }

    render() {
        const { email, password, submitted } = this.state;
        return (
            <>
                <Header location={history.location}/>
                <div id="loginPage">
                    <form name="form" onSubmit={this.handleSubmit} autoComplete="off">
                        <div className="form-header">
                            <h1>YOUR APP NAME</h1>
                        </div>
                        <div className="form-body">
                            <div className={'mdl-group' + (submitted && !email ? ' has-error' : '')}>
                                <input type="text" name="email" value={email} 
                                    onChange={this.handleChange}
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
                                    onChange={this.handleChange} 
                                    autoComplete="off"/>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label htmlFor="password">Password</label>
                                {submitted && !password &&
                                    <div className="help-block">Password is required</div>
                                }
                            </div>
                        </div>
                        <div className="form-footer">
                            <div className='form-group text-center'>
                                <NavLink to="/password/email">
                                    Forgot password?
                                </NavLink>
                            </div>
                            <div className="form-group">
                                <button className="button">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </>
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