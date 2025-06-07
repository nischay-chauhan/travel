import React from 'react';
import Navbar from '../components/Navbar'; // Added Navbar
import Notifications from '../components/notifications'; // This now shows the placeholder message

const NotificationsPage = () => {
  return (
    <div className="pb-12">
      <Navbar />
      <div className="container mx-auto px-4 pt-8">
        <h1 className="text-3xl font-semibold mb-8 text-center md:text-left">
          Notifications
        </h1>
        <div className="max-w-2xl mx-auto"> {/* Center the content card */}
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
