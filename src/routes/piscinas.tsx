import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/piscinas")({
  head: () => ({ meta: [
    { title: "[NOME DA EMPRESA] | Piscinas personalizadas" },
    { name: "description", content: "Projetamos e construímos piscinas personalizadas, com tecnologia, segurança e acabamento impecável." },
    { name: "theme-color", content: "#050B1A" },
  ] }),
  component: PiscinasPreview,
});

function PiscinasPreview() {
  return <main style={{ margin: 0, padding: 0, minHeight: "100vh", background: "#050B1A" }}><iframe title="Landing page de construção de piscinas" src="/piscinas/index.html" style={{ display: "block", width: "100%", height: "100vh", minHeight: "100vh", border: 0, background: "#050B1A" }} /></main>;
}
