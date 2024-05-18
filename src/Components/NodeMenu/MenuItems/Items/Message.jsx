import React from 'react'
import MenuItem from '../MenuItem'

function Message() {
  return (
    <MenuItem nodeType={'messageNode'} nodeData={{nodeName: 'Message', message : 'TestMessage'}}><div>Message</div></MenuItem>
  )
}

export default Message