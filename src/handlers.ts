import {
  Notification,
  NotificationEvent,
  NotificationState
} from './types';
import { notificationStore } from './store';


// ============================================================================
// REAL-TIME HANDLERS
// ============================================================================

export function addNotification(notification: Notification) {
  const state = (notificationStore.snapshot as NotificationState); // or however you get current state
  const unreadCount = notification.status !== 'read'
    ? state.unreadCount + 1
    : state.unreadCount;

  const nextState = {
    ...state,
    notifications: [notification, ...state.notifications],
    unreadCount
  };

  notificationStore.update(nextState, "key");
}


// export function handleNotificationEvent(event: NotificationEvent) {
//   switch (event.type) {
//     case 'sent':
//     case 'delivered':
//       addNotification(event.notification);
//       break;
    
//     case 'read':
//       notificationStore.update((state) => ({
//         ...state,
//         notifications: state.notifications.map(n =>
//           n.id === event.notification.id
//             ? { ...n, status: 'read' as const, readAt: new Date() }
//             : n
//         ),
//         unreadCount: Math.max(0, state.unreadCount - 1)
//       }));
//       break;
    
//     case 'failed':
//       console.error('Notification failed:', event.notification);
//       break;
//   }
// }

