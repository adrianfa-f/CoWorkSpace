// utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://qgseftcsomxennxbxwpq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnc2VmdGNzb214ZW5ueGJ4d3BxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NTM0NjYsImV4cCI6MjA1OTUyOTQ2Nn0.JEfWXbbQ9JgsXhgYHAznYw8JNxM06SRR7mTYbxe0VPA";

export const supabase = createClient(supabaseUrl, supabaseKey);