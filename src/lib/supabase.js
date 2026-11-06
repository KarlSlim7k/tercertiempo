import { createClient } from '@supabase/supabase-js'

// Proyecto Supabase "tercertiempo-pronosticos". La clave publishable es pública por diseño:
// la seguridad real la dan RLS (solo lectura) y las funciones RPC con PIN.
export const SUPABASE_URL = 'https://lktfcveqjdsbqpaxzlez.supabase.co'
export const SUPABASE_KEY = 'sb_publishable_WhQSlElcJ18NE0gqSdqOnw_x8zbzW25'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
})
