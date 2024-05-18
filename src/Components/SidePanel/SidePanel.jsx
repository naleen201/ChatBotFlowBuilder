import React from 'react'

function SidePanel({children}) {
    return (
        <div id='SidePanelContainer' style={
            {
                flex: '1',
                borderLeft: '1px solid #333',
                height: '100%',
            }
        }>
            {children}
        </div>
    )
}

export default SidePanel