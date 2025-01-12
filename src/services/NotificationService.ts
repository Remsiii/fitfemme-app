import { supabase } from '@/lib/supabase';

interface NotificationData {
  title: string;
  body: string;
  icon?: string;
  data?: any;
}

class NotificationService {
  private static instance: NotificationService;
  private permission: NotificationPermission = 'default';

  private constructor() {
    this.init();
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private async init() {
    if ('Notification' in window) {
      this.permission = await Notification.requestPermission();
    }
  }

  public async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  public async sendNotification(notification: NotificationData) {
    // Check if we need to request permission
    if (this.permission !== 'granted') {
      const granted = await this.requestPermission();
      if (!granted) return;
    }

    try {
      // Web notification
      if ('Notification' in window) {
        new Notification(notification.title, {
          body: notification.body,
          icon: notification.icon || '/fitfemme-logo.png',
          data: notification.data,
        });
      }

      // Store notification in Supabase for history
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('notifications').insert({
          user_id: user.id,
          title: notification.title,
          body: notification.body,
          read: false,
          created_at: new Date().toISOString(),
          data: notification.data,
        });
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  public async getNotifications() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  }

  public async markAsRead(notificationId: string) {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) throw error;
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }
}

export const notificationService = NotificationService.getInstance();
