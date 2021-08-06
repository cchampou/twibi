import React from 'react';
import useHost from './useHost';

const Host = () => {
  const { host, addHostNotification, deleteHostNotification } = useHost();

  return (
    <>
      <label htmlFor="host">
        <input
          type="checkbox"
          id="host"
          checked={host}
          onChange={host ? deleteHostNotification : addHostNotification}
        />
        &nbsp;Host notifications
      </label>
    </>
  );
};

export default Host;
