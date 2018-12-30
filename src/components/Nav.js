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
          <NavLink to="/add" activeClassName="active">New Question</NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" activeClassName="active">Leader Board</NavLink>
        </li>
        <Login />
      </ul>
    </nav>
  )
}

export default Nav