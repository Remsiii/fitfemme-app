// src/lib/supabaseAdmin.ts

import { createClient } from "@supabase/supabase-js";

// Diese Variablen kommen aus deiner .env-Datei.
// In Vite wäre das z. B. .env.local oder .env.development.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || "";

// Service-Client für Admin-Operationen
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
