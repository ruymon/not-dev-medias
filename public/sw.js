// Offline support. Pages are network-first so a deploy shows up as soon as
// there's a connection; build assets are content-hashed, so they're served
// from cache forever. Every page and the assets it references are cached on
// install, so a screen never visited online still opens offline.
//
// The registration URL carries the build id (`/sw.js?v=…`), which makes each
// deploy install a fresh worker and drop the previous build's caches.

const VERSION = new URL(self.location.href).searchParams.get("v") ?? "dev";
const PAGES_CACHE = `pages-${VERSION}`;
const ASSETS_CACHE = `assets-${VERSION}`;

const ROUTES = ["/", "/subjects", "/grades", "/awards"];
const NETWORK_TIMEOUT_MS = 4000;

// Matches hashed build assets in HTML and in the inlined RSC payload, where
// quotes are escaped.
const ASSET_PATTERN = /\/_next\/static\/[^"'\\\s)]+/g;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const pages = await caches.open(PAGES_CACHE);
      const assets = await caches.open(ASSETS_CACHE);

      await Promise.all(
        ROUTES.map(async (route) => {
          const response = await fetch(route, { cache: "reload" });
          if (!response.ok) return;

          const html = await response.clone().text();
          await pages.put(route, response);

          const urls = [...new Set(html.match(ASSET_PATTERN) ?? [])];
          await Promise.all(
            urls.map((url) => assets.add(url).catch(() => undefined))
          );
        })
      );

      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([PAGES_CACHE, ASSETS_CACHE]);
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => !keep.has(key)).map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

async function handleNavigation(request) {
  const url = new URL(request.url);
  const pages = await caches.open(PAGES_CACHE);

  try {
    const response = await withTimeout(fetch(request), NETWORK_TIMEOUT_MS);
    if (response.ok && ROUTES.includes(url.pathname)) {
      pages.put(url.pathname, response.clone());
    }
    return response;
  } catch {
    // Search params only drive client-side filters, so the bare page works.
    const cached =
      (await pages.match(url.pathname)) ?? (await pages.match("/"));
    return cached ?? Response.error();
  }
}

async function handleAsset(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    const assets = await caches.open(ASSETS_CACHE);
    assets.put(request, response.clone());
  }
  return response;
}

/** Icons, manifest and the like: serve what we have, refresh in the background. */
async function handleStaleWhileRevalidate(request) {
  const assets = await caches.open(ASSETS_CACHE);
  const cached = await assets.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok) assets.put(request, response.clone());
      return response;
    })
    .catch(() => cached ?? Response.error());
  return cached ?? network;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(request));
    return;
  }

  // Client-side navigations fetch RSC payloads. They depend on the router's
  // state, so they aren't cached; when one fails offline, Next falls back to
  // a full navigation, which the cached page answers.
  if (request.headers.get("RSC") === "1" || url.searchParams.has("_rsc")) {
    return;
  }

  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(handleAsset(request));
    return;
  }

  if (!url.pathname.startsWith("/_next/") && !url.pathname.startsWith("/api/")) {
    event.respondWith(handleStaleWhileRevalidate(request));
  }
});
