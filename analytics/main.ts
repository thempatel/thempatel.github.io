// Analytics pixel server for analytics.thempatel.com.
// Returns a 1x1 transparent GIF with 200 on every path. The blog embeds an
// <img> whose path matches the page URL, so Deno Deploy's dashboard reports
// request counts per path = basic page-view analytics.

// 43-byte 1x1 transparent GIF89a.
const PIXEL = Uint8Array.from([
  0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x80, 0x00, 0x00,
  0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x21, 0xf9, 0x04, 0x01, 0x00, 0x00, 0x00,
  0x00, 0x2c, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02,
  0x44, 0x01, 0x00, 0x3b,
]);

Deno.serve(() =>
  new Response(PIXEL, {
    headers: {
      "content-type": "image/gif",
      // Never cache, so every page view is a fresh request the dashboard counts.
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
    },
  })
);
