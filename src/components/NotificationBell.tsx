import { useEffect, useState } from 'react';
import { BellIcon } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { notificationService } from '@/services/NotificationService';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  body: string;
  created_at: string;
  read: boolean;
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    const data = await notificationService.getNotifications();
    setNotifications(data);
    setUnreadCount(data.filter((n: Notification) => !n.read).length);
  };

  useEffect(() => {
    fetchNotifications();

    // Poll for new notifications every minute
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (notificationId: string) => {
    await notificationService.markAsRead(notificationId);
    fetchNotifications();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#92A3FD] text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <ScrollArea className="h-[300px]">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  'flex flex-col items-start p-4 gap-1',
                  !notification.read && 'bg-[#92A3FD]/5'
                )}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">{notification.title}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(notification.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{notification.body}</p>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              No notifications
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
