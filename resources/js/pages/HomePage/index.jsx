import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
export default class HomePage extends Component {
  render() {
    return (
      <div className="h-100 d-flex align-items-center justify-content-center flex-column">
        <h1>HOME</h1>
        <NavLink to="/profile">
          Profile
        </NavLink>
      </div>
    )
  }
}
