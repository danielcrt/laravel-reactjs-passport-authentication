import React, { Component } from 'react'
import Http from '../../helpers/Http'
import { GlobalConstants } from '../../constants';

export default class ProfilePage extends Component {
  componentDidMount() {
    Http.get('profile')
      .then(function(response) {
        console.log(response);
      }).catch(function(err) {
        console.log(err);
      })

  }
  logout() {
    localStorage.removeItem(GlobalConstants.USER_KEY);
  }
  
  render() {
    return (
      <>
          PROFILE
          <button type="button" onClick={this.logout}>LOGOUT</button>
      </>
    )
  }
}
