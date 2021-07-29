import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import styled from '@emotion/styled';
import Notifications from './notifications';
import Commands from './commands';
import Sidenav from '../modules/sidenav/Sidenav';
import theme from '../theme';
import Settings from './settings';

const Wrapper = styled('section')`
  display: flex;
`;
const MainSection = styled('section')`
  padding: 2rem;
  flex: 1;
  background-color: ${theme.colors.black};
`;

const Dashboard = () => {
  const { path, url } = useRouteMatch();

  return (
    <Wrapper>
      <Sidenav baseUrl={url} />
      <MainSection>
        <Switch>
          <Route path={`${path}/notifications`}>
            <Notifications />
          </Route>
          <Route path={`${path}/bots`}>
            <Commands />
          </Route>
          <Route path={`${path}/settings`}>
            <Settings />
          </Route>
        </Switch>
      </MainSection>
    </Wrapper>
  );
};

export default Dashboard;
