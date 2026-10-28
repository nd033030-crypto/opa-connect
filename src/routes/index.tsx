import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Clock3, MapPin, Menu, MessageCircle, X, UtensilsCrossed, Wine, Leaf, Sparkles, ExternalLink, CalendarDays } from "lucide-react";

const business = { name: "Roi Méditerranée", phone: "(11) 4040-7622", whatsapp: "551140407622", address: "Rua Haddock Lobo, 1626 - 3° Andar - Cerqueira César, São Paulo - SP, 01414-002, Brasil", hours: "Segunda a sábado, das 9h às 19h" };
const wa = (message = "Olá! Conheci o Roi Méditerranée pelo site e gostaria de saber mais sobre o menu e as reservas.") => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;
const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(business.address)}&z=16&output=embed`;
const photo = (id: string, width = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;
const images = {
 hero: photo("photo-1517248135467-4c7edcad34c4", 2000), room: photo("photo-1414235077428-338989a2e8c0"),
 dish: photo("photo-1547592180-85f173990554"), seafood: photo("photo-1519708227418-c8fd9a32b7a2"),
 pasta: photo("photo-1473093295043-cdd812d0e601"), table: photo("photo-1515003197210-e0cd7184f8b5"),
 wine: photo("photo-1510812431401-41d2bd2722f3"), dessert: photo("photo-1488477181946-6428a0291777"),
};
const gallery = [
 { src: images.room, title: "Uma atmosfera intimista" }, { src: images.dish, title: "Cores e sabores do Mediterrâneo" },
 { src: images.seafood, title: "Ingredientes em destaque" }, { src: images.pasta, title: "Clássicos à mesa" },
 { src: images.table, title: "Detalhes que fazem diferença" }, { src: images.wine, title: "Para acompanhar a experiência" },
];
const nav = [["Início", "#inicio"], ["A experiência", "#sobre"], ["Menu", "#menu"], ["Galeria", "#galeria"], ["Localização", "#localizacao"]] as const;

export const Route = createFileRoute("/")({
 head: () => ({ meta: [
  { title: "Roi Méditerranée | Restaurante Fine Dining na Rua Haddock Lobo, São Paulo" },
  { name: "description", content: "Descubra o Roi Méditerranée, restaurante de inspiração mediterrânea na Rua Haddock Lobo, 1626, Cerqueira César, São Paulo. Consulte o menu e fale pelo WhatsApp." },
  { name: "theme-color", content: "#17251f" },
  { property: "og:title", content: "Roi Méditerranée — Uma experiência à mesa" },
  { property: "og:description", content: "Uma experiência gastronômica de inspiração mediterrânea em Cerqueira César, São Paulo." },
  { property: "og:type", content: "website" }, { property: "og:image", content: images.hero },
 ], scripts: [{ type: "application/ld+json", children: JSON.stringify({
  "@context": "https://schema.org", "@type": "Restaurant", name: business.name, telephone: "+551140407622",
  servesCuisine: ["Mediterranean", "Contemporary"],
  address: { "@type": "PostalAddress", streetAddress: "Rua Haddock Lobo, 1626, 3° Andar - Cerqueira César", addressLocality: "São Paulo", addressRegion: "SP", postalCode: "01414-002", addressCountry: "BR" },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "19:00" }],
 }) }] }),
 component: Home,
});

function Home() {
 const [menuOpen, setMenuOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);
 const [progress, setProgress] = useState(0);
 const [selected, setSelected] = useState<number | null>(null);
 useEffect(() => {
  const update = () => { setScrolled(window.scrollY > 24); const max = document.documentElement.scrollHeight - window.innerHeight; setProgress(max > 0 ? window.scrollY / max * 100 : 0); };
  update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update);
 }, []);
 useEffect(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible")); return; }
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold: .1, rootMargin: "0px 0px -35px 0px" });
  elements.forEach(el => observer.observe(el));
  const hero = document.querySelector<HTMLElement>(".hero-photo"); let frame = 0;
  const parallax = () => { if (frame) return; frame = requestAnimationFrame(() => { frame = 0; if (hero) { const amount = Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight))); hero.style.transform = `translate3d(0, ${amount * 35}px, 0) scale(${1.04 + amount * .035})`; } }); };
  window.addEventListener("scroll", parallax, { passive: true });
  return () => { observer.disconnect(); window.removeEventListener("scroll", parallax); if (frame) cancelAnimationFrame(frame); if (hero) hero.style.transform = ""; };
 }, []);
 useEffect(() => {
  const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setSelected(null); setMenuOpen(false); } if (selected !== null && event.key === "ArrowRight") setSelected((selected + 1) % gallery.length); if (selected !== null && event.key === "ArrowLeft") setSelected((selected + gallery.length - 1) % gallery.length); };
  window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
 }, [selected]);
 useEffect(() => { if (selected === null) return; const old = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = old; }; }, [selected]);

 return <div className="roi-site">
  <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
  <header className={`site-header ${scrolled || menuOpen ? "is-scrolled" : ""}`}>
   <div className="roi-container header-inner">
    <a href="#inicio" className="roi-brand" aria-label="Roi Méditerranée — início" onClick={() => setMenuOpen(false)}><span className="brand-mark" aria-hidden="true">R<span>·</span>M</span><span className="brand-name">ROI <small>MÉDITERRANÉE</small></span></a>
    <nav className="desktop-nav" aria-label="Navegação principal">{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}<a className="roi-button roi-button-gold nav-cta" href={wa("Olá! Gostaria de consultar o menu e verificar a disponibilidade para uma reserva no Roi Méditerranée.")} target="_blank" rel="noopener noreferrer">FALE CONOSCO <ArrowRight size={16} /></a></nav>
    <button className="menu-toggle" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
   </div>
   {menuOpen && <nav className="mobile-nav" aria-label="Menu mobile">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a href={wa()} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Consultar menu pelo WhatsApp</a></nav>}
  </header>
  <main>
   <section className="roi-hero" id="inicio">
    <img className="hero-photo" src={images.hero} alt="Ambiente de restaurante elegante, fotografia ilustrativa" fetchPriority="high" decoding="async" width="2000" height="1333" />
    <div className="hero-shade" /><div className="hero-orbit orbit-one" aria-hidden="true" /><div className="hero-orbit orbit-two" aria-hidden="true" />
    <div className="roi-container hero-content">
     <p className="roi-eyebrow hero-rise"><span /> COZINHA DE INSPIRAÇÃO MEDITERRÂNEA</p>
     <h1 className="hero-rise">O prazer de<br /><em>sentar à mesa.</em></h1>
     <p className="hero-lead hero-rise">Sabores que convidam a desacelerar. Descubra o Roi Méditerranée, na Rua Haddock Lobo, e transforme uma refeição em um momento para apreciar.</p>
     <div className="hero-actions hero-rise"><a className="roi-button roi-button-gold" href={wa("Olá! Gostaria de consultar o menu e fazer um pedido no Roi Méditerranée.")} target="_blank" rel="noopener noreferrer">FAZER PEDIDO AGORA <ArrowRight size={18} /></a><a className="hero-secondary" href="#sobre">CONHEÇA A EXPERIÊNCIA <ArrowDown size={16} /></a></div>
     <div className="hero-meta hero-rise"><span><MapPin size={15} /> CERQUEIRA CÉSAR · SÃO PAULO</span><i /><span><Sparkles size={15} /> UMA PAUSA PARA APRECIAR</span></div>
    </div>
    <span className="hero-side-note" aria-hidden="true">SABOR · TEMPO · ENCONTRO</span>
   </section>
   <section className="intro-ribbon" aria-label="Destaques"><div className="roi-container ribbon-grid"><div><UtensilsCrossed /><span><strong>GASTRONOMIA</strong><small>Inspiração mediterrânea</small></span></div><div><Wine /><span><strong>EXPERIÊNCIA</strong><small>Detalhes à mesa</small></span></div><div><Leaf /><span><strong>HARMONIA</strong><small>Sabores e ingredientes</small></span></div></div></section>
   <section className="roi-section about-section" id="sobre"><div className="roi-container about-layout">
    <div className="about-visual reveal"><img src={images.room} alt="Mesa posta em restaurante, fotografia ilustrativa" loading="lazy" decoding="async" width="1000" height="1200" /><div className="visual-frame" /><div className="round-seal"><span>UNE</span><b>SABOR<br />E CULTURA</b><span>À MESA</span></div><span className="image-caption">UMA EXPERIÊNCIA PARA SER SABOREADA</span></div>
    <div className="about-text reveal"><p className="roi-eyebrow"><span /> A FILOSOFIA ROI</p><h2>Mais do que uma refeição.<br /><em>Um momento seu.</em></h2><p>A cozinha mediterrânea inspira uma maneira especial de estar à mesa: ingredientes que ganham destaque, combinações equilibradas e o prazer de compartilhar bons momentos.</p><p>No Roi Méditerranée, a proposta desta apresentação é valorizar cada detalhe da experiência — do primeiro olhar ao último sabor — em um endereço no coração de Cerqueira César.</p><p>Quer conhecer as opções disponíveis ou planejar sua visita? Nossa equipe pode orientar você diretamente pelo WhatsApp.</p><a className="roi-text-link" href={wa("Olá! Gostaria de saber mais sobre a experiência do Roi Méditerranée.")} target="_blank" rel="noopener noreferrer">CONVERSE COM NOSSA EQUIPE <ArrowRight size={17} /></a></div>
   </div></section>
   <section className="quote-section"><div className="quote-decoration" aria-hidden="true">“</div><div className="roi-container quote-content reveal"><p className="roi-eyebrow"><span /> A ARTE DE RECEBER</p><h2>Boa comida aproxima.<br /><em>Memórias ficam.</em></h2><p>Reserve um tempo para apreciar, conversar e descobrir novos sabores.</p><a className="roi-button roi-button-outline" href={wa("Olá! Gostaria de consultar as opções e os horários do Roi Méditerranée.")} target="_blank" rel="noopener noreferrer">PLANEJAR MINHA VISITA <ArrowRight size={17} /></a></div></section>
   <section className="roi-section menu-section" id="menu"><div className="roi-container">
    <div className="section-heading reveal"><p className="roi-eyebrow"><span /> MENU & EXPERIÊNCIA</p><h2>Descubra o que<br /><em>desperta seus sentidos.</em></h2><p>Uma seleção de referências da cozinha mediterrânea. Consulte a equipe para conhecer o menu atual, os ingredientes, a disponibilidade e os valores.</p></div>
    <div className="menu-cards">
     <article className="menu-card reveal"><div className="menu-card-image"><img src={images.seafood} alt="Prato de peixe, imagem ilustrativa" loading="lazy" decoding="async" width="800" height="600" /><span>01</span></div><div className="menu-card-copy"><p className="menu-kicker">DO MAR</p><h3>Peixes & frutos do mar</h3><p>Preparações inspiradas no litoral mediterrâneo, com atenção ao frescor e à delicadeza dos sabores.</p><a href={wa("Olá! Gostaria de consultar as opções de peixes e frutos do mar do menu atual.")} target="_blank" rel="noopener noreferrer">CONSULTAR OPÇÕES <ArrowRight size={15} /></a></div></article>
     <article className="menu-card reveal"><div className="menu-card-image"><img src={images.pasta} alt="Massa preparada com ingredientes frescos, imagem ilustrativa" loading="lazy" decoding="async" width="800" height="600" /><span>02</span></div><div className="menu-card-copy"><p className="menu-kicker">DA TRADIÇÃO</p><h3>Massas & clássicos</h3><p>Receitas reconfortantes e combinações que celebram a simplicidade dos bons ingredientes.</p><a href={wa("Olá! Gostaria de consultar as opções de massas e pratos clássicos do menu atual.")} target="_blank" rel="noopener noreferrer">CONSULTAR OPÇÕES <ArrowRight size={15} /></a></div></article>
     <article className="menu-card reveal"><div className="menu-card-image"><img src={images.dessert} alt="Sobremesa delicada, imagem ilustrativa" loading="lazy" decoding="async" width="800" height="600" /><span>03</span></div><div className="menu-card-copy"><p className="menu-kicker">PARA FINALIZAR</p><h3>Sobremesas & doces</h3><p>Um encerramento especial para prolongar a experiência e tornar a ocasião ainda mais marcante.</p><a href={wa("Olá! Gostaria de consultar as sobremesas disponíveis no Roi Méditerranée.")} target="_blank" rel="noopener noreferrer">CONSULTAR OPÇÕES <ArrowRight size={15} /></a></div></article>
    </div>
    <div className="menu-note reveal"><Sparkles size={18} /><p><strong>Menu, preços e disponibilidade</strong><br />As imagens são referências ilustrativas e não representam necessariamente os pratos servidos. Consulte a equipe para confirmar o menu e os valores atuais.</p><a className="roi-button roi-button-dark" href={wa("Olá! Poderiam me enviar o menu atual e os valores, por favor?")} target="_blank" rel="noopener noreferrer">PEDIR MENU PELO WHATSAPP <ArrowRight size={16} /></a></div>
   </div></section>
   <section className="gallery-section" id="galeria"><div className="roi-container"><div className="section-heading gallery-heading reveal"><p className="roi-eyebrow"><span /> UM OLHAR SOBRE A EXPERIÊNCIA</p><h2>Detalhes que contam<br /><em>uma história.</em></h2><p>Ambiente, ingredientes e momentos à mesa em uma galeria de inspiração visual.</p></div>
    <div className="roi-gallery">{gallery.map((item, index) => <button className={`roi-gallery-item gallery-${index} reveal`} key={item.title} onClick={() => setSelected(index)} aria-label={`Ampliar imagem: ${item.title}`}><img src={item.src} alt={item.title + " — fotografia ilustrativa"} loading="lazy" decoding="async" width="900" height="900" /><span>{item.title}<ArrowRight size={17} /></span></button>)}</div><p className="gallery-disclaimer">Fotografias ilustrativas de referência; consulte os canais oficiais para informações sobre o ambiente e os pratos atuais.</p>
   </div></section>
   <section className="reservation-band"><div className="roi-container reservation-inner reveal"><div><p className="roi-eyebrow"><span /> SUA PRÓXIMA EXPERIÊNCIA</p><h2>A mesa está à sua espera.</h2><p>Fale com nossa equipe para consultar o menu, tirar dúvidas ou verificar a melhor forma de planejar sua visita.</p></div><a className="roi-button roi-button-gold" href={wa("Olá! Gostaria de verificar a disponibilidade e as informações para visitar o Roi Méditerranée.")} target="_blank" rel="noopener noreferrer"><CalendarDays size={18} /> CONSULTAR PELO WHATSAPP <ArrowRight size={17} /></a></div></section>
   <section className="roi-section location-section" id="localizacao"><div className="roi-container location-layout"><div className="location-copy reveal"><p className="roi-eyebrow"><span /> VISITE O ROI</p><h2>No coração de<br /><em>Cerqueira César.</em></h2><p>Estamos na Rua Haddock Lobo, em uma das regiões mais conhecidas de São Paulo. Consulte a localização no mapa e fale com a equipe antes da visita, se precisar de informações adicionais.</p>
    <div className="location-detail"><MapPin /><div><strong>ENDEREÇO</strong><p>{business.address}</p></div></div><div className="location-detail"><Clock3 /><div><strong>HORÁRIO INFORMADO</strong><p>{business.hours}</p></div></div><div className="location-detail"><MessageCircle /><div><strong>WHATSAPP / TELEFONE</strong><p>{business.phone}</p></div></div>
    <div className="location-actions"><a className="roi-button roi-button-gold" href={wa()} target="_blank" rel="noopener noreferrer">FALE CONOSCO <ArrowRight size={17} /></a><a className="roi-text-link" href={mapUrl} target="_blank" rel="noopener noreferrer">ABRIR MAPA <ExternalLink size={15} /></a></div>
   </div><div className="map-frame reveal"><iframe title="Mapa da localização do Roi Méditerranée na Rua Haddock Lobo, 1626, São Paulo" src={mapEmbed} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" /></div></div></section>
   <section className="final-cta"><div className="final-cta-image" /><div className="roi-container final-cta-content reveal"><p className="roi-eyebrow"><span /> ROI MÉDITERRANÉE</p><h2>Seu próximo momento<br /><em>começa à mesa.</em></h2><p>Entre em contato e descubra os detalhes da sua próxima visita.</p><a className="roi-button roi-button-gold" href={wa("Olá! Gostaria de consultar o menu e fazer um pedido no Roi Méditerranée.")} target="_blank" rel="noopener noreferrer">FAZER PEDIDO AGORA <ArrowRight size={18} /></a></div></section>
  </main>
  <footer className="roi-footer" id="contato"><div className="roi-container footer-main">
   <div className="footer-identity"><a href="#inicio" className="roi-brand"><span className="brand-mark">R<span>·</span>M</span><span className="brand-name">ROI <small>MÉDITERRANÉE</small></span></a><p>Uma experiência de inspiração mediterrânea em São Paulo.</p><a className="roi-button roi-button-gold" href={wa()} target="_blank" rel="noopener noreferrer">FAZER PEDIDO AGORA <ArrowRight size={16} /></a></div>
   <nav aria-label="Links rápidos"><strong>EXPLORE</strong>{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
   <div className="footer-contact"><strong>CONTATO & VISITA</strong><p>{business.address}</p><p>{business.hours}</p><a href={wa()} target="_blank" rel="noopener noreferrer">{business.phone}</a><a href={mapUrl} target="_blank" rel="noopener noreferrer">Ver no Google Maps <ExternalLink size={14} /></a></div>
  </div><div className="roi-container footer-bottom"><span>© {new Date().getFullYear()} Roi Méditerranée. Todos os direitos reservados.</span><a href="#inicio">VOLTAR AO TOPO ↑</a></div></footer>
  <a className="roi-floating-wa" href={wa()} target="_blank" rel="noopener noreferrer" aria-label="Falar com o Roi Méditerranée pelo WhatsApp"><MessageCircle size={25} /><span>FALE CONOSCO</span></a>
  {selected !== null && <div className="roi-lightbox" role="dialog" aria-modal="true" aria-label={`Imagem ampliada: ${gallery[selected].title}`} onClick={() => setSelected(null)}><button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Fechar imagem"><X size={24} /></button><button className="lightbox-prev" onClick={event => { event.stopPropagation(); setSelected((selected + gallery.length - 1) % gallery.length); }} aria-label="Imagem anterior">‹</button><img src={gallery[selected].src} alt={gallery[selected].title + " — fotografia ilustrativa ampliada"} onClick={event => event.stopPropagation()} /><button className="lightbox-next" onClick={event => { event.stopPropagation(); setSelected((selected + 1) % gallery.length); }} aria-label="Próxima imagem">›</button></div>}
 </div>;
}
