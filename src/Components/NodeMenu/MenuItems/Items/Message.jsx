import React from 'react'
import MenuItem from '../MenuItem'

function Message() {
  return (
    <MenuItem nodeType={'messageNode'} nodeData={{nodeName: 'Message', message : 'Click to edit this message!'}}><div>Message</div></MenuItem>
  )
}

export default Message
