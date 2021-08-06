import React from 'react';
// import Chatbot from '../modules/chatbot';
import Notification from '../modules/notification/notification';

const Chatbot = () => (
  <>
    {/* <Chatbot /> */}
    <Notification type="host" />
    <Notification type="follow" />
    {/* <Notification type="subscription" /> */}
  </>
);

export default Chatbot;
