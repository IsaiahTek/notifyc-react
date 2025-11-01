// ============================================================================
// TYPES
// ============================================================================
import {
  Notification,
  NotificationPreferences,
  NotificationStats} from '@synq/notifications-core';


export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  stats: NotificationStats | null;
  preferences: NotificationPreferences | null;
  loading: boolean;
  error: string | null;
  isConnected: boolean;
  lastSync: Date | null;
}

export interface NotificationConfig {
  apiUrl: string;
  userId: string;
  wsUrl?: string;
  pollInterval?: number;
  getAuthToken?: () => Promise<string | null>;
}
