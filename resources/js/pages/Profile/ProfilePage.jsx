import React from 'react'
import Http from '../../helpers/Http'
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import MaterialButton from '../../components/MaterialButton'
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    
    this.logout = this.logout.bind(this);

  }
  componentDidMount() {
    var that = this;
    Http.get('profile')
      .then(function(response) {
        that.setState({
          user: response.data.user
        })
      }).catch(function(err) {
        console.log(err);
      })

  }
  logout() {
    const { dispatch } = this.props;
    dispatch(userActions.logout());
  }
  
  render() {
    const { user } = this.state;
    return (
      <div className="h-100 d-flex align-items-center justify-content-center flex-column">
          <h1>PROFILE</h1>
          {user.name &&
            <p>Hello {user.name},</p>
          }
          {user.email &&
            <p>Email: {user.email}</p>
          }
          <MaterialButton name="LOGOUT" onClick={this.logout}/>
      </div>
    )
  }
}
function mapStateToProps() {
  return {};
}
export default connect(mapStateToProps)(ProfilePage)
