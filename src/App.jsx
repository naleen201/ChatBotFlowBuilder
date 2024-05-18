import React, { useEffect, useState, useCallback } from 'react'
import './App.css'

import NavBar from './Components/NavBar/NavBar'
import FlowBuilder from './Components/FlowBuilder/FlowBuilder'
import NodeMenu from './Components/NodeMenu/NodeMenu'
import NodeSettings from './Components/NodeSettings/NodeSettings'
import SidePanel from './Components/SidePanel/SidePanel'
import ErrorToast from './Components/Toast/ErrorToast'
import SuccessToast from './Components/Toast/SuccessToast'

import { ReactFlowProvider } from 'reactflow'

function App() {
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    const [node, setNode] = useState(null);
    const [update, setUpdate] = useState(false);
    const [rfInstance, setRfInstance] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const onSave = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            //Error if there is a node that is not a source or target of an edge
            if (flow.nodes.length > 1 && flow.nodes.some(node => !flow.edges.some(edge => edge.source === node.id || edge.target === node.id))) {
                setError(new Error('Error: At least one node is not connected from an edge'));
                return;
            }
            
            //for each object in nodes array in the flow object, set the selected property to false
            flow.nodes.forEach(node => {
                node.selected = false;
            });
            localStorage.setItem('chatbot-flow', JSON.stringify(flow));
            localStorage.setItem('id', flow.nodes.length);

            setSuccess({message: 'Flow saved successfully!'});
            setError(null);
        }
    }, [rfInstance]);

    const showSettings = (node) => {
        setNode(node);
        setIsSettingsVisible(true);
    };

    const hideSettings = () => {
        setNode(null);
        setIsSettingsVisible(false);
    };

    return (
        <div id='AppContainer'>
            {error && <ErrorToast error={error}/>}
            {success && <SuccessToast success={success}/>}
            <NavBar onSave={onSave}/>
            <div id='BuilderContainer'>
                <ReactFlowProvider><FlowBuilder showSettings={showSettings} update={update} onUpdate={()=>setUpdate(!update)} setRfInstance={setRfInstance}/></ReactFlowProvider>
                <SidePanel>{isSettingsVisible ? <NodeSettings node={node} hideSettings={hideSettings} onUpdate={()=>setUpdate(!update)}/> : <NodeMenu />}</SidePanel>
            </div>
        </div>
    )
}

export default App
