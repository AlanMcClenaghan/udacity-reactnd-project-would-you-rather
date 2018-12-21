import React from 'react'
import { NavLink } from 'react-router-dom'
import Login from './Login'

const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/new" activeClassName="active">New</NavLink>
        </li>
        <li>
          <NavLink to="/leader" activeClassName="active">Leader Board</NavLink>
        </li>
        <Login />
      </ul>
    </nav>
  )
}

export default Nav