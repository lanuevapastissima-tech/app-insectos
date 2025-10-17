// En este archivo configurarás tu cliente de Supabase.
// Reemplaza los valores de 'TU_URL_DE_SUPABASE' y 'TU_ANON_KEY'.

import 'react-native-url-polyfill/auto'; // Necesario para que Supabase funcione en React Native
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xkclkpwzynwzvpkakwyw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrY2xrcHd6eW53enZwa2Frd3l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MjYyNTQsImV4cCI6MjA3NjEwMjI1NH0.clrUexPQD5X9xjGSzCk8XobcZi2if1mcIU7mhNWTPgo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
