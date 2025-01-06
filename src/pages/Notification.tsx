import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowLeftCircleIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  avatarBg: string;
}

const notificationsData = [
  {
    id: 1,
    title: "Hey, it's time for lunch",
    message: "You have a new notification",
    timestamp: "About 1 minutes ago",
    avatarBg: "bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]",
  },
  {
    id: 2,
    title: "Don't miss your lowerbody workout",
    message: "You have a new notification",
    timestamp: "About 3 hours ago",
    avatarBg: "bg-gradient-to-b from-[#C58BF2] to-[#EEA4CE]",
  },
  {
    id: 3,
    title: "Hey, let's add some meals for your b..",
    message: "You have a new notification",
    timestamp: "About 3 hours ago",
    avatarBg: "bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]",
  },
  {
    id: 4,
    title: "Congratulations, You have finished A..",
    message: "You have a new notification",
    timestamp: "29 May",
    avatarBg: "bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]",
  },
  {
    id: 5,
    title: "Hey, it's time for lunch",
    message: "You have a new notification",
    timestamp: "8 April",
    avatarBg: "bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]",
  },
  {
    id: 6,
    title: "Ups, You have missed your Lowerbo...",
    message: "You have a new notification",
    timestamp: "3 April",
    avatarBg: "bg-gradient-to-b from-[#C58BF2] to-[#EEA4CE]",
  },
];

export const Notification = (): JSX.Element => {
  const navigate = useNavigate();
  const [swipedId, setSwipedId] = useState<number | null>(null);
  const startX = useRef<number | null>(null);
  const currentX = useRef<number | null>(null);
  const [translations, setTranslations] = useState<{ [key: number]: number }>({});
  const [notifications, setNotifications] = useState(notificationsData);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleTouchStart = (e: TouchEvent | MouseEvent, id: number) => {
    if (deletingId !== null) return; // Prevent interaction during deletion
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startX.current = clientX;
    currentX.current = clientX;
  };

  const handleTouchMove = (e: TouchEvent | MouseEvent, id: number) => {
    if (!startX.current || deletingId !== null) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    currentX.current = clientX;
    
    const diff = startX.current - clientX;
    const translation = Math.min(Math.max(diff, 0), 100);

    setTranslations(prev => ({
      ...prev,
      [id]: translation
    }));
  };

  const handleTouchEnd = (id: number) => {
    if (currentX.current && startX.current) {
      const diff = startX.current - currentX.current;
      
      if (diff > 50) {
        setSwipedId(id);
        setTranslations(prev => ({
          ...prev,
          [id]: 100
        }));
      } else {
        setTranslations(prev => ({
          ...prev,
          [id]: 0
        }));
      }
    }
    
    startX.current = null;
    currentX.current = null;
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    
    // First animate the notification to the right
    setTranslations(prev => ({
      ...prev,
      [id]: window.innerWidth
    }));

    // Wait for the slide animation
    await new Promise(resolve => setTimeout(resolve, 300));

    // Remove the notification
    setNotifications(prev => prev.filter(n => n.id !== id));
    setSwipedId(null);
    setTranslations(prev => {
      const newTranslations = { ...prev };
      delete newTranslations[id];
      return newTranslations;
    });
    
    // Clear deleting state
    setTimeout(() => {
      setDeletingId(null);
    }, 300);
  };

  const handleClearAll = async () => {
    // Animate all notifications to the right
    const newTranslations: { [key: number]: number } = {};
    notifications.forEach(n => {
      newTranslations[n.id] = window.innerWidth;
    });
    setTranslations(newTranslations);

    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 300));

    // Clear all notifications
    setNotifications([]);
    setSwipedId(null);
    setTranslations({});
  };

  return (
    <div className="bg-white flex justify-center w-full min-h-screen">
      <div className="bg-white w-[375px] flex flex-col">
        <header className="flex items-center justify-between px-8 pt-10 pb-6">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 bg-[#f7f8f8] rounded-lg"
            onClick={() => navigate('/home')}
          >
            <ArrowLeftCircleIcon className="h-4 w-4" />
          </Button>

          <h1 className="font-bold text-base text-black-color">Notification</h1>

          <Button
            variant="ghost"
            onClick={handleClearAll}
            className={cn(
              "text-sm font-medium transition-colors",
              notifications.length > 0 
                ? "text-red-500 hover:text-red-600" 
                : "text-gray-400"
            )}
            disabled={notifications.length === 0}
          >
            Clear All
          </Button>
        </header>

        <div className="p-4">
          <AnimatePresence mode="popLayout">
            {notifications.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-12 text-gray-400"
              >
                <Trash2 className="h-12 w-12 mb-4 opacity-50" />
                <p className="text-sm">No notifications</p>
              </motion.div>
            ) : (
              notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: window.innerWidth }}
                  transition={{ 
                    layout: { type: "spring", bounce: 0.2 },
                    opacity: { duration: 0.2 }
                  }}
                  className="relative mb-4 touch-pan-y"
                  onTouchStart={(e) => handleTouchStart(e.nativeEvent, notification.id)}
                  onTouchMove={(e) => handleTouchMove(e.nativeEvent, notification.id)}
                  onTouchEnd={() => handleTouchEnd(notification.id)}
                  onMouseDown={(e) => handleTouchStart(e, notification.id)}
                  onMouseMove={(e) => handleTouchMove(e, notification.id)}
                  onMouseUp={() => handleTouchEnd(notification.id)}
                  onMouseLeave={() => handleTouchEnd(notification.id)}
                >
                  <Card
                    className="transition-transform duration-200"
                    style={{
                      transform: `translateX(-${translations[notification.id] || 0}px)`
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 py-2">
                        <Avatar className={`w-10 h-10 ${notification.avatarBg}`} />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-black-color">
                            {notification.title}
                          </p>
                          <p className="text-[10px] text-gray-1">
                            {notification.timestamp}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <div 
                    className="absolute top-0 right-0 h-full flex items-center justify-center bg-red-500 transition-all duration-200"
                    style={{
                      width: `${translations[notification.id] || 0}px`
                    }}
                  >
                    <Button
                      variant="destructive"
                      className="h-full bg-transparent hover:bg-transparent"
                      onClick={() => handleDelete(notification.id)}
                    >
                      <Trash2 className="h-5 w-5 text-white" />
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
