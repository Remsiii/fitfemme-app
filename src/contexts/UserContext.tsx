import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Initial user check
    const initUser = async () => {
      try {
        // Check if we already have a user
        const { data: { user: existingUser } } = await supabase.auth.getUser();
        
        if (!existingUser) {
          // If no user exists, sign up anonymously
          const { data, error } = await supabase.auth.signUp({
            email: `${Math.random().toString(36).substring(2)}@anonymous.com`,
            password: Math.random().toString(36).substring(2),
          });

          if (error) {
            console.error('Error creating anonymous user:', error);
            return;
          }

          setUser(data.user);
        } else {
          setUser(existingUser);
        }
      } catch (error) {
        console.error('Error in initUser:', error);
      }
    };

    initUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
