import { memo }        from 'react';
import { NodeResizer } from 'reactflow';
// @ts-ignore
import styles          from './node-compnents.module.scss'
import {AnyObject}     from '../../../interfaces';

const RepairWorks = ({data, selected}: AnyObject) => {

  return (
    <div className={styles.image}>
      <NodeResizer
        color="#ce6667"
        isVisible={selected}
        minWidth={50}
        minHeight={50}
        keepAspectRatio={true}
      />
      <div className={styles.node}/>
    </div>

  );
}

export default memo(RepairWorks);
