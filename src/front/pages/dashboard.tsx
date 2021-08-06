import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from '@emotion/styled';
import Notifications from './notifications';
import Chatbot from './chatbot';
import Sidenav from '../modules/sidenav/Sidenav';
import theme from '../theme';
import Settings from './settings';
import withAuthHoc from '../modules/login/withAuth.hoc';
import Profile from '../modules/profile/profile';

const Wrapper = styled('section')`
  display: flex;
`;
const MainSection = styled('section')`
  padding: 2rem;
  flex: 1;
  background-color: ${theme.colors.gray};
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
            <Chatbot />
          </Route>
          <Route path={`${path}/settings`}>
            <Settings />
          </Route>
          <Route>
            <Profile />
          </Route>
        </Switch>
      </MainSection>
    </Wrapper>
  );
};

export default withAuthHoc(Dashboard);
