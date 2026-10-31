import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/apple-watch-ultra2")({
  component: AppleWatchUltra2Preview,
});

function AppleWatchUltra2Preview() {
  return (
    <main style={{ width: "100%", minHeight: "100vh", margin: 0, padding: 0, background: "#050506" }}>
      <iframe
        title="Ultra 2 — landing page concept"
        src="/apple-watch-ultra2/index.html"
        style={{ display: "block", width: "100%", height: "100vh", minHeight: "100vh", border: 0, background: "#050506" }}
        allow="fullscreen"
      />
    </main>
  );
}
