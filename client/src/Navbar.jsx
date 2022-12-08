//Libraries
import React from 'react'
import {Link} from "react-router-dom"

//Component
function Navbar() {
  //Render
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <p className="navbar-brand h1 m-0 p-2">React Auth</p>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/Home" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/LoginRegister" className="nav-link">Login/Register</Link>
            </li>
            <li className="nav-item">
              <Link to="/Profile" className="nav-link">Profile</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar