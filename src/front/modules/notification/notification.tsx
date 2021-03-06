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
  border-radius: 10px;
  box-shadow: 0 0 50px ${theme.colors.black};

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin: 10px 0;
  }
`;

const Label = styled('label')`
  margin: 1rem;
`;

const Form = styled('form')`
  display: flex;
  width: 100%;
  margin: 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

type NotificationType = {
  type: string;
};

const mapping = {
  host: {
    title: 'Host notifications',
    text: '{username} is hosting the stream !',
  },
  follow: {
    title: 'Follow notifications',
    text: '{username} is now following you !',
  },
  subscribe: {
    title: 'Subscription notifications',
    text: '{username} subscribed to the channel !',
  },
};

const Notification: FunctionComponent<NotificationType> = ({ type }) => {
  const { notify, addNotification, deleteNotification, text, changeText } =
    useNotification(type, mapping[type].text);

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
          <Input value={text} onChange={changeText} />
          <Button type="submit" onClick={addNotification}>
            Save
          </Button>
        </Form>
      )}
    </Wrapper>
  );
};

export default Notification;
