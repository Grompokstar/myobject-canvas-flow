import { memo }            from 'react';
import { NodeResizer }     from 'reactflow';
// @ts-ignore
import styles              from './node-compnents.module.scss'
import {AnyObject}         from 'interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark }         from '@fortawesome/free-solid-svg-icons'

const CustomNode = ({data, selected}: AnyObject) => {

  return (
    <div className={`${styles.image} ${data.type}`} >
      <NodeResizer
        color="blue"
        isVisible={selected}
        minWidth={40}
        minHeight={40}
        keepAspectRatio={true}
      />
      <div className={styles.node}/>
      <div
        className={`${styles.delete_button} ${selected && styles.show}`}
        onClick={() => {
          data.onDelete();
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>
    </div>
  );
}

export default memo(CustomNode);
