import React, { useCallback, useEffect, useState } from 'react';
import { deleteRequest, getJsonRequest, postRequest } from './utils/http';

export default () => {
  const [command, setCommand] = useState('hello');
  const [response, setResponse] = useState('world');
  const [commands, setCommands] = useState([]);

  const onCommandChange = useCallback((e) => {
    setCommand(e.target.value);
  }, [setCommand]);

  const onResponseChange = useCallback((e) => {
    setResponse(e.target.value);
  }, [setResponse]);

  const fetchCommands = () => {
    getJsonRequest('/twitch/commands').then((data) => setCommands(data));
  };

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    postRequest('/twitch/commands', {
      command,
      response,
    }).then(() => {
      fetchCommands();
    });
  }, [command, response]);

  const onDelete = useCallback(() => {
    deleteRequest('/twitch/commands').then(() => null);
    fetchCommands();
  }, []);

  useEffect(() => {
    fetchCommands();
  }, []);

  return (
    <section>
      <h2>Bot commands</h2>
      <ul>
        {commands.map(([command, response]) => (
          <li key={command}>
            {command}
            {' => '}
            {response}
          </li>
        ))}
      </ul>
      <button type="button" onClick={onDelete}>Vider</button>
      <form onSubmit={onSubmit}>
        <input type="text" value={command} onChange={onCommandChange} />
        <input type="text" value={response} onChange={onResponseChange} />
        <button type="submit">Valider</button>
      </form>
    </section>
  );
};
