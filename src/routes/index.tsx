import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tchê Car | Lavação e Estacionamento — Balneário Camboriú" },
      { name: "description", content: "Tchê Car — Lavação e estacionamento na R. 3600, 175, Centro de Balneário Camboriú. Seu carro sempre impecável. Solicite orçamento pelo WhatsApp." },
      { name: "theme-color", content: "#0F0F10" },
      { property: "og:title", content: "Tchê Car | Lavação e Estacionamento" },
      { property: "og:description", content: "Seu carro sempre impecável. Conheça a Tchê Car no Centro de Balneário Camboriú." },
    ],
  }),
  component: TcheCarHome,
});

function TcheCarHome() {
  return (
    <main style={{ margin: 0, padding: 0, minHeight: "100vh", background: "#0F0F10" }}>
      <iframe title="Tchê Car — Lavação e Estacionamento" src="/hamburgueria/index.html" style={{ display: "block", width: "100%", height: "100vh", minHeight: "100vh", border: 0, background: "#0F0F10" }} />
    </main>
  );
}
