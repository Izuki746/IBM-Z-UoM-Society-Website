// The intro only plays once per browser session, and never for people
// who have asked their device to reduce motion.
const KEY = "ibmz-booted";

export function hasBooted() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function markBooted() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* storage blocked: the intro will just play again next visit */
  }
}
