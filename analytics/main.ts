// Analytics pixel server for analytics.thempatel.deno.net.
// Returns 204 No Content on every path. The blog embeds an <img> whose path
// matches the page URL, so Deno Deploy's dashboard reports request counts per
// path = basic page-view analytics. We send no body to minimize egress — the
// <img> is hidden (display:none), so it never needs to render anything.

Deno.serve(() =>
  new Response(null, {
    status: 204,
    headers: {
      // Never cache, so every page view is a fresh request the dashboard counts.
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
    },
  })
);
