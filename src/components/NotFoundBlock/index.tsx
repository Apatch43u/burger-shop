import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <h1 className={styles.root}>
      <span>🙄</span>
      <br></br>
      Not found
      <p className={styles.description}>Sorry, this page is not available in our online store.</p>
    </h1>
  );
}

export default NotFoundBlock;
