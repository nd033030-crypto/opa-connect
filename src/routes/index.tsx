import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Clock3, MapPin, Menu, MessageCircle, X, Scissors, Instagram } from "lucide-react";

const business = {
 name:"Brutus Barbearia",
 address:"Av. Goiás, 440 - Santo Antônio, São Caetano do Sul - SP, 09521-300, Brasil",
 phone:"(11) 2311-5681",
 whatsapp:"551123115681",
 hours:"Seg a Sáb, 9h às 19h",
};
const wa=(message="Olá! Conheci a Brutus Barbearia pelo site e gostaria de consultar os horários disponíveis.")=>`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
const maps=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;
const embed=`https://www.google.com/maps?q=${encodeURIComponent(business.address)}&z=17&output=embed`;
const photo=(id:string,width=1200)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const images={
 hero:photo("photo-1503951914875-452162b0f3f1",1800),
 interior:photo("photo-1521590832167-7bcbfaa6381f"),
 barber:photo("photo-1599351431202-1e0f0137899a"),
 cut:photo("photo-1621605815971-fbc98d665033"),
 tools:photo("photo-1593702295094-aea22597af65"),
 beard:photo("photo-1596728325488-58c87691e9af"),
 detail:photo("photo-1503951914875-452162b0f3f1"),
};
const nav=[["Início","#inicio"],["Sobre","#sobre"],["Galeria","#galeria"],["Localização","#localizacao"],["Contato","#contato"]] as const;
export const Route=createFileRoute("/")({
 head:()=>({
  meta:[
   {title:"Brutus Barbearia | Barbeiro Especializado na Av. Goiás, São Caetano do Sul"},
   {name:"description",content:"Brutus Barbearia na Av. Goiás, 440, Santo Antônio, São Caetano do Sul - SP. Consulte horários pelo WhatsApp (11) 2311-5681."},
   {property:"og:title",content:"Brutus Barbearia | Seu estilo merece atenção aos detalhes"},
   {property:"og:description",content:"Conheça a Brutus Barbearia em São Caetano do Sul e fale diretamente pelo WhatsApp."},
   {property:"og:type",content:"website"},
   {property:"og:image",content:images.hero},
  ],
  scripts:[{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"BarberShop",name:business.name,address:{"@type":"PostalAddress",streetAddress:"Av. Goiás, 440 - Santo Antônio",addressLocality:"São Caetano do Sul",addressRegion:"SP",postalCode:"09521-300",addressCountry:"BR"},telephone:"+551123115681",openingHoursSpecification:[{"@type":"OpeningHoursSpecification",dayOfWeek:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],opens:"09:00",closes:"19:00"}]})}],
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
  {src:images.interior,label:"Ambiente de barbearia"},
  {src:images.barber,label:"Trabalho de barbeiro"},
  {src:images.cut,label:"Corte masculino"},
  {src:images.tools,label:"Instrumentos de barbearia"},
  {src:images.beard,label:"Detalhes de barba"},
  {src:images.detail,label:"Atmosfera clássica de barbearia"},
 ];
 return <div className="site">
  <div className="scroll-progress" style={{width:`${progress}%`}} aria-hidden="true"/>
  <header className={`header ${scrolled||menu?"scrolled":""}`}>
   <div className="container header-inner">
    <a href="#inicio" className="brand" onClick={()=>setMenu(false)}><Scissors size={25} strokeWidth={1.5}/><span>BRUTUS <small>BARBEARIA</small></span></a>
    <nav className="desktop-nav" aria-label="Navegação principal">{nav.map(([label,href])=><a key={href} href={href}>{label}</a>)}<a className="pill pill-bronze" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora <ArrowRight size={16}/></a></nav>
    <button className="mobile-toggle" onClick={()=>setMenu(!menu)} aria-label={menu?"Fechar menu":"Abrir menu"} aria-expanded={menu}>{menu?<X/>:<Menu/>}</button>
   </div>
   {menu&&<nav className="mobile-nav" aria-label="Menu mobile">{nav.map(([label,href])=><a key={href} href={href} onClick={()=>setMenu(false)}>{label}</a>)}<a href={wa()} target="_blank" rel="noopener noreferrer" onClick={()=>setMenu(false)}>Fazer pedido agora</a></nav>}
  </header>
  <main>
   <section className="hero" id="inicio">
    <img className="hero-photo" src={images.hero} alt="Imagem editorial ilustrativa do ambiente de uma barbearia clássica" fetchPriority="high" width="1800" height="1200"/>
    <div className="hero-shade"/><div className="hero-line" aria-hidden="true"/>
    <div className="container hero-content">
     <span className="eyebrow hero-rise">BRUTUS BARBEARIA · SÃO CAETANO DO SUL</span>
     <h1 className="hero-rise">Seu estilo merece <em>atenção aos detalhes.</em></h1>
     <p className="hero-sub hero-rise">Na Avenida Goiás, em Santo Antônio. Fale diretamente com a Brutus Barbearia e consulte o melhor horário para você.</p>
     <div className="hero-buttons hero-rise"><a className="pill pill-bronze" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora <ArrowRight size={19}/></a><a className="pill pill-outline" href="#sobre">Conhecer a Brutus</a></div>
     <span className="hero-foot hero-rise">ESTILO CLÁSSICO. PRESENÇA MARCANTE.</span>
    </div>
    <a href="#sobre" className="scroll-cue" aria-label="Rolar para conhecer a barbearia"><span/> DESCUBRA</a>
   </section>
   <section id="sobre" className="section about container">
    <div className="about-media reveal"><img src={images.barber} alt="Fotografia editorial ilustrativa de um barbeiro trabalhando" loading="lazy" width="1000" height="1200"/><div className="about-seal"><Scissors size={27}/><span>BRUTUS<br/>BARBEARIA</span></div></div>
    <div className="about-copy reveal"><span className="eyebrow">SOBRE A BRUTUS</span><h2>Uma boa escolha começa nos <em>detalhes.</em></h2><div className="accent-line"/><p>A Brutus Barbearia está na Avenida Goiás, 440, no bairro Santo Antônio, em São Caetano do Sul — uma localização para quem procura atendimento de barbearia na região.</p><p>Antes de visitar, você pode conversar diretamente pelo WhatsApp para tirar dúvidas sobre os serviços e consultar os horários disponíveis.</p><p>Encontre as informações essenciais em um só lugar e entre em contato sem complicação.</p><a href={wa()} target="_blank" rel="noopener noreferrer" className="text-link">Consultar disponibilidade <ArrowRight size={19}/></a></div>
   </section>
   <section className="statement"><div className="container reveal"><span className="eyebrow">A BRUTUS ESTÁ NA AVENIDA GOIÁS</span><h2>Seu próximo visual começa com uma <em>conversa.</em></h2><a className="pill pill-bronze" href={wa("Olá! Gostaria de saber mais sobre os serviços da Brutus Barbearia e consultar horários disponíveis.")} target="_blank" rel="noopener noreferrer">Fazer pedido agora <ArrowRight size={18}/></a></div></section>
   <section className="section gallery-section container" id="galeria"><div className="section-heading reveal"><span className="eyebrow">INSPIRAÇÃO VISUAL</span><h2>O clássico tem <em>personalidade.</em></h2><p>Fotografias editoriais ilustrativas do universo da barbearia. As imagens não representam necessariamente o espaço ou trabalhos reais da Brutus.</p></div><div className="gallery-grid">{galleryItems.map((item,i)=><button key={item.label} className={`gallery-item gallery-item-${i} reveal`} onClick={()=>setGallery(item.src)} aria-label={`Ampliar fotografia: ${item.label}`}><img src={item.src} alt={item.label+" — imagem ilustrativa"} loading="lazy" width="1000" height="1000"/><span>{item.label}<ArrowRight size={18}/></span></button>)}</div></section>
   <section id="localizacao" className="section location-section"><div className="container"><div className="section-heading reveal"><span className="eyebrow">ENCONTRE A BRUTUS</span><h2>Estamos na <em>Avenida Goiás.</em></h2><p>{business.address}</p></div><div className="map-frame reveal"><iframe title="Mapa da Brutus Barbearia — Avenida Goiás, 440, Santo Antônio, São Caetano do Sul" src={embed} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"/></div><a href={maps} target="_blank" rel="noopener noreferrer" className="pill pill-dark reveal"><MapPin size={18}/> Abrir no Google Maps <ArrowRight size={17}/></a></div></section>
   <section id="contato" className="section contact-section"><div className="container contact-grid"><div className="reveal"><span className="eyebrow">CONTATO DIRETO</span><h2>Pronto para cuidar do <em>visual?</em></h2><p>Consulte os serviços e a disponibilidade diretamente com a equipe.</p><div className="contact-detail"><MapPin size={23}/><div><strong>Endereço</strong><p>{business.address}</p></div></div><div className="contact-detail"><Clock3 size={23}/><div><strong>Horário informado</strong><p>{business.hours}</p></div></div><div className="contact-detail"><MessageCircle size={23}/><div><strong>Telefone / WhatsApp</strong><p><a href={wa()} target="_blank" rel="noopener noreferrer">{business.phone}</a></p></div></div><a href={wa()} className="pill pill-bronze" target="_blank" rel="noopener noreferrer">Fazer pedido agora <ArrowRight size={18}/></a></div><div className="contact-image reveal"><img src={images.interior} alt="Imagem editorial ilustrativa de interior de barbearia" loading="lazy" width="900" height="1100"/><div>BRUTUS <span>BARBEARIA</span></div></div></div></section>
  </main>
  <footer><div className="container footer-grid"><div><a className="footer-brand" href="#inicio"><Scissors size={27}/> BRUTUS <span>BARBEARIA</span></a><p>Seu estilo merece atenção aos detalhes.</p><a className="pill pill-bronze" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora <ArrowRight size={17}/></a></div><nav aria-label="Links do rodapé">{nav.map(([label,href])=><a href={href} key={href}>{label}</a>)}</nav><div><strong>Encontre-nos</strong><p>{business.address}</p><p>{business.hours}</p><a href={wa()} target="_blank" rel="noopener noreferrer">{business.phone}</a></div></div><div className="container copyright">© {new Date().getFullYear()} Brutus Barbearia. Todos os direitos reservados.</div></footer>
  <a className="floating-wa" href={wa()} target="_blank" rel="noopener noreferrer" aria-label="Fale com a Brutus Barbearia pelo WhatsApp"><MessageCircle size={27}/><span>Fale conosco</span></a>
  {gallery&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Fotografia ampliada" onClick={()=>setGallery(null)}><button onClick={()=>setGallery(null)} aria-label="Fechar fotografia"><X size={25}/></button><img src={gallery} alt="Fotografia editorial ilustrativa ampliada" onClick={e=>e.stopPropagation()}/></div>}
 </div>;
}
