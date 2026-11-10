// Tiny signal for "the visitor clicked through the loader".
// The loader fires it; scroll reveals wait for it so the hero animates in after the loader opens.

const EVENT = "site:enter";
let entered = false;

export function markEntered() {
  entered = true;
  window.dispatchEvent(new Event(EVENT));
}

export function onEnter(cb: () => void): () => void {
  if (entered) {
    cb();
    return () => {};
  }
  window.addEventListener(EVENT, cb, { once: true });
  return () => window.removeEventListener(EVENT, cb);
}
