import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import useNotification from './useNotification';
import Toggle from '../../components/Toggle';
import theme from '../../theme';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Wrapper = styled('div')`
  background-color: ${theme.colors.black};
  padding: 20px;
  margin: 50px;
  max-width: 50%;
  border-radius: 10px;
  box-shadow: 0 0 50px ${theme.colors.black};
`;

const Label = styled('label')`
  margin: 1rem;
`;

const Form = styled('form')`
  display: flex;
  width: 100%;
  margin: 0;
`;

type NotificationType = {
  type: string;
};

const mapping = {
  host: {
    title: 'Host notifications',
    text: '[username] is hosting the stream !',
  },
  follow: {
    title: 'Follow notifications',
    text: '[username] is now following you !',
  },
  subscribe: {
    title: 'Subscription notifications',
    text: '[username] subscribed to the channel !',
  },
};

const Notification: FunctionComponent<NotificationType> = ({ type }) => {
  const { notify, addNotification, deleteNotification } = useNotification(type);

  return (
    <Wrapper>
      <Label htmlFor={type}>
        <Toggle
          id={type}
          checked={notify}
          onChange={notify ? deleteNotification : addNotification}
        />
        &nbsp;{mapping[type].title}
      </Label>
      <br />
      {notify && (
        <Form>
          <Input value={mapping[type].text} />
          <Button type="button">Save</Button>
        </Form>
      )}
    </Wrapper>
  );
};

export default Notification;
