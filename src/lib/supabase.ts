import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vkakrkbsbhfnkvzymnrg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrYWtya2JzYmhmbmt2enltbnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4MzQyOTIsImV4cCI6MjA3MzQxMDI5Mn0.QyPVQoyidvxghzp9zdKBs5_Q6qavNZkJjvtwmwkI58U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)