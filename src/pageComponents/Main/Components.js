import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  applyNodeChanges,
  Panel,
  useReactFlow
} from 'reactflow';
import FireExtinguisher from 'components/reactFlow/FireExtinguisher/Component';
import RepairWorks from "components/reactFlow/RepairWorks/Component";
import styles from './main-component.module.scss';

import 'reactflow/dist/style.css';
import DownloadButton from "../../components/reactFlow/DownloadButton/Component";

const nodeTypes = {
  fireExtinguisher: FireExtinguisher,
  RepairWorks: RepairWorks
};

let id = 1;
let position = 300;
const getId = () => `${id++}`;
const getPosition = () => {position += 10; return position};

const initialNodes = [];

export default function MainPage() {
  const [nodes, setNodes] = useNodesState(initialNodes);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onAddNode = (type) => {
    const id = getId();

    const newNode = {
      id,
      type: type,
      position: { x: getPosition(), y: getPosition() },
      data: { label: `Node ${id}` },
    };

    setNodes((nds) => nds.concat(newNode));
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
      >
        <Panel position="top-left">
          <div className={styles.panel}>
            <button
              className={styles.panel_button}
              onClick={() => {
                onAddNode('fireExtinguisher')
              }}
            >
              <img src="/images/nodeIcons/fire_extinguisher.png"/>
            </button>
            <button
              className={styles.panel_button}
              onClick={() => {
                onAddNode('RepairWorks')
              }}
            >
              <img src="/images/nodeIcons/repair.png"/>
            </button>
          </div>
        </Panel>
        {/*<Controls />*/}
        <Background variant="dots" gap={12} size={1} />
        <DownloadButton/>
      </ReactFlow>
    </div>
  );
}
