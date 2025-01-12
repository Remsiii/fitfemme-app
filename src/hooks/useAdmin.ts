import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useAdmin() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    setIsAdmin(false);
                    setLoading(false);
                    return;
                }

                console.log('Current user:', user); // Debug log

                // First, check if the profile exists
                const { data: profiles, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id);

                console.log('Profile query result:', { profiles, profileError }); // Debug log

                if (profileError) {
                    console.error('Profile query error:', profileError);
                    throw profileError;
                }

                // If no profile exists, create one
                if (!profiles || profiles.length === 0) {
                    console.log('Creating new profile for user:', user.id); // Debug log
                    const { error: insertError } = await supabase
                        .from('profiles')
                        .insert([
                            {
                                id: user.id,
                                email: user.email,
                                is_admin: false
                            }
                        ]);

                    if (insertError) {
                        console.error('Profile creation error:', insertError);
                        throw insertError;
                    }

                    setIsAdmin(false);
                } else {
                    // Use the first profile found
                    const profile = profiles[0];
                    console.log('Found profile:', profile); // Debug log
                    setIsAdmin(profile.is_admin || false);
                }
            } catch (error) {
                console.error('Error in checkAdminStatus:', error);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdminStatus();

        // Subscribe to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
            checkAdminStatus();
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return { isAdmin, loading };
}
