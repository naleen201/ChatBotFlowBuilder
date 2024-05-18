import React, { useCallback, useEffect } from 'react'
import './FlowBuilder.css'
import ReactFlow, { Background, Controls, useNodesState, useEdgesState, addEdge, MarkerType } from 'reactflow';

import 'reactflow/dist/style.css';

import NodeSettings from '../NodeSettings/NodeSettings'

import MessageNode from '../Nodes/MessageNode'

const nodeTypes = {
    messageNode: MessageNode,
};

let id = -1;
const getId = () => `dndnode_${++id}`;

function FlowBuilder({ showSettings, update, onUpdate }) {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)),
        [],
    );

    const handleDragOver = (event) => {
        event.preventDefault(); // Necessary to allow a drop
    };

    const handleDrop = useCallback(
        (event) => {
            event.preventDefault();
            const data = JSON.parse(event.dataTransfer.getData('application/reactflow-nodeData'));
            const type = event.dataTransfer.getData('application/reactflow-nodeType');
            const message = data.message + ' ' + id;
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }
            const position = {
                x: event.clientX,
                y: event.clientY,
            };
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node`, ...data }
            };
            setNodes((nds) => nds.concat(newNode));
        }
    );

    useEffect(() => {
        console.log('update')
    }, [update])
    return (
        <div
            id='FlowBuilderContainer'
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onNodeClick={(event, node) => {onUpdate(); showSettings(node);}}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}

export default FlowBuilder