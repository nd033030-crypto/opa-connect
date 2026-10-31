import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "[NOME DA HAMBURGUERIA] | Hambúrguer artesanal" },
      { name: "description", content: "Hambúrgueres artesanais na brasa, combos e acompanhamentos. Confira o cardápio e peça pelo WhatsApp." },
      { name: "theme-color", content: "#0A0807" },
      { property: "og:title", content: "[NOME DA HAMBURGUERIA] | Hambúrguer artesanal" },
      { property: "og:description", content: "Brasa, queijo e sabor. Confira nosso cardápio e faça seu pedido." },
    ],
  }),
  component: HamburgueriaHome,
});

function HamburgueriaHome() {
  return (
    <main style={{ margin: 0, padding: 0, minHeight: "100vh", background: "#0A0807" }}>
      <iframe
        title="Site da hamburgueria"
        src="/hamburgueria/index.html"
        style={{
          display: "block",
          width: "100%",
          height: "100vh",
          minHeight: "100vh",
          border: 0,
          background: "#0A0807",
        }}
      />
    </main>
  );
}
