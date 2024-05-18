import React from 'react'
import './MenuItem.css'


function MenuItem({children, nodeType, nodeData}) {
    const handleDragStart = (event,nodeType,nodeData) => {
        const data = {...nodeData};
        const type = nodeType;
        event.dataTransfer.setData('application/reactflow-nodeData', JSON.stringify(data));
        event.dataTransfer.setData('application/reactflow-nodeType', type);
      };
    return (
      <div 
      draggable='true'
      onDragStart={(event) => handleDragStart(event, nodeType, nodeData)}
      id='MenuButtonContainer'>
          <button id='MenuButton'>
              {children}
          </button>
      </div>
    )
}

export default MenuItem