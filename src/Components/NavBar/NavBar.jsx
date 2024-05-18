import React from 'react'
import './NavBar.css'

function Navbar({onSave}) {
  return (
    <div id='NavBarContainer'>
        <p>ChatBot Flow Builder</p>
        <button id='SaveButton' onClick={onSave}>Save</button>
    </div>
  )
}

export default Navbar