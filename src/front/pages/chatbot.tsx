import React from 'react';
// import Chatbot from '../modules/chatbot';
import Notification from '../modules/notification/notification';

const Chatbot = () => (
  <>
    {/* <Chatbot /> */}
    <p>
      To mention the user which is responsible of the event, write
      {` "{username}"`}
    </p>
    <Notification type="host" />
    <Notification type="follow" />
    <Notification type="subscribe" />
  </>
);

export default Chatbot;
