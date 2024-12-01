import { supabase } from './supabase';

const createInitialProfile = async (userId: string) => {
  const { error } = await supabase
    .from('profiles')
    .insert([
      {
        user_id: userId,
        name: '',
        age: '',
        weight: '',
        height: '',
        goal: ''
      }
    ]);

  if (error) {
    console.error('Error creating initial profile:', error);
  }
};

export const initializeAnonymousUser = async () => {
  try {
    // Check if we already have a user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // If no user exists, sign in anonymously
      const { data, error } = await supabase.auth.signInAnonymously();

      if (error) {
        console.error('Error creating anonymous user:', error);
        return null;
      }

      if (data.user) {
        // Create initial profile for the new user
        await createInitialProfile(data.user.id);
      }

      return data.user;
    }

    // Check if existing user has a profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!profile) {
      // Create profile if it doesn't exist
      await createInitialProfile(user.id);
    }

    return user;
  } catch (error) {
    console.error('Error in anonymous user initialization:', error);
    return null;
  }
};
