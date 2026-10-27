import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Clock3, MapPin, Menu, MessageCircle, X, PawPrint } from "lucide-react";

const business = {
 name:"Pet Shop André",
 address:"R. André de Almeida, 1321 - Cidade São Mateus, São Paulo - SP, 03953-085, Brasil",
 phone:"(11) 97951-3551",
 whatsapp:"5511979513551",
 hours:"Seg a Sáb, 9h às 19h",
};
const wa=(message="Olá! Conheci o Pet Shop André pelo site e gostaria de consultar produtos e serviços disponíveis.")=>`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
const maps=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;
const embed=`https://www.google.com/maps?q=${encodeURIComponent(business.address)}&z=17&output=embed`;
const photo=(id:string,width=1200)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const images={
 hero:photo("photo-1517849845537-4d257902454a",1800),
 interior:photo("photo-1601758228041-f3b2795255f1"),
 barber:photo("photo-1516734212186-a967f81ad0d7"),
 cut:photo("photo-1587300003388-59208cc962cb"),
 tools:photo("photo-1589924691995-400dc9ecc119"),
 beard:photo("photo-1548199973-03cce0bbc87b"),
 detail:photo("photo-1517849845537-4d257902454a"),
};
const nav=[["Início","#inicio"],["Sobre","#sobre"],["Galeria","#galeria"],["Localização","#localizacao"],["Contato","#contato"]] as const;
export const Route=createFileRoute("/")({
 head:()=>({
  meta:[
   {title:"Pet Shop André | Pet Shop na Rua André de Almeida, São Mateus - SP"},
   {name:"description",content:"Pet Shop André na R. André de Almeida, 1321, Cidade São Mateus, São Paulo - SP, 03953-085. Consulte produtos e serviços pelo WhatsApp (11) 97951-3551."},
   {property:"og:title",content:"Pet Shop André | Tudo começa com carinho por quem faz parte da família"},
   {property:"og:description",content:"Encontre o Pet Shop André em Cidade São Mateus e fale diretamente pelo WhatsApp."},
   {property:"og:type",content:"website"},
   {property:"og:image",content:images.hero},
  ],
  scripts:[{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"PetStore",name:business.name,address:{"@type":"PostalAddress",streetAddress:"R. André de Almeida, 1321 - Cidade São Mateus",addressLocality:"São Paulo",addressRegion:"SP",postalCode:"03953-085",addressCountry:"BR"},telephone:"+5511979513551",openingHoursSpecification:[{"@type":"OpeningHoursSpecification",dayOfWeek:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],opens:"09:00",closes:"19:00"}]})}],
 }),
 component:Home,
});
function Home(){
 const [menu,setMenu]=useState(false);
 const [scrolled,setScrolled]=useState(false);
 const [progress,setProgress]=useState(0);
 const [gallery,setGallery]=useState<string|null>(null);
 useEffect(()=>{
  const update=()=>{setScrolled(window.scrollY>24);const d=document.documentElement.scrollHeight-window.innerHeight;setProgress(d>0?window.scrollY/d*100:0)};
  update();window.addEventListener("scroll",update,{passive:true});return()=>window.removeEventListener("scroll",update);
 },[]);
 useEffect(()=>{const fn=(e:KeyboardEvent)=>{if(e.key==="Escape"){setGallery(null);setMenu(false)}};window.addEventListener("keydown",fn);return()=>window.removeEventListener("keydown",fn)},[]);
 useEffect(()=>{
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const els=Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
  const obs=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target as HTMLElement;el.classList.add("is-visible");obs.unobserve(el)}),{threshold:.1,rootMargin:"0px 0px -40px 0px"});
  els.forEach(el=>obs.observe(el));
  const hero=document.querySelector<HTMLElement>(".hero-photo");
  let frame=0;
  const move=()=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;if(hero){const p=Math.min(1,Math.max(0,window.scrollY/window.innerHeight));hero.style.transform=`translate3d(0,${p*65}px,0) scale(${1.08+p*.09})`}})};
  window.addEventListener("scroll",move,{passive:true});move();
  return()=>{obs.disconnect();window.removeEventListener("scroll",move);if(frame)cancelAnimationFrame(frame);if(hero)hero.style.transform=""};
 },[]);
 const galleryItems=[
  {src:images.interior,label:"Carinho com os pets"},
  {src:images.barber,label:"Cuidado com animais"},
  {src:images.cut,label:"Cachorro em destaque"},
  {src:images.tools,label:"Alimentação pet"},
  {src:images.beard,label:"Passeio com pets"},
  {src:images.detail,label:"Companhia especial"},
 ];
 return <div className="site">
  <div className="scroll-progress" style={{width:`${progress}%`}} aria-hidden="true"/>
  <header className={`header ${scrolled||menu?"scrolled":""}`}>
   <div className="container header-inner">
    <a href="#inicio" className="brand" onClick={()=>setMenu(false)}><PawPrint size={25} strokeWidth={1.5}/><span>PET SHOP ANDRÉ <small>PET SHOP</small></span></a>
    <nav className="desktop-nav" aria-label="Navegação principal">{nav.map(([label,href])=><a key={href} href={href}>{label}</a>)}<a className="pill pill-bronze" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora <ArrowRight size={16}/></a></nav>
    <button className="mobile-toggle" onClick={()=>setMenu(!menu)} aria-label={menu?"Fechar menu":"Abrir menu"} aria-expanded={menu}>{menu?<X/>:<Menu/>}</button>
   </div>
   {menu&&<nav className="mobile-nav" aria-label="Menu mobile">{nav.map(([label,href])=><a key={href} href={href} onClick={()=>setMenu(false)}>{label}</a>)}<a href={wa()} target="_blank" rel="noopener noreferrer" onClick={()=>setMenu(false)}>Fazer pedido agora</a></nav>}
  </header>
  <main>
   <section className="hero" id="inicio">
    <img className="hero-photo" src={images.hero} alt="Fotografia editorial ilustrativa de cachorro em ambiente acolhedor" fetchPriority="high" width="1800" height="1200"/>
    <div className="hero-shade"/><div className="hero-line" aria-hidden="true"/>
    <div className="container hero-content">
     <span className="eyebrow hero-rise">PET SHOP ANDRÉ · SÃO CAETANO DO SUL</span>
     <h1 className="hero-rise">Mais carinho para quem <em>faz parte da família.</em></h1>
     <p className="hero-sub hero-rise">Na Rua André de Almeida, em Cidade São Mateus. Consulte produtos e serviços para seu pet diretamente pelo WhatsApp.</p>
     <div className="hero-buttons hero-rise"><a className="pill pill-bronze" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora <ArrowRight size={19}/></a><a className="pill pill-outline" href="#sobre">Conhecer o Pet Shop André</a></div>
     <span className="hero-foot hero-rise">UM MUNDO DE CARINHO PARA SEU PET.</span>
    </div>
    <a href="#sobre" className="scroll-cue" aria-label="Rolar para conhecer a barbearia"><span/> DESCUBRA</a>
   </section>
   <section id="sobre" className="section about container">
    <div className="about-media reveal"><img src={images.interior} alt="Fotografia ilustrativa de pessoa com animal de estimação" loading="lazy" width="1000" height="1200"/><div className="about-seal"><PawPrint size={27}/><span>PET SHOP<br/>ANDRÉ</span></div></div>
    <div className="about-copy reveal"><span className="eyebrow">CONHEÇA O PET SHOP ANDRÉ</span><h2>O cuidado começa com <em>atenção.</em></h2><div className="accent-line"/><p>O Pet Shop André fica na Rua André de Almeida, 1321, em Cidade São Mateus, São Paulo — uma localização prática para quem procura um pet shop na região.</p><p>Quer saber quais produtos e serviços estão disponíveis? Entre em contato com a equipe pelo WhatsApp antes de visitar.</p><p>Encontre o endereço, o horário informado e o canal de atendimento em um só lugar, sem complicação.</p><a href={wa()} target="_blank" rel="noopener noreferrer" className="text-link">Consultar produtos e serviços <ArrowRight size={19}/></a></div>
   </section>
   <section className="statement"><div className="container reveal"><span className="eyebrow">PERTO DE VOCÊ EM CIDADE SÃO MATEUS</span><h2>O próximo cuidado com seu pet começa com uma <em>conversa.</em></h2><a className="pill pill-bronze" href={wa("Olá! Gostaria de consultar os produtos e serviços disponíveis no Pet Shop André.")} target="_blank" rel="noopener noreferrer">Fazer pedido agora <ArrowRight size={18}/></a></div></section>
   <section className="section gallery-section container" id="galeria"><div className="section-heading reveal"><span className="eyebrow">INSPIRAÇÃO VISUAL</span><h2>Cada pet merece <em>carinho.</em></h2><p>Fotografias editoriais ilustrativas do universo pet. As imagens não representam necessariamente o espaço, os produtos ou os serviços reais do Pet Shop André.</p></div><div className="gallery-grid">{galleryItems.map((item,i)=><button key={item.label} className={`gallery-item gallery-item-${i} reveal`} onClick={()=>setGallery(item.src)} aria-label={`Ampliar fotografia: ${item.label}`}><img src={item.src} alt={item.label+" — imagem ilustrativa"} loading="lazy" width="1000" height="1000"/><span>{item.label}<ArrowRight size={18}/></span></button>)}</div></section>
   <section id="localizacao" className="section location-section"><div className="container"><div className="section-heading reveal"><span className="eyebrow">ENCONTRE A PET SHOP ANDRÉ</span><h2>Estamos em <em>Cidade São Mateus.</em></h2><p>{business.address}</p></div><div className="map-frame reveal"><iframe title="Mapa do Pet Shop André — Rua André de Almeida, 1321, Cidade São Mateus, São Paulo" src={embed} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"/></div><a href={maps} target="_blank" rel="noopener noreferrer" className="pill pill-dark reveal"><MapPin size={18}/> Abrir no Google Maps <ArrowRight size={17}/></a></div></section>
   <section id="contato" className="section contact-section"><div className="container contact-grid"><div className="reveal"><span className="eyebrow">CONTATO DIRETO</span><h2>Vamos cuidar do seu <em>companheiro?</em></h2><p>Converse com a equipe para confirmar produtos, serviços e disponibilidade.</p><div className="contact-detail"><MapPin size={23}/><div><strong>Endereço</strong><p>{business.address}</p></div></div><div className="contact-detail"><Clock3 size={23}/><div><strong>Horário informado</strong><p>{business.hours}</p></div></div><div className="contact-detail"><MessageCircle size={23}/><div><strong>Telefone / WhatsApp</strong><p><a href={wa()} target="_blank" rel="noopener noreferrer">{business.phone}</a></p></div></div><a href={wa()} className="pill pill-bronze" target="_blank" rel="noopener noreferrer">Fazer pedido agora <ArrowRight size={18}/></a></div><div className="contact-image reveal"><img src={images.interior} alt="Imagem editorial ilustrativa do universo pet" loading="lazy" width="900" height="1100"/><div>PET SHOP ANDRÉ <span>PET SHOP</span></div></div></div></section>
  </main>
  <footer><div className="container footer-grid"><div><a className="footer-brand" href="#inicio"><PawPrint size={27}/> PET SHOP ANDRÉ <span>PET SHOP</span></a><p>Mais carinho para quem faz parte da família.</p><a className="pill pill-bronze" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora <ArrowRight size={17}/></a></div><nav aria-label="Links do rodapé">{nav.map(([label,href])=><a href={href} key={href}>{label}</a>)}</nav><div><strong>Encontre-nos</strong><p>{business.address}</p><p>{business.hours}</p><a href={wa()} target="_blank" rel="noopener noreferrer">{business.phone}</a></div></div><div className="container copyright">© {new Date().getFullYear()} Pet Shop André. Todos os direitos reservados.</div></footer>
  <a className="floating-wa" href={wa()} target="_blank" rel="noopener noreferrer" aria-label="Fale com o Pet Shop André pelo WhatsApp"><MessageCircle size={27}/><span>Fale conosco</span></a>
  {gallery&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Fotografia ampliada" onClick={()=>setGallery(null)}><button onClick={()=>setGallery(null)} aria-label="Fechar fotografia"><X size={25}/></button><img src={gallery} alt="Fotografia editorial ilustrativa ampliada" onClick={e=>e.stopPropagation()}/></div>}
 </div>;
}
