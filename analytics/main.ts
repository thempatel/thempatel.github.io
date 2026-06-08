// Analytics pixel server for analytics.thempatel.deno.net.
// Returns 204 No Content on every path. The blog embeds an <img> whose path
// matches the page URL, so Deno Deploy's dashboard reports request counts per
// path = basic page-view analytics. We send no body to minimize egress — the
// <img> is hidden (display:none), so it never needs to render anything.

Deno.serve((req, info) => {
  const url = new URL(req.url);
  const h = req.headers;
  // Log request characteristics — Deno Deploy captures stdout, so these show up
  // in the dashboard's logs for inspecting who/what is hitting each path.
  console.log(JSON.stringify({
    method: req.method,
    path: url.pathname + url.search,
    ip: h.get("x-forwarded-for") ?? info.remoteAddr.hostname,
    userAgent: h.get("user-agent"),
    referer: h.get("referer"),
    language: h.get("accept-language"),
    // Deno Deploy attaches the client's region to the request.
    region: h.get("x-deno-region"),
  }));

  return new Response(null, {
    status: 204,
    headers: {
      // Never cache, so every page view is a fresh request the dashboard counts.
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
    },
  });
});
