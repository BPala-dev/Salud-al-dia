// Service worker de Calorías y Peso: solo muestra los recordatorios (no guarda la app en caché).
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { body: e.data ? e.data.text() : "" }; }
  const title = d.title || "Calorías y Peso";
  e.waitUntil(self.registration.showNotification(title, {
    body: d.body || "Acordate de cargar tus datos de hoy.",
    tag: d.tag || "recordatorio",
    icon: "icon-192.png",
    badge: "icon-192.png",
    data: { url: d.url || "./" }
  }));
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || "./", self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((ws) => {
    for (const w of ws) { if (w.url.startsWith(self.registration.scope)) return w.focus(); }
    return self.clients.openWindow(url);
  }));
});
