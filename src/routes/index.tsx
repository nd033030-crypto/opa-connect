import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Clock3, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import hero from "@/assets/hero-burger.jpg";
import burgerFries from "@/assets/burger-fries.jpg";
import fries from "@/assets/fries.jpg";
import bacon from "@/assets/bacon-burger.jpg";
import combo from "@/assets/combo.jpg";
import rings from "@/assets/onion-rings.jpg";
import kitchen from "@/assets/kitchen.jpg";
import chicken from "@/assets/chicken-burger.jpg";

const TITLE = "Saturno Bistrô & Burger | Hamburgueria Artesanal na Aclimação, São Paulo";
const DESC =
  "Hamburgueria artesanal na Aclimação, São Paulo. Conheça o cardápio do Saturno Bistrô & Burger e faça seu pedido pelo WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Saturno,
});

const PHONE = "5511986979286";
const ADDRESS = "R. Saturno, 132 - Aclimação, São Paulo - SP, 01531-030";
const wa = (msg = "Olá! Encontrei o Saturno Bistrô & Burger pelo site e gostaria de conhecer o cardápio e fazer um pedido.") =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
const MAP = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
const EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&z=16&output=embed`;

const nav = [
  ["Início", "#inicio"],
  ["Sobre", "#sobre"],
  ["Cardápio", "#cardapio"],
  ["Galeria", "#galeria"],
  ["Contato", "#contato"],
] as const;

// Itens demonstrativos — substitua pelo cardápio real (nome, descrição, preço e foto).
type Item = { name: string; desc: string; img: string; price?: string };
const menu: { category: string; items: Item[] }[] = [
  {
    category: "Hambúrgueres artesanais",
    items: [
      { name: "Clássico da Casa", desc: "Pão brioche, carne grelhada, cheddar, alface, tomate e cebola roxa.", img: hero },
      { name: "Bacon & Cebola", desc: "Carne grelhada, queijo derretido, bacon crocante e cebola caramelizada.", img: bacon },
      { name: "Frango Crocante", desc: "Frango empanado, picles e salada de repolho cremosa.", img: chicken },
    ],
  },
  {
    category: "Combos",
    items: [
      { name: "Combo Burger + Fritas", desc: "Hambúrguer, porção de fritas e bebida.", img: combo },
      { name: "Combo Duplo", desc: "Dois blends com cheddar e picles, acompanhado de fritas.", img: burgerFries },
    ],
  },
  {
    category: "Acompanhamentos",
    items: [
      { name: "Batatas Rústicas", desc: "Fritas douradas com ervas e molho da casa.", img: fries },
      { name: "Onion Rings", desc: "Anéis de cebola empanados e crocantes.", img: rings },
    ],
  },
];

const gallery = [
  { src: hero, alt: "Hambúrguer artesanal com cheddar derretido sobre tábua de madeira" },
  { src: kitchen, alt: "Mãos finalizando um hambúrguer duplo com queijo na cozinha" },
  { src: fries, alt: "Batatas rústicas com ervas em cesta metálica" },
  { src: bacon, alt: "Hambúrguer com bacon crocante e cebola caramelizada" },
  { src: rings, alt: "Onion rings empanados com molho" },
  { src: combo, alt: "Combo com hambúrguer, fritas e refrigerante" },
];

const btn =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const btnPrimary = `${btn} bg-primary text-primary-foreground hover:bg-primary-deep hover:-translate-y-0.5 shadow-soft`;
const btnGhost = `${btn} border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10`;
const btnOutline = `${btn} border border-primary text-primary hover:bg-primary hover:text-primary-foreground`;

function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Saturno() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useReveal();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  return (
    <div className="bg-background text-foreground">
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled || open ? "bg-background/95 shadow-soft backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20">
          <a href="#inicio" className={`brand-lockup font-serif text-xl font-semibold leading-none md:text-2xl ${scrolled || open ? "text-primary" : "text-primary-foreground"}`}>
            Saturno <span className="brand-subtitle block text-[0.65rem] font-sans font-bold uppercase tracking-[0.34em] opacity-90">Bistrô & Burger</span>
          </a>
          <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
            {nav.map(([l, h]) => (
              <a key={h} href={h} className={`text-sm font-medium transition-colors hover:text-primary ${scrolled ? "text-foreground" : "text-primary-foreground/90 hover:text-primary-foreground"}`}>
                {l}
              </a>
            ))}
            <a href={wa()} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Fazer pedido
            </a>
          </nav>
          <button
            className={`grid h-11 w-11 place-items-center rounded-full md:hidden ${scrolled || open ? "text-foreground" : "text-primary-foreground"}`}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav id="menu-mobile" aria-label="Menu mobile" className="border-t border-border bg-background px-5 pb-6 md:hidden">
            {nav.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-border py-4 font-serif text-lg">
                {l}
              </a>
            ))}
            <a href={wa()} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} mt-5 w-full`}>
              Fazer pedido
            </a>
          </nav>
        )}
      </header>

      <main>
        {/* HERO */}
        <section id="inicio" className="relative flex min-h-[92svh] items-end overflow-hidden bg-primary-deep md:items-center">
          <img src={hero} alt="Hambúrguer artesanal com pão brioche, cheddar derretido e salada fresca" width={1600} height={1072} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
          <div className="bg-hero-overlay absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-primary-deep/90 to-transparent md:hidden" />
          <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-28 md:pb-0">
            <div className="max-w-xl text-primary-foreground">
              <p className="hero-eyebrow animate-rise text-xs font-bold uppercase tracking-[0.32em] opacity-90" style={{ animationDelay: ".05s" }}><span className="hero-eyebrow-line" /> Aclimação · São Paulo</p>
              <h1 className="hero-title animate-rise mt-5 font-serif font-semibold leading-[0.88]" style={{ animationDelay: ".1s" }}>
                HOJE A FOME<br /><span className="hero-title-accent">TEM DESTINO.</span>
              </h1>
              <p className="animate-rise mt-5 max-w-md text-base leading-relaxed opacity-90 md:text-lg" style={{ animationDelay: ".2s" }}>
                Uma vontade impossível de ignorar. Descubra o Saturno Bistrô & Burger e fale direto com a nossa equipe.
              </p>
              <div className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: ".3s" }}>
                <a href="#cardapio" className={btnPrimary}>
                  VER O CARDÁPIO <ArrowRight className="h-4 w-4" />
                </a>
                <a href={wa()} target="_blank" rel="noopener noreferrer" className={btnGhost}>
                  <MessageCircle className="h-4 w-4" /> PEDIR PELO WHATSAPP
                </a>
              </div>
              <p className="animate-rise mt-6 flex items-center gap-2 text-sm opacity-80" style={{ animationDelay: ".4s" }}>
                <Clock3 className="h-4 w-4" /> Seg a sáb, 9h às 19h
              </p>
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <div className="reveal overflow-hidden rounded-2xl shadow-lift">
            <img src={kitchen} alt="Hambúrguer duplo sendo finalizado na cozinha" width={1024} height={1280} loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Sobre o bistrô</p>
            <h2 className="section-display mt-3 font-serif text-3xl font-semibold leading-tight md:text-5xl">FEITO PRA MARCAR. <span className="text-primary">FEITO PRA SATURNO.</span></h2>
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>O Saturno Bistrô & Burger fica na R. Saturno, na Aclimação, e é uma ótima escolha para quem procura um bom hambúrguer em São Paulo.</p>
              <p>Cada pedido é pensado para chegar bonito e saboroso — do pão à última batata. Conheça as opções do cardápio e fale direto com a equipe pelo WhatsApp.</p>
            </div>
            <a href="#cardapio" className={`${btnOutline} mt-8`}>
              Ver cardápio <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* CARDÁPIO */}
        <section id="cardapio" className="bg-card py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="reveal max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Cardápio</p>
              <h2 className="section-display mt-3 font-serif text-3xl font-semibold md:text-5xl">ESCOLHA SUA PRÓXIMA OBSESSÃO.</h2>
              <p className="mt-4 text-muted-foreground">
                Itens demonstrativos. Consulte disponibilidade e valores pelo WhatsApp.
              </p>
            </div>
            {menu.map((cat) => (
              <div key={cat.category} className="mt-14">
                <h3 className="menu-category reveal border-b border-border pb-3 font-serif text-2xl font-semibold">{cat.category}</h3>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((it) => (
                    <article key={it.name} className="reveal group flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                      <div className="overflow-hidden">
                        <img src={it.img} alt={it.name} width={1024} height={1024} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h4 className="font-serif text-xl font-semibold">{it.name}</h4>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                        <p className="mt-4 text-sm font-semibold text-primary">{it.price ?? "Consulte o valor"}</p>
                        <a
                          href={wa(`Olá, Saturno Bistrô & Burger! Gostaria de pedir: ${it.name}. Está disponível?`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${btnOutline} mt-4 w-full`}
                          aria-label={`Pedir ${it.name} pelo WhatsApp`}
                        >
                          <MessageCircle className="h-4 w-4" /> Pedir pelo WhatsApp
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-14 text-center">
              <a href={wa()} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                Fazer pedido agora
              </a>
            </div>
          </div>
        </section>

        {/* GALERIA */}
        <section id="galeria" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="reveal max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Galeria</p>
            <h2 className="section-display mt-3 font-serif text-3xl font-semibold md:text-5xl">OLHOU. DEU VONTADE.</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {gallery.map((g) => (
              <figure key={g.alt} className="reveal group overflow-hidden rounded-xl">
                <img src={g.src} alt={g.alt} width={1024} height={1024} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </figure>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Imagens ilustrativas.</p>
        </section>

        {/* CONTATO */}
        <section id="contato" className="bg-primary-deep py-20 text-primary-foreground md:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2">
            <div className="reveal">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] opacity-70">Contato</p>
              <h2 className="section-display mt-3 font-serif text-3xl font-semibold md:text-5xl">A FOME TE TROUXE ATÉ AQUI.</h2>
              <ul className="mt-8 space-y-5">
                <li className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 opacity-80" /><span>{ADDRESS}, Brasil</span></li>
                <li className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 opacity-80" /><a href={wa()} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">(11) 98697-9286</a></li>
                <li className="flex gap-3"><Clock3 className="mt-0.5 h-5 w-5 shrink-0 opacity-80" /><span>Segunda a sábado, das 9h às 19h</span></li>
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={wa()} target="_blank" rel="noopener noreferrer" className={`${btn} bg-primary-foreground text-primary-deep hover:-translate-y-0.5`}>
                  <MessageCircle className="h-4 w-4" /> Conversar no WhatsApp
                </a>
                <a href={MAP} target="_blank" rel="noopener noreferrer" className={btnGhost}>
                  <MapPin className="h-4 w-4" /> Abrir no Google Maps
                </a>
              </div>
            </div>
            <div className="reveal overflow-hidden rounded-2xl border border-primary-foreground/15">
              <iframe title="Mapa do Saturno Bistrô & Burger" src={EMBED} loading="lazy" className="h-80 w-full md:h-full md:min-h-96" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background pb-28 pt-14 md:pb-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-3">
          <div>
            <p className="font-serif text-2xl font-semibold text-primary">Saturno Bistrô & Burger</p>
            <p className="mt-3 text-sm text-muted-foreground">R. Saturno, 132 · Aclimação, São Paulo</p>
            <p className="text-sm text-muted-foreground">Seg a sáb, 9h às 19h</p>
          </div>
          <nav aria-label="Rodapé" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {nav.map(([l, h]) => <a key={h} href={h} className="hover:text-primary">{l}</a>)}
          </nav>
          <div>
            <p className="font-serif text-lg">Bateu a vontade? Fale com o Saturno pelo WhatsApp.</p>
            <a href={wa()} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} mt-4`}>(11) 98697-9286</a>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl px-5 text-xs text-muted-foreground">© {new Date().getFullYear()} Saturno Bistrô & Burger</p>
      </footer>

      <a
        href={wa()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fazer pedido pelo WhatsApp"
        className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-lift transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
