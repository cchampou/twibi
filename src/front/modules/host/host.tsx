import React from 'react';
import useHost from './useHost';

const Host = () => {
  const { host, addHostNotification, deleteHostNotification } = useHost();

  console.log(host);

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={host}
          onClick={host ? deleteHostNotification : addHostNotification}
        />
        &nbsp;Host notifications
      </label>
    </>
  );
};

export default Host;
