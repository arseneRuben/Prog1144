import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from 'bootstrap'

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='collapse navbar-collapse'>
            <ul className='navbar-nav'>
                <li className='nav-item active'>
                    <a className='nav-link' href='/'> Home </a>
                </li>
                <li className='nav-item '>
                    <a className='nav-link' href='/podcasts'> Podcast </a>
                </li>
                <li className='nav-item '>
                    <a className='nav-link' href='/programs'> Program </a>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar