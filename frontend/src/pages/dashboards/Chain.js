

import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'RawMaterials' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'Fabrication' } },
  { id: '3', position: { x: 0, y: 100 }, data: { label: 'Assembly' } },
  { id: '4', position: { x: 0, y: 100 }, data: { label: 'Logistics' } },
  { id: '5', position: { x: 0, y: 100 }, data: { label: 'Forecast' } },
  { id: '6', position: { x: 0, y: 100 }, data: { label: 'Delivery' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        
        <Background variant="white" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
  
