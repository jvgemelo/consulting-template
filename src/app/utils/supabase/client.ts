
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL! // Reemplaza con el puerto correcto
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!// Reemplaza con tu clave anónima
// NEXT_PUBLIC_SUPABASE_URL='http://localhost:8000'
// NEXT_PUBLIC_SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE'
// export const supabase = createClient(process.env.SUPABASE_URL ?? "", process.env.SUPABASE_ANON_KEY ?? "")
export const supabase = createClient(supabaseUrl, supabaseKey)

// Configura el webhook (esto se ejecuta en tu entorno de configuración)
// const setUpWebhook = async () => {
//     const { data, error } = await supabase.from('auth.webhooks').insert([
//       {
//         event: 'SIGNED_UP',
//         url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/confirm-email`,
//       },
//     ]);
  
//     if (error) {
//       console.error('Error setting up webhook:', error);
//     } else {
//       console.log('Webhook set up:', data);
//     }
//   };
  
//   setUpWebhook();