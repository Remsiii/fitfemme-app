import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowLeftCircleIcon, Bell } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { notificationService } from "@/services/NotificationService";
import { formatDistanceToNowStrict, format } from "date-fns";
import { de } from "date-fns/locale";

interface Notification {
  id: string;
  type: string;
  message: string;
  read: boolean;
  created_at: string;
}

export const Notification = (): JSX.Element => {
  const navigate = useNavigate();
  const [swipedId, setSwipedId] = useState<string | null>(null);
  const startX = useRef<number | null>(null);
  const currentX = useRef<number | null>(null);
  const [translations, setTranslations] = useState<{ [key: string]: number }>({});
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const setupNotifications = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Request notification permission for browser notifications
      await notificationService.requestPermission();

      // Subscribe to user notifications
      notificationService.subscribeToUserNotifications(user.id);

      // Fetch initial notifications
      fetchNotifications();

      // Subscribe to real-time notifications
      const channel = supabase
        .channel('notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            const newNotification = payload.new as Notification;
            setNotifications(prev => [newNotification, ...prev]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
        if (user) {
          notificationService.unsubscribeFromUserNotifications(user.id);
        }
      };
    };

    setupNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleTouchStart = (e: TouchEvent | MouseEvent, id: string) => {
    if (deletingId !== null) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startX.current = clientX;
    currentX.current = clientX;
  };

  const handleTouchMove = (e: TouchEvent | MouseEvent, id: string) => {
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

  const handleTouchEnd = async (id: string) => {
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

  const deleteNotification = async (id: string) => {
    try {
      setDeletingId(id);
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    } finally {
      setDeletingId(null);
      setSwipedId(null);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return formatDistanceToNowStrict(date, { addSuffix: true, locale: de });
    }

    return format(date, 'dd.MM.yyyy', { locale: de });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return "bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]";
      case 'workout_completed':
        return "bg-gradient-to-b from-[#C58BF2] to-[#EEA4CE]";
      default:
        return "bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF]";
    }
  };

  return (
    <div className="p-4 pb-24">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftCircleIcon className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold">Benachrichtigungen</h1>
        <div className="w-6" /> {/* Spacer for alignment */}
      </div>

      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="mb-4 overflow-hidden">
              <div
                className="relative"
                onTouchStart={(e) => handleTouchStart(e as TouchEvent, notification.id)}
                onTouchMove={(e) => handleTouchMove(e as TouchEvent, notification.id)}
                onTouchEnd={() => handleTouchEnd(notification.id)}
                onMouseDown={(e) => handleTouchStart(e as MouseEvent, notification.id)}
                onMouseMove={(e) => handleTouchMove(e as MouseEvent, notification.id)}
                onMouseUp={() => handleTouchEnd(notification.id)}
                onMouseLeave={() => handleTouchEnd(notification.id)}
              >
                <motion.div
                  className="absolute top-0 right-0 bottom-0 flex items-center justify-center bg-red-500 text-white"
                  initial={{ x: 100 }}
                  animate={{ x: swipedId === notification.id ? 0 : 100 }}
                  transition={{ duration: 0.2 }}
                  style={{ width: 100 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-white"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </motion.div>

                <motion.div
                  className="bg-white"
                  animate={{
                    x: -(translations[notification.id] || 0)
                  }}
                  transition={{ duration: 0 }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <img
                          src="/icons/andree.jpg"
                          alt="FitFemme Notification"
                          className="h-full w-full object-cover"
                        />
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className={cn(
                          "text-sm leading-none",
                          !notification.read && "font-semibold"
                        )}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatTimestamp(notification.created_at)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-12 text-gray-500">
          <img
            src="https://instagram.fvie1-1.fna.fbcdn.net/v/t51.2885-19/473652778_601706832804935_8357838460986024120_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fvie1-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=akClnRI26R0Q7kNvgHqq7Fy&_nc_gid=7bb7e444c1b24606abfcb55ad26ea746&edm=APoiHPcBAAAA&ccb=7-5&oh=00_AYCDRod4y7KXCcc2u5iNr5R3fDx7ygsbUUxbC3pL14n2Aw&oe=678A1DBF&_nc_sid=22de04"
            alt="FitFemme Logo"
            className="h-12 w-12 mb-4 rounded-full opacity-50"
          />

        </div >
      )}
    </div >
  );
};

export default Notification;
