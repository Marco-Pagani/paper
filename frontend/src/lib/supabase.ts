import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: { persistSession: true } // Keeps users logged in across visits
});

// Ensure a session exists
export async function ensureAnonUser() {
	const { data } = await supabase.auth.getSession();
	if (!data.session) {
		await supabase.auth.signInAnonymously();
	}
}
