import React, { useEffect, useState, useCallback } from 'react'
import './App.css'

import NavBar from './Components/NavBar/NavBar'
import FlowBuilder from './Components/FlowBuilder/FlowBuilder'
import NodeMenu from './Components/NodeMenu/NodeMenu'
import NodeSettings from './Components/NodeSettings/NodeSettings'
import SidePanel from './Components/SidePanel/SidePanel'

import { ReactFlowProvider } from 'reactflow'

function App() {
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    const [node, setNode] = useState(null);
    const [update, setUpdate] = useState(false);
    const [rfInstance, setRfInstance] = useState(null);

    const onSave = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            //Error if there is a node that is not a source or target of an edge
            if (flow.nodes.length > 1 && flow.nodes.some(node => !flow.edges.some(edge => edge.source === node.id || edge.target === node.id))) {
                alert('Error: At least one node is not connected to an edge');
                return;
            }
            
            //for each object in nodes array in the flow object, set the selected property to false
            flow.nodes.forEach(node => {
                node.selected = false;
            });
            localStorage.setItem('chatbot-flow', JSON.stringify(flow));
            localStorage.setItem('id', flow.nodes.length);
        }
    }, [rfInstance]);

    const showSettings = (node) => {
        console.log(node);
        setNode(node);
        setIsSettingsVisible(true);
    };

    const hideSettings = () => {
        setNode(null);
        setIsSettingsVisible(false);
    };

    return (
        <div id='AppContainer'>
            <NavBar onSave={onSave}/>
            <div id='BuilderContainer'>
                <ReactFlowProvider><FlowBuilder showSettings={showSettings} update={update} onUpdate={()=>setUpdate(!update)} setRfInstance={setRfInstance}/></ReactFlowProvider>
                <SidePanel>{isSettingsVisible ? <NodeSettings node={node} hideSettings={hideSettings} onUpdate={()=>setUpdate(!update)}/> : <NodeMenu />}</SidePanel>
            </div>
        </div>
    )
}

export default App
