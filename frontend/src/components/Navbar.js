import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
        <div className='jumbotron'>
            <h1>Maintenance Management System&trade;</h1>
        </div>
    <nav>
        <div className='links'>
            <Link to='/'>Overview</Link>
            <Link to='/create'>Issues</Link>
            <Link to='/about'>Developer</Link>
        </div>
    </nav>
    </header>
  )
}

export default Navbar
