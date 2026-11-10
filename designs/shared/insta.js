// Instagram feed via Behold (behold.so).
// 1. Connect @lmaroria at behold.so and create a feed.
// 2. Paste its feed ID below. Until then the placeholder tiles stay.
const BEHOLD_FEED_ID = '';

if (BEHOLD_FEED_ID) {
  const s = document.createElement('script');
  s.type = 'module';
  s.src = 'https://w.behold.so/widget.js';
  document.head.append(s);
  const slot = document.getElementById('insta');
  slot.innerHTML = `<behold-widget feed-id="${BEHOLD_FEED_ID}"></behold-widget>`;
}
