import { NotificationApiClient } from './api_client';
import { NotificationConfig } from './types';
export declare let apiClient: NotificationApiClient | null;
export declare function initializeNotifications(config: NotificationConfig): void;
export declare function disconnectNotifications(): void;
