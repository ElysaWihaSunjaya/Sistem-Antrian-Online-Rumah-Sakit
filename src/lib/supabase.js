import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wbiozzfahmnbmyqyqudm.supabase.co'       // <-- ganti dengan project URL-mu
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiaW96emZhaG1uYm15cXlxdWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NjgyNzcsImV4cCI6MjA2NjM0NDI3N30.iqSrotijjee1DOioDuJPM1zC73KeJ3SIpaLln-8sXzw'         // <-- ganti dengan anon key-mu
export const supabase = createClient(supabaseUrl, supabaseKey)
