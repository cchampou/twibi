import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import useNotification from './useNotification';
import Toggle from '../../components/Toggle';
import theme from '../../theme';

const Wrapper = styled('div')`
  background-color: ${theme.colors.black};
  padding: 20px;
  margin: 50px;
  max-width: 50%;
  border-radius: 10px;
  box-shadow: 0 0 50px ${theme.colors.black};
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
      <label htmlFor={type}>
        <Toggle
          id={type}
          checked={notify}
          onChange={notify ? deleteNotification : addNotification}
        />
        &nbsp;{mapping[type].title}
      </label>
      <p>{mapping[type].text}</p>
    </Wrapper>
  );
};

export default Notification;
