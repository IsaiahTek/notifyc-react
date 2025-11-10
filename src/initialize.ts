import { fetchNotifications, fetchUnreadCount, fetchPreferences } from './actions';
import { NotificationApiClient } from './api_client';
import { addNotification } from './handlers'
import { NotificationConfig, NotificationState } from './types';
import { notificationStore } from './store'
// ============================================================================
// INITIALIZATION (Call once in your app)
// ============================================================================
export let apiClient: NotificationApiClient | null = null;

export function initializeNotifications(config: NotificationConfig, onInitialized?: () => void) {
  apiClient = new NotificationApiClient(config);

  // Setup WebSocket or Polling
  if (config.wsUrl) {
    console.log("About to connect to WebSocket at: ", config.wsUrl);
    apiClient.connectWebSocket((data) => {
      if (data.type === 'notification') {
        addNotification(data.notification);
      } else if (data.type === 'unread-count') {
        const state = notificationStore.snapshot[0];
        notificationStore.update({ ...state, unreadCount: data.count }, "key");
      } else if (data.type === 'initial-data') {
        const state = notificationStore.snapshot[0];
        notificationStore.update({
          ...state,
          notifications: data.notifications,
          unreadCount: data.unreadCount,
          isConnected: true
        }, "key");
      }
    });
    const state = notificationStore.snapshot[0];
    notificationStore.update({ ...state, isConnected: true }, "key");
  } else if (config.pollInterval) {
    apiClient.startPolling(async () => {
      await fetchNotifications();
      await fetchUnreadCount();
    });
    const state = notificationStore.snapshot[0];
    notificationStore.update({ ...state, isConnected: true }, "key");
  }

  // Initial fetch
  fetchNotifications();
  fetchUnreadCount();
  fetchPreferences();

  // Call onInitialized callback
  onInitialized && onInitialized();
}

export function disconnectNotifications() {
  if (apiClient) {
    apiClient.disconnectWebSocket();
    apiClient.stopPolling();
    const state = notificationStore.snapshot as NotificationState;
    notificationStore.update({ ...state, isConnected: false }, "key");
  }
}
