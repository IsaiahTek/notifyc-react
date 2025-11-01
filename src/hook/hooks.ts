// ============================================================================
// REACT HOOKS (No Provider!)
// ============================================================================

import { useStore } from 'react-synq-store';
import { markAsRead, markAllAsRead, deleteNotification, deleteAll, fetchNotifications, fetchStats, updatePreferences } from '../actions';
import { notificationStore } from '../store';
import {
  Notification,
  NotificationFilters,
  NotificationPreferences,
  NotificationStats,
  NotificationEvent
} from '@synq/notifications-core';

/**
 * Main hook for notifications with optional filtering
 */
export function useNotifications(filters?: NotificationFilters) {
  const state = useStore(notificationStore);
  
  // Filter notifications client-side if filters provided
  const filteredNotifications = filters
    ? state.notifications.filter(n => {
        if (filters.status && n.status !== filters.status) return false;
        if (filters.type && n.type !== filters.type) return false;
        if (filters.category && n.category !== filters.category) return false;
        if (filters.priority && n.priority !== filters.priority) return false;
        return true;
      })
    : state.notifications;

  return {
    notifications: filteredNotifications,
    unreadCount: state.unreadCount,
    loading: state.loading,
    error: state.error,
    isConnected: state.isConnected,
    
    // Actions
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAll,
    refresh: fetchNotifications
  };
}

/**
 * Optimized hook for just unread count (only re-renders when count changes)
 */
export function useUnreadCount() {
  return useStore(notificationStore, (state) => state.unreadCount);
}

/**
 * Hook for notification stats
 */
export function useNotificationStats() {
  const stats = useStore(notificationStore, (state) => state.stats);
  
  React.useEffect(() => {
    fetchStats();
  }, []);
  
  return stats;
}

/**
 * Hook for user preferences
 */
export function useNotificationPreferences() {
  const preferences = useStore(notificationStore, (state) => state.preferences);
  
  return {
    preferences,
    updatePreferences
  };
}

/**
 * Hook for a single notification by ID
 */
export function useNotification(notificationId: string) {
  const notification = useStore(
    notificationStore,
    (state) => state.notifications.find(n => n.id === notificationId)
  );
  
  return {
    notification,
    markAsRead: () => markAsRead(notificationId),
    delete: () => deleteNotification(notificationId)
  };
}

/**
 * Hook for connection status
 */
export function useNotificationConnection() {
  return useStore(notificationStore, (state) => state.isConnected);
}
