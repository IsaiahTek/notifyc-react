import { fetchNotifications, fetchUnreadCount, fetchPreferences } from './actions';
import { NotificationApiClient } from './api_client';
import { addNotification, handleNotificationEvent } from './handlers'
import { NotificationConfig } from './types';
// ============================================================================
// INITIALIZATION (Call once in your app)
// ============================================================================
let apiClient: NotificationApiClient | null = null;

export function initializeNotifications(config: NotificationConfig) {
  apiClient = new NotificationApiClient(config);

  // Setup WebSocket or Polling
  if (config.wsUrl) {
    apiClient.connectWebSocket((data) => {
      if (data.type === 'notification') {
        addNotification(data.notification);
      } else if (data.type === 'event') {
        handleNotificationEvent(data.event);
      }
    });
  } else if (config.pollInterval) {
    apiClient.startPolling(async () => {
      await fetchNotifications();
      await fetchUnreadCount();
    });
  }

  // Initial fetch
  fetchNotifications();
  fetchUnreadCount();
  fetchPreferences();
}

export function disconnectNotifications() {
  if (apiClient) {
    apiClient.disconnectWebSocket();
    apiClient.stopPolling();
  }
}

export function deleteAllNotifications() {
  if (apiClient) {
    apiClient.deleteAll();
  }
}