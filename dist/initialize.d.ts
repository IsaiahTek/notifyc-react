import { NotificationApiClient } from './api_client';
import { NotificationConfig } from './types';
export declare let apiClient: NotificationApiClient | null;
export declare function initializeNotifications(config: NotificationConfig, onInitialized?: () => void): void;
export declare function disconnectNotifications(): void;
