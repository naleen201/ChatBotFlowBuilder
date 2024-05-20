import React from 'react'
import MenuItem from '../MenuItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'



function Message() {
  return (
    <MenuItem nodeType={'messageNode'} nodeData={{nodeName: 'Message', message : 'Click to edit this message!'}}>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%'
        
        }}>
            <FontAwesomeIcon icon={faMessage} size='2xl'/>
            <p>Message</p>
        </div>
    </MenuItem>
  )
}

export default Message
