import React from 'react';
import Notifications from '../components/notifications';


const NotificationsPage = () => {
  return (
    <div className="notifications-page p-4">
      <h1 className="text-2xl mb-4">Notifications</h1>
      <Notifications />
    </div>
  );
};

export default NotificationsPage;
