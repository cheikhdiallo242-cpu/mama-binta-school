self.addEventListener("install", () => {
  console.log("Service Worker installé");
});

self.addEventListener("fetch", () => {
  // version simple, sans cache complexe (évite bugs)
});
