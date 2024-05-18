import React, { useEffect, useState } from 'react'
import './MessageNodeSettings.css'

function MessageNodeSettings({node, onUpdate}) {

    const handleChange = (message) => {
        node.data.message = message;
        onUpdate();
    }

    return (
        <div style={{margin: '20px'}}>
            <form id='MessageEditForm' action="">
                <label htmlFor="messageText">Text</label>
                <textarea type="text" id='messageText' name='messageText' value={node.data.message} onChange={(e) => handleChange(e.target.value)}/>
            </form>
        </div>
    )
}

export default MessageNodeSettings