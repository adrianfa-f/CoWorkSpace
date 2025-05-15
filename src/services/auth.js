// services/auth.js
import { supabase } from '../utils/supabaseClient';

export const loginWithMagicLink = async (email) => {
    const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: { 
            emailRedirectTo: window.location.origin + '/dashboard',
        }
    });
    return { data, error };
};

export const signInWithMagicLink = async (email, username) => {
    const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin + '/dashboard' },
        data: { username }
    });

    return { data, error };
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};