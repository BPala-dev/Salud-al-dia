# Calorías y Peso

App web para el iPhone: calorías y macros (búsqueda por nombre, código de barras y foto), peso, objetivos, recetas, asistente y recordatorios.

## Qué va a GitHub (raíz del repositorio)
`index.html`, `config.js`, `alimentos.json`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`.
Lo de `NO-subir-a-GitHub/` va en Supabase.

## Configuración en Supabase (una sola vez)
Ya hecho antes: `1-base-de-datos.sql`, la función `ia` (`2-funcion-ia.ts`) y el secreto `GEMINI_KEY`.

Nuevo:
1. **Función `app`**: Edge Functions → Deploy a new function → Via Editor. Nombre: `app` (exacto). Pegá `4-funcion-app.ts`, deployá y **desactivá "Verify JWT"** igual que en `ia`. No necesita secretos.
2. **SQL**: SQL Editor → New query → pegá `3-productos-y-recordatorios.sql` → Run.
   Crea la tabla `productos`, lo necesario para los recordatorios y una tarea automática cada 5 minutos.
   Si da error con `pg_cron` o `pg_net`, activalas en Database → Extensions y volvé a correr el script.

## Cómo funciona
- **Productos con código de barras**: al escanear, la app busca primero en la tabla `productos` (compartida), después en Open Food Facts. Lo que se encuentra en Open Food Facts y lo que alguien carga a mano con su código queda guardado para todos.
  La tarea automática además va trayendo de a poco todos los productos de Argentina que tiene Open Food Facts (tarda unas horas la primera vez y se repasa una vez por mes). El avance se ve en la tabla `importacion`.
- **Recordatorios**: cada usuario los activa en Ajustes → Recordatorios y elige el horario. En iPhone hay que agregar la app a la pantalla de inicio y abrirla desde ese ícono (requisito de Apple). Solo avisa si ese día todavía no cargó el peso o las comidas.
- **Eliminar alimentos o productos**: solo desde Supabase → Table Editor.

## Fuentes de datos
- Food nutrition data from TempoLife (tempolife.app), CC-BY-4.0. Los valores de origen USDA provienen de USDA FoodData Central, SR Legacy (dominio público).
- Comidas típicas argentinas: valores estimados.
- Productos envasados: Open Food Facts (ODbL), más los que cargan los usuarios.
