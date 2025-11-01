// ============================================================================
// STORE ACTIONS (Pure functions)
// ============================================================================
import {
  NotificationFilters,
  NotificationPreferences} from '@synq/notifications-core';
import { NotificationApiClient } from './api_client';
import { notificationStore } from './store';

  let apiClient: NotificationApiClient | null = null;


// const apiClient = new let apiClient: NotificationApiClient | null = null;


export async function fetchNotifications(filters?: NotificationFilters) {
  if (!apiClient) throw new Error('Call initializeNotifications() first');
  
  notificationStore.update((state) => ({ ...state, loading: true, error: null }));
  
  try {
    const notifications = await apiClient.getNotifications(filters);
    notificationStore.update((state) => ({
      ...state,
      notifications,
      loading: false,
      lastSync: new Date()
    }));
  } catch (error) {
    notificationStore.update((state) => ({
      ...state,
      loading: false,
      error: (error as Error).message
    }));
  }
}

export async function fetchUnreadCount() {
  if (!apiClient) return;
  
  try {
    const unreadCount = await apiClient.getUnreadCount();
    notificationStore.update((state) => ({ ...state, unreadCount }));
  } catch (error) {
    console.error('Failed to fetch unread count:', error);
  }
}

export async function fetchStats() {
  if (!apiClient) return;
  
  try {
    const stats = await apiClient.getStats();
    notificationStore.update((state) => ({ ...state, stats }));
  } catch (error) {
    console.error('Failed to fetch stats:', error);
  }
}

export async function fetchPreferences() {
  if (!apiClient) return;
  
  try {
    const preferences = await apiClient.getPreferences();
    notificationStore.update((state) => ({ ...state, preferences }));
  } catch (error) {
    console.error('Failed to fetch preferences:', error);
  }
}

export async function markAsRead(notificationId: string) {
  if (!apiClient) return;
  
  try {
    await apiClient.markAsRead(notificationId);
    
    notificationStore.update((state) => ({
      ...state,
      notifications: state.notifications.map(n =>
        n.id === notificationId
          ? { ...n, status: 'read' as const, readAt: new Date() }
          : n
      )
    }));
    
    await fetchUnreadCount();
  } catch (error) {
    console.error('Failed to mark as read:', error);
  }
}

export async function markAllAsRead() {
  if (!apiClient) return;
  
  try {
    await apiClient.markAllAsRead();
    
    notificationStore.update((state) => ({
      ...state,
      notifications: state.notifications.map(n => ({
        ...n,
        status: 'read' as const,
        readAt: new Date()
      })),
      unreadCount: 0
    }));
  } catch (error) {
    console.error('Failed to mark all as read:', error);
  }
}

export async function deleteNotification(notificationId: string) {
  if (!apiClient) return;
  
  try {
    await apiClient.deleteNotification(notificationId);
    
    notificationStore.update((state) => ({
      ...state,
      notifications: state.notifications.filter(n => n.id !== notificationId)
    }));
    
    await fetchUnreadCount();
  } catch (error) {
    console.error('Failed to delete notification:', error);
  }
}

export async function deleteAll() {
  if (!apiClient) return;
  
  try {
    await apiClient.deleteAll();
    
    notificationStore.update((state) => ({
      ...state,
      notifications: [],
      unreadCount: 0
    }));
  } catch (error) {
    console.error('Failed to delete all:', error);
  }
}

export async function updatePreferences(prefs: Partial<NotificationPreferences>) {
  if (!apiClient) return;
  
  try {
    await apiClient.updatePreferences(prefs);
    
    notificationStore.update((state) => ({
      ...state,
      preferences: state.preferences ? { ...state.preferences, ...prefs } : null
    }));
  } catch (error) {
    console.error('Failed to update preferences:', error);
  }
}
