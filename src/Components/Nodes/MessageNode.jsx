import React, { useEffect } from 'react'
import { Handle, Position } from 'reactflow'
import 'reactflow/dist/style.css';
import './MessageNode.css'


function MessageNode({data, selected}) {
    return (
        <div id='NodeContainer' style={selected ? {border: '1px solid black'} : {}}>
            <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
            <div id='NodeContentContainer'>
                <div id='NodeTitle'>Send Message</div>
                <div id='NodeContent'>{data.message}</div>
            </div>
            <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
        </div>
    )
}

export default MessageNode