import React, { useState } from 'react';

import styles from './ServiceWorker.module.scss';

interface ServiceWorkerProps {
  onUpdate: () => void;
}

const ServiceWorker = ({ onUpdate }: ServiceWorkerProps) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div className={styles.root}>
        <h5>New content is available</h5>
        <button type="button" onClick={onUpdate}>
          Update
        </button>
        &nbsp;
        <button type="button" onClick={() => setShow(false)}>
          Close
        </button>
      </div>
    );
  }

  return null;
};

export default ServiceWorker;
