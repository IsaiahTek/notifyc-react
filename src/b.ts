// ============================================================================
// @synq/notifications-react
// React bindings for Synq Notifications using react-synq-store (NO PROVIDER!)
// ============================================================================


// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/*
// 1. Initialize once in your app (e.g., in _app.tsx or main.tsx)
import { initializeNotifications } from '@synq/notifications-react';

initializeNotifications({
  apiUrl: 'http://localhost:3000/api',
  wsUrl: 'ws://localhost:3000/ws',
  userId: 'user:123',
  pollInterval: 5000, // Fallback polling
  getAuthToken: async () => localStorage.getItem('token')
});

// 2. Use anywhere without provider!
function NotificationBell() {
  const unreadCount = useUnreadCount();
  
  return (
    <button>
      🔔
      {unreadCount > 0 && <span>{unreadCount}</span>}
    </button>
  );
}

function NotificationList() {
  const { notifications, markAsRead, deleteNotification } = useNotifications({
    status: 'unread'
  });

  return (
    <div>
      {notifications.map(notif => (
        <div key={notif.id}>
          <h3>{notif.title}</h3>
          <p>{notif.body}</p>
          <button onClick={() => markAsRead(notif.id)}>Mark Read</button>
          <button onClick={() => deleteNotification(notif.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

// 3. Use in completely different parts of your app
function Header() {
  const unreadCount = useUnreadCount(); // Only re-renders when count changes
  return <Badge>{unreadCount}</Badge>;
}

function Sidebar() {
  const { notifications } = useNotifications(); // Only re-renders when notifications change
  return <NotificationList items={notifications} />;
}

// Both components share the same state automatically!
*/

// ============================================================================
// PACKAGE.JSON
// ============================================================================

/*
{
  "name": "@synq/notifications-react",
  "version": "1.0.0",
  "description": "React bindings for Synq Notifications using react-synq-store (no provider needed)",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "jest"
  },
  "peerDependencies": {
    "@synq/notifications-core": "^1.0.0",
    "react": "^18.0.0",
    "react-synq-store": "^1.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0"
  }
}
*/