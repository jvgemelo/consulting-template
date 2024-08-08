
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL! // Reemplaza con el puerto correcto
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!// Reemplaza con tu clave anónima
// export const supabase = createClient(process.env.SUPABASE_URL ?? "", process.env.SUPABASE_ANON_KEY ?? "")
export const supabase = createClient(supabaseUrl, supabaseKey)
// Configura el webhook (esto se ejecuta en tu entorno de configuración)
const setUpWebhook = async () => {
    const { data, error } = await supabase.from('auth.webhooks').insert([
      {
        event: 'SIGNED_UP',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/confirm-email`,
      },
    ]);
  
    if (error) {
      console.error('Error setting up webhook:', error);
    } else {
      console.log('Webhook set up:', data);
    }
  };
  
  setUpWebhook();