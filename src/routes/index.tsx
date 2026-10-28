import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Clock3, MapPin, Menu, MessageCircle, X, Navigation, MoveUpRight } from "lucide-react";

const studio = {
 name: "SHIMADA TATTOO STUDIO",
 address: "R. Galvão Bueno, 28 - Sala 20 - Liberdade, São Paulo - SP, 01506-030, Brasil",
 phone: "(11) 94254-3444",
 whatsapp: "5511942543444",
 hours: "Seg a Sáb, 9h às 19h",
};
const whatsapp = (message = "Olá! Conheci o SHIMADA TATTOO STUDIO pelo site e gostaria de agendar minha tatuagem. Podemos conversar sobre minha ideia?") => `https://wa.me/${studio.whatsapp}?text=${encodeURIComponent(message)}`;
const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studio.address)}`;
const embed = `https://www.google.com/maps?q=${encodeURIComponent(studio.address)}&z=17&output=embed`;
const photo = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82`;
const images = {
 hero: photo("photo-1598371839696-5c5bb00bdc28", 1920),
 about: photo("photo-1565058379802-bbe93b2f703a"),
 tattoo1: photo("photo-1542727365-19732a80dcfd"),
 tattoo2: photo("photo-1590246815117-cf3c4e0f33b9"),
 tattoo3: photo("photo-1598371839696-5c5bb00bdc28"),
 tattoo4: photo("photo-1565058379802-bbe93b2f703a"),
 tattoo5: photo("photo-1611501275019-9b5cda994e8d"),
 tattoo6: photo("photo-1542727365-19732a80dcfd"),
};
const nav = [["Início","#inicio"],["Estúdio","#sobre"],["Inspiração","#galeria"],["Localização","#localizacao"],["Contato","#contato"]] as const;
export const Route = createFileRoute("/")({
 head: () => ({
  meta: [
   { title: "SHIMADA TATTOO STUDIO | Estúdio de Tatuagem na Liberdade, São Paulo" },
   { name: "description", content: "SHIMADA TATTOO STUDIO: estúdio de tatuagem na R. Galvão Bueno, 28, Sala 20, Liberdade, São Paulo - SP. Agende sua conversa pelo WhatsApp (11) 94254-3444." },
   { property: "og:title", content: "SHIMADA TATTOO STUDIO | Sua ideia merece marcar presença" },
   { property: "og:description", content: "Converse sobre sua próxima tatuagem. Rua Galvão Bueno, 28, Sala 20, Liberdade, São Paulo." },
   { property: "og:type", content: "website" },
   { property: "og:image", content: images.hero },
  ],
  scripts: [{ type: "application/ld+json", children: JSON.stringify({
   "@context": "https://schema.org", "@type": "TattooParlor", name: studio.name,
   address: { "@type": "PostalAddress", streetAddress: "R. Galvão Bueno, 28 - Sala 20 - Liberdade", addressLocality: "São Paulo", addressRegion: "SP", postalCode: "01506-030", addressCountry: "BR" },
   telephone: "+5511942543444",
   openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "09:00", closes: "19:00" }],
  }) }],
 }),
 component: Home,
});
function Home() {
 const [menu,setMenu] = useState(false);
 const [scrolled,setScrolled] = useState(false);
 const [progress,setProgress] = useState(0);
 const [selected,setSelected] = useState<{src:string;label:string}|null>(null);
 useEffect(() => {
  const update = () => { setScrolled(window.scrollY > 24); const max = document.documentElement.scrollHeight - window.innerHeight; setProgress(max > 0 ? 100 * window.scrollY / max : 0); };
  update(); window.addEventListener("scroll",update,{passive:true}); return () => window.removeEventListener("scroll",update);
 },[]);
 useEffect(() => {
  const onKey = (event:KeyboardEvent) => { if(event.key === "Escape") { setSelected(null); setMenu(false); } };
  window.addEventListener("keydown",onKey); return () => window.removeEventListener("keydown",onKey);
 },[]);
 useEffect(() => {
  if(!selected) return;
  const old = document.body.style.overflow; document.body.style.overflow = "hidden";
  return () => { document.body.style.overflow = old; };
 },[selected]);
 useEffect(() => {
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), {threshold:0.1,rootMargin:"0px 0px -30px 0px"});
  elements.forEach(el => observer.observe(el));
  const hero = document.querySelector<HTMLElement>(".hero-image");
  let frame = 0;
  const move = () => { if(frame) return; frame = requestAnimationFrame(() => { frame = 0; if(hero) { const p = Math.min(1,Math.max(0,window.scrollY/window.innerHeight)); hero.style.transform = `translate3d(0,${p*65}px,0) scale(${1.06+p*.08})`; } }); };
  window.addEventListener("scroll",move,{passive:true}); move();
  return () => { observer.disconnect(); window.removeEventListener("scroll",move); if(frame) cancelAnimationFrame(frame); if(hero) hero.style.transform = ""; };
 },[]);
 const gallery = [
  {src:images.tattoo1,label:"Arte em tinta"},
  {src:images.tattoo2,label:"Expressão pessoal"},
  {src:images.tattoo3,label:"Detalhes da tatuagem"},
  {src:images.tattoo4,label:"Processo criativo"},
  {src:images.tattoo5,label:"Inspiração visual"},
  {src:images.tattoo6,label:"Arte na pele"},
 ];
 return <div className="site">
  <div className="progress" style={{width:`${progress}%`}} aria-hidden="true"/>
  <header className={`header ${scrolled || menu ? "scrolled" : ""}`}>
   <div className="container header-inner">
    <a href="#inicio" className="brand" onClick={()=>setMenu(false)} aria-label="SHIMADA TATTOO STUDIO — início"><span className="brand-mark">S<span>.</span></span><span>SHIMADA <small>TATTOO STUDIO</small></span></a>
    <nav className="desktop-nav" aria-label="Navegação principal">{nav.map(([label,href])=><a key={href} href={href}>{label}</a>)}<a className="button button-light header-cta" href={whatsapp()} target="_blank" rel="noopener noreferrer">AGENDAR MINHA TATUAGEM <ArrowRight size={16}/></a></nav>
    <button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-label={menu?"Fechar menu":"Abrir menu"} aria-expanded={menu}>{menu?<X/>:<Menu/>}</button>
   </div>
   {menu && <nav className="mobile-nav" aria-label="Menu mobile">{nav.map(([label,href])=><a key={href} href={href} onClick={()=>setMenu(false)}>{label}</a>)}<a href={whatsapp()} target="_blank" rel="noopener noreferrer" onClick={()=>setMenu(false)}>Agendar minha tatuagem</a></nav>}
  </header>
  <main>
   <section className="hero" id="inicio">
    <img className="hero-image" src={images.hero} alt="Fotografia editorial ilustrativa de tatuagem artística em preto e cinza" fetchPriority="high" decoding="async" width="1920" height="1280"/>
    <div className="hero-shade"/><div className="hero-outline" aria-hidden="true">SHIMADA</div>
    <div className="container hero-content">
     <p className="eyebrow hero-rise"><span className="eyebrow-rule"/> LIBERDADE · SÃO PAULO</p>
     <h1 className="hero-rise">SUA IDEIA.<br/><em>SUA MARCA.</em><br/>SUA HISTÓRIA.</h1>
     <p className="hero-description hero-rise">Uma tatuagem começa com uma boa conversa. Apresente sua ideia ao SHIMADA TATTOO STUDIO, na Rua Galvão Bueno, e consulte as possibilidades pelo WhatsApp.</p>
     <div className="hero-actions hero-rise"><a className="button button-light" href={whatsapp()} target="_blank" rel="noopener noreferrer">AGENDAR MINHA TATUAGEM <ArrowRight size={19}/></a><a className="button button-outline" href="#galeria">EXPLORAR INSPIRAÇÕES <MoveUpRight size={18}/></a></div>
     <p className="hero-caption hero-rise">ARTE QUE FAZ PARTE DE VOCÊ.</p>
    </div>
    <a href="#sobre" className="scroll-cue" aria-label="Rolar para conhecer o estúdio"><span/> DESLIZE PARA EXPLORAR</a>
   </section>
   <section className="intro-strip" aria-label="Informações rápidas"><div className="container intro-grid">
    <div><MapPin size={22}/><span><strong>NO CORAÇÃO DA LIBERDADE</strong><small>Rua Galvão Bueno, 28 · Sala 20</small></span></div>
    <div><Clock3 size={22}/><span><strong>HORÁRIO INFORMADO</strong><small>Seg a Sáb · 9h às 19h</small></span></div>
    <div><MessageCircle size={22}/><span><strong>CONVERSA DIRETA</strong><small>Conte sua ideia pelo WhatsApp</small></span></div>
   </div></section>
   <section className="section about" id="sobre"><div className="container about-grid">
    <div className="about-photo reveal"><img src={images.about} alt="Fotografia editorial ilustrativa do processo de tatuagem" loading="lazy" decoding="async" width="1000" height="1250"/><div className="photo-border"/><span className="photo-index">01 / O ESTÚDIO</span></div>
    <div className="about-copy reveal"><p className="eyebrow"><span className="eyebrow-rule"/> CONHEÇA O SHIMADA</p><h2>ARTE QUE COMEÇA COM <em>UMA CONVERSA.</em></h2><p>O SHIMADA TATTOO STUDIO está na Rua Galvão Bueno, 28, Sala 20, no bairro da Liberdade, em São Paulo. Um endereço para quem procura um estúdio de tatuagem na região.</p><p>Uma ideia pessoal merece ser explicada com calma. Entre em contato para conversar sobre sua referência, tirar dúvidas e consultar as informações de atendimento.</p><p>Encontre aqui o caminho para chegar, o horário informado e o WhatsApp para dar o primeiro passo.</p><a className="text-link" href={whatsapp()} target="_blank" rel="noopener noreferrer">CONVERSAR SOBRE MINHA IDEIA <ArrowRight size={19}/></a></div>
   </div></section>
   <section className="manifesto"><div className="container manifesto-inner reveal"><p className="eyebrow"><span className="eyebrow-rule"/> SUA PRÓXIMA IDEIA</p><h2>NÃO É SÓ TINTA.<br/><em>É EXPRESSÃO.</em></h2><p>Compartilhe sua inspiração e comece uma conversa sobre sua próxima tatuagem.</p><a className="button button-dark" href={whatsapp()} target="_blank" rel="noopener noreferrer">AGENDAR MINHA TATUAGEM <ArrowRight size={18}/></a></div></section>
   <section className="section gallery-section" id="galeria"><div className="container">
    <div className="section-heading reveal"><p className="eyebrow"><span className="eyebrow-rule"/> GALERIA DE INSPIRAÇÃO</p><h2>IDEIAS QUE <em>GANHAM FORMA.</em></h2><p>Fotografias editoriais ilustrativas do universo da tatuagem. As imagens não são apresentadas como trabalhos ou fotografias oficiais do SHIMADA TATTOO STUDIO.</p></div>
    <div className="gallery-grid">{gallery.map((item,i)=><button key={item.label} className={`gallery-item gallery-item-${i} reveal`} onClick={()=>setSelected(item)} aria-label={`Ampliar imagem: ${item.label}`}><img src={item.src} alt={item.label+" — fotografia editorial ilustrativa"} loading="lazy" decoding="async" width="1000" height="1000"/><span>{item.label}<MoveUpRight size={20}/></span></button>)}</div>
    <div className="gallery-bottom reveal"><span>JÁ TEM UMA REFERÊNCIA EM MENTE?</span><a className="text-link" href={whatsapp("Olá! Tenho uma referência para minha próxima tatuagem e gostaria de conversar com o SHIMADA TATTOO STUDIO.")} target="_blank" rel="noopener noreferrer">ENVIAR MINHA IDEIA <ArrowRight size={19}/></a></div>
   </div></section>
   <section className="banner"><div className="banner-image" style={{backgroundImage:`linear-gradient(90deg,#0f0f10f2,#0f0f10a8),url("${images.tattoo3}")`}}/><div className="container banner-content reveal"><p className="eyebrow"><span className="eyebrow-rule"/> PRÓXIMO PASSO</p><h2>PRONTO PARA DEIXAR <em>SUA MARCA?</em></h2><p>Entre em contato diretamente com o estúdio para conversar sobre sua ideia.</p><a className="button button-light" href={whatsapp()} target="_blank" rel="noopener noreferrer">AGENDAR MINHA TATUAGEM <ArrowRight size={19}/></a></div></section>
   <section className="section location" id="localizacao"><div className="container">
    <div className="section-heading reveal"><p className="eyebrow"><span className="eyebrow-rule"/> ONDE ESTAMOS</p><h2>ENCONTRE O SHIMADA <em>NA LIBERDADE.</em></h2><p>{studio.address}</p></div>
    <div className="map reveal"><iframe title="Mapa do SHIMADA TATTOO STUDIO na Rua Galvão Bueno, 28, Sala 20, Liberdade, São Paulo" src={embed} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"/></div>
    <a className="button button-outline reveal" href={maps} target="_blank" rel="noopener noreferrer"><Navigation size={18}/> ABRIR NO GOOGLE MAPS <ArrowRight size={17}/></a>
   </div></section>
   <section className="section contact" id="contato"><div className="container contact-grid">
    <div className="reveal"><p className="eyebrow"><span className="eyebrow-rule"/> VAMOS CONVERSAR?</p><h2>SUA PRÓXIMA TATUAGEM <em>COMEÇA AQUI.</em></h2><p>Conte sua ideia e consulte o atendimento diretamente pelo WhatsApp.</p>
     <div className="contact-item"><MapPin/><div><strong>ENDEREÇO</strong><p>{studio.address}</p></div></div>
     <div className="contact-item"><Clock3/><div><strong>HORÁRIO INFORMADO</strong><p>{studio.hours}</p></div></div>
     <div className="contact-item"><MessageCircle/><div><strong>TELEFONE / WHATSAPP</strong><p><a href={whatsapp()} target="_blank" rel="noopener noreferrer">{studio.phone}</a></p></div></div>
     <a className="button button-light" href={whatsapp()} target="_blank" rel="noopener noreferrer">AGENDAR MINHA TATUAGEM <ArrowRight size={18}/></a>
    </div><div className="contact-visual reveal"><img src={images.tattoo4} alt="Fotografia editorial ilustrativa de arte e tatuagem" loading="lazy" decoding="async" width="900" height="1100"/><span>MAKE IT<br/>PERSONAL.</span></div>
   </div></section>
  </main>
  <footer><div className="container footer-grid">
   <div><a className="footer-brand" href="#inicio"><span>S.</span> SHIMADA <small>TATTOO STUDIO</small></a><p>Sua ideia. Sua marca. Sua história.</p><a className="button button-light" href={whatsapp()} target="_blank" rel="noopener noreferrer">AGENDAR MINHA TATUAGEM <ArrowRight size={17}/></a></div>
   <nav aria-label="Links rápidos">{nav.map(([label,href])=><a key={href} href={href}>{label}</a>)}</nav>
   <div><strong>VISITE O ESTÚDIO</strong><p>{studio.address}</p><p>{studio.hours}</p><a href={whatsapp()} target="_blank" rel="noopener noreferrer">{studio.phone}</a></div>
  </div><div className="container copyright">© {new Date().getFullYear()} SHIMADA TATTOO STUDIO. Todos os direitos reservados.</div></footer>
  <a className="floating-wa" href={whatsapp()} target="_blank" rel="noopener noreferrer" aria-label="Agendar minha tatuagem pelo WhatsApp"><MessageCircle size={27}/><span>AGENDE PELO WHATSAPP</span></a>
  {selected && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Imagem ampliada: ${selected.label}`} onClick={()=>setSelected(null)}><button onClick={()=>setSelected(null)} aria-label="Fechar imagem"><X size={24}/></button><img src={selected.src} alt={selected.label+" — fotografia editorial ilustrativa ampliada"} onClick={event=>event.stopPropagation()}/></div>}
 </div>;
}
