import React, { useCallback, useState, useEffect } from 'react';
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
import UploadImage from 'components/reactFlow/UploadImage/Component'

import 'reactflow/dist/style.css';
import DownloadButton from "components/reactFlow/DownloadButton/Component";

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
  const [backgroundImage, setBackgroundImage] = useState('')

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  useEffect(() => {
    console.log(nodes)
  }, [nodes])

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

  const onChangeBackgroundImage = (image) => {


    if (image) {
      const imageUrl = URL.createObjectURL(image);
      const viewport = document.getElementsByClassName('react-flow__viewport')[0];
      viewport.style.backgroundImage = `url(${imageUrl})`;
      setBackgroundImage(imageUrl);
    } else {
      setBackgroundImage('');
      const viewport = document.getElementsByClassName('react-flow__viewport')[0];
      viewport.style.backgroundImage = `url('')`;
    }


  }

  return (
    <div style={{ width: '100vw', height: '100vh' }} className="my-classname">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        //style={{backgroundImage: `url(${backgroundImage})`}}
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

        <Panel position="bottom-right">
          <UploadImage onChangeImage={onChangeBackgroundImage}/>
        </Panel>
        {/*<Controls />*/}
        <Background variant="dots" gap={12} size={1}/>
        <DownloadButton/>
      </ReactFlow>
    </div>
  );
}
