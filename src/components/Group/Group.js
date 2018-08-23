import React from 'react';

import styles from './Group.css';

const Group = props => {
  const { title, children } = props;
  return (
    <div className={styles.group}>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  )
}

export default Group;