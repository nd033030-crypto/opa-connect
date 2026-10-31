import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ultra 2 — Built beyond ordinary | Concept" },
      { name: "description", content: "An editorial, scroll-driven concept for a rugged titanium smartwatch." },
      { name: "theme-color", content: "#050506" },
    ],
  }),
  component: AppleWatchHome,
});

function AppleWatchHome() {
  return (
    <main style={{ width: "100%", minHeight: "100vh", margin: 0, padding: 0, background: "#050506" }}>
      <iframe
        title="Ultra 2 — Apple Watch concept landing page"
        src="/apple-watch-ultra2/index.html"
        style={{ display: "block", width: "100%", height: "100vh", minHeight: "100vh", border: 0, background: "#050506" }}
        allow="fullscreen"
      />
    </main>
  );
}
