import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from '@emotion/styled';
import Notifications from './notifications';
import Chatbot from './chatbot';
import Sidenav from '../modules/sidenav/Sidenav';
import theme from '../theme';
import Discord from './discord';
import withAuthHoc from '../modules/login/withAuth.hoc';
import Profile from '../modules/profile/profile';
import Heading from '../components/Heading';

const Wrapper = styled('section')`
  display: flex;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
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
          <Route path={`${path}/discord`}>
            <Discord />
          </Route>
          <Route>
            <Profile />
            <Heading level={2}>News</Heading>
            Chatbot section is being improved. You should now be able to enable
            chat notifications for host, follow, and subscription events.
          </Route>
        </Switch>
      </MainSection>
    </Wrapper>
  );
};

export default withAuthHoc(Dashboard);
