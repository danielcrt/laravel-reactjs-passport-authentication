import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

function Header(props) {
	const { user } = props;

	return (
		<div>
			<nav className="navbar navbar-light navbar-expand-lg">
				<div className="header-container">
					<NavLink className="navbar-brand" exact activeClassName="active" to="/">
						<div className="d-flex">
							<h3 className="align-self-center">Personal Streamer</h3>
						</div>
					</NavLink>
				  <div className="navbar-nav ml-auto">
					  <a className="toggle-nav">
						<i className="fa fa-navicon"></i>
					</a>
				  </div>
				  <div className="collapse navbar-collapse" id="navbar">
					<div className="navbar-nav ml-auto">
						<NavLink className="nav-item nav-link" exact activeClassName="active" to="/">
							Home
						</NavLink>
						{ user && user.token && user.data && user.data.admin &&
								<NavLink className="nav-item nav-link" activeClassName="active" to="/admin">
									Admin
								</NavLink>
							}
						{ !user &&
							<NavLink className="nav-item nav-link" activeClassName="active" to="/login">
									Login
								</NavLink>
							}
						{ !user && 
								<NavLink className="nav-item nav-link" activeClassName="active" to="/register">
									Register
								</NavLink>
							}
						</div>
				  </div>
				</div>
				
			</nav>
			<nav id="mobile-nav">
					<ul>
						<li>
							<NavLink className="nav-item nav-link" exact activeClassName="active" to="/">
								Home
							</NavLink>
						</li>
						{ user && user.token &&
							<li>
								<NavLink className="nav-item nav-link" activeClassName="active" to="/account">
									Account
								</NavLink>
							</li>
						}
						{ !user &&
							<li>
								<NavLink className="nav-item nav-link" activeClassName="active" to="/login">
									Login
								</NavLink>
							</li>
						}
						{ !user && 
							<li>
								<NavLink className="nav-item nav-link" activeClassName="active" to="/register">
									Register
								</NavLink>
							</li>
						}
					</ul>
			</nav>
		</div>
	);
}

const mapStateToProps = (state) => {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

export default connect(mapStateToProps)(Header);