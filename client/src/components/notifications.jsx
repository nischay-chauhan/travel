import React from 'react';
import { useNotifications } from '../NotificationProvider';


const Notifications = () => {
  const { notifications } = useNotifications();
  console.log(notifications)

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index} className="notification">
            {notification.message}
          </div>
        ))
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
};

export default Notifications;
