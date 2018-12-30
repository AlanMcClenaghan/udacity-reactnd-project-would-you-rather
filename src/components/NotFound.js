import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFound = () => (
  <div className="center">
    <h1>Page Not Found</h1>
    <NavLink to={`/`}>
      <button className="btn center">Return to Home</button>
    </NavLink>
  </div>
)

export default NotFound