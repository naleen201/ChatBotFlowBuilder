import React from 'react'
import './SidePanel.css'

function SidePanel({children}) {
    return (
        <div id='SidePanelContainer'>
            {children}
        </div>
    )
}

export default SidePanel