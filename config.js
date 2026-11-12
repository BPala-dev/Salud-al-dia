// Configuración de Calorías y Peso. La completa quien publica la app, una sola vez.
// Los usuarios no tienen que tocar nada: la app se conecta sola.
window.APP_CONFIG = {
  // Supabase → Project Settings → API (o Data API): "Project URL"
  supabaseUrl: "https://cqmxqvimlgfztishhvug.supabase.co",
  // Supabase → Project Settings → API Keys: la clave "publishable" (sb_publishable_…) o la "anon" (legacy).
  // Es pública por diseño: lo que protege la base son las reglas del script SQL. Nunca pongas acá la "secret" ni la "service_role".
  supabaseKey: "sb_publishable_w7myztx2tysNLgYqOQp1cQ_iUi2FxoB"
};
