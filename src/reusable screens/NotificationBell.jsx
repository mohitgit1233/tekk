import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const NotificationBell = ({ hasNotifications }) => {
  return (
    <Ionicons
      name={hasNotifications ? 'notifications' : 'notifications-outline'}
      size={24}
      color="#fff"
      style={{ marginRight: 10 }}
    />
  );
};

export default NotificationBell;
