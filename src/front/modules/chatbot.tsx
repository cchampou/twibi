import React, { useCallback, useEffect, useState } from 'react';
import Heading from '../components/Heading';
import { deleteRequest, getJsonRequest, postRequest } from '../utils/http';
import Button from '../components/Button';
import Input from '../components/Input';

export default () => {
  const [newCommand, setNewCommand] = useState('hello');
  const [newResponse, setNewResponse] = useState('world');
  const [commands, setCommands] = useState([]);

  const onCommandChange = useCallback(
    (e) => {
      setNewCommand(e.target.value);
    },
    [setNewCommand]
  );

  const onResponseChange = useCallback(
    (e) => {
      setNewResponse(e.target.value);
    },
    [setNewResponse]
  );

  const fetchCommands = () => {
    getJsonRequest('/twitch/commands', {}).then((data) => setCommands(data));
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      postRequest(
        '/twitch/commands',
        {
          command: newCommand,
          response: newResponse,
        },
        {}
      ).then(() => {
        fetchCommands();
      });
    },
    [newCommand, newResponse]
  );

  const onDelete = useCallback(() => {
    deleteRequest('/twitch/commands', {}).then(() => null);
    fetchCommands();
  }, []);

  useEffect(() => {
    fetchCommands();
  }, []);

  return (
    <section>
      <Heading level={2}>Bot commands</Heading>
      <ul>
        {commands.map(({ _id, command, response }) => (
          <li key={_id}>
            {command}
            {' => '}
            {response}
          </li>
        ))}
      </ul>
      <Button type="button" onClick={onDelete}>
        Vider
      </Button>
      <form onSubmit={onSubmit}>
        <Input type="text" value={newCommand} onChange={onCommandChange} />
        <Input type="text" value={newResponse} onChange={onResponseChange} />
        <Button type="submit">Valider</Button>
      </form>
    </section>
  );
};
