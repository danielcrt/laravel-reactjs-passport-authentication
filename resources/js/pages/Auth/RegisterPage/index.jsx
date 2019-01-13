import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../../actions';
import { history } from '../../../helpers';
import Header from '../../../components/Header/Header';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
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
        const { name, lastName, phone, email, gender, selectedYear, selectedMonth, selectedDay, password } = this.state;
        const { dispatch } = this.props;
        if (name && email && password) {
            dispatch(userActions.register(name, email, password));
        }
    }

    render() {
        const { registring, alert } = this.props;
        const { name, email, password, submitted } = this.state;

        return (
            <div>
                <Header location={history.location}/>

                <div id="authPage" className="d-flex justify-content-center align-items-start">
                    <form name="form" className="auth-form" onSubmit={this.handleSubmit} autoComplete="off">
                        <h2>Register</h2>
                        <br/>
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <div className={'mdl-group' + (submitted && !name ? ' has-error' : '')}>
                            <input
                                name='name'
                                type='text'
                                placeholder='Name'
                                value={this.state.name}
                                onChange={this.handleChange}
                                autoComplete="off" />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label htmlFor="name">Name</label>
                            {submitted && !name &&
                                <div className="help-block">Name is required</div>
                            }
                        </div>
                        <div className={'mdl-group' + (submitted && !email ? ' has-error' : '')}>
                            <input
                                name='email'
                                type='email'
                                placeholder='Email'
                                value={this.state.email}
                                onChange={this.handleChange} />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label htmlFor="email">Email</label>
                            {submitted && !email &&
                                <div className="help-block">Email is required</div>
                            }
                        </div>
                        <div className={'mdl-group' + (submitted && !password ? ' has-error' : '')}>
                            <input 
                                name='password'
                                type='password' 
                                placeholder='Password'
                                value={this.state.password}
                                onChange={this.handleChange}
                                autoComplete="off" />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label htmlFor="password">Password</label>
                            {submitted && !password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className='form-group'>
                            <input type='submit' className='button' value='Register' />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert, authentication } = state; 
    const { registring } = authentication;
    return {
        registring,
        alert
    };
}

export default connect(mapStateToProps)(RegisterPage)