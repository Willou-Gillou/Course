const CACHE='runtrack-v0-7';
const ASSETS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','https://unpkg.com/leaflet@1.9.4/dist/leaflet.css','https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).catch(()=>{}));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{if(e.request.method==='GET'&&resp.ok){const clone=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));}return resp;}).catch(()=>r)));});