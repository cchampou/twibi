import React from 'react';
import styled from '@emotion/styled';
import useHost from './useHost';
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

const Host = () => {
  const { host, addHostNotification, deleteHostNotification } = useHost();

  return (
    <Wrapper>
      <label htmlFor="host">
        <Toggle
          id="host"
          checked={host}
          onChange={host ? deleteHostNotification : addHostNotification}
        />
        &nbsp;Host notifications
      </label>
      <p>[username] is hosting the stream !</p>
    </Wrapper>
  );
};

export default Host;
