import { memo }          from 'react';
import { NodeResizer }   from 'reactflow';
// @ts-ignore
import styles            from './node-compnents.module.scss'
import {AnyObject}       from '../../../interfaces';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark}         from '@fortawesome/free-solid-svg-icons';

const RepairWorks = ({data, selected}: AnyObject) => {

  return (
    <div className={styles.image}>
      <NodeResizer
        color="blue"
        isVisible={selected}
        minWidth={50}
        minHeight={50}
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

export default memo(RepairWorks);
