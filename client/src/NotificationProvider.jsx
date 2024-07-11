import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const NotificationContext = createContext();

export const useNotifications = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('connect', () => {
      console.log('connected to socket server');
    });

    socket.on('newBooking', (notification) => {
        console.log(notification)
      setNotifications((prev) => [...prev, notification]);
    });


    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
