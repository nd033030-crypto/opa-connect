import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Clock3, MapPin, Menu, MessageCircle, X, Dumbbell, Zap, Target, Navigation, Activity, Play } from "lucide-react";

const business={
 name:"Conceito Academia",
 address:"Alameda Sarutaiá, 205 - Jardim Paulista, São Paulo - SP, 01403-010, Brasil",
 phone:"(11) 3057-1033",whatsapp:"551130571033",hours:"Seg a Sáb, 9h às 19h"
};
const wa=(message="Olá! Conheci a Conceito Academia pelo site e gostaria de saber como começar.")=>`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
const maps=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;
const embed=`https://www.google.com/maps?q=${encodeURIComponent(business.address)}&z=16&output=embed`;
const photo=(id:string,w=1100)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82`;
const images={
 hero:photo("photo-1534438327276-14e5300c3a48",1920),
 about:photo("photo-1517836357463-d25dfeac3438"),
 strength:photo("photo-1532029837206-abbe2b7620e3"),
 cardio:photo("photo-1538805060514-97d9cc17730c"),
 movement:photo("photo-1518611012118-696072aa579a"),
 equipment:photo("photo-1571019613454-1cb2f99b2d8b"),
 training:photo("photo-1571019614242-c5c5dee9f50b"),
 atmosphere:photo("photo-1517836357463-d25dfeac3438")
};
const nav=[["Início","#inicio"],["Sobre","#sobre"],["Experiência","#experiencia"],["Galeria","#galeria"],["Localização","#localizacao"],["Contato","#contato"]] as const;
export const Route=createFileRoute("/")({
 head:()=>({
  meta:[
   {title:"Conceito Academia | Academia na Alameda Sarutaiá, Jardim Paulista - SP"},
   {name:"description",content:"Conheça a Conceito Academia na Alameda Sarutaiá, 205, Jardim Paulista, São Paulo - SP, 01403-010. Consulte informações pelo WhatsApp (11) 3057-1033."},
   {property:"og:title",content:"Conceito Academia | Sua próxima conquista começa aqui"},
   {property:"og:description",content:"Encontre a Conceito Academia no Jardim Paulista e entre em contato para começar."},
   {property:"og:type",content:"website"},
   {property:"og:image",content:images.hero}
  ],
  scripts:[{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"ExerciseGym",name:business.name,address:{"@type":"PostalAddress",streetAddress:"Alameda Sarutaiá, 205 - Jardim Paulista",addressLocality:"São Paulo",addressRegion:"SP",postalCode:"01403-010",addressCountry:"BR"},telephone:"+551130571033",openingHoursSpecification:[{"@type":"OpeningHoursSpecification",dayOfWeek:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],opens:"09:00",closes:"19:00"}]})}]
 }),
 component:Home
});
function Home(){
 const [menu,setMenu]=useState(false);
 const [scrolled,setScrolled]=useState(false);
 const [progress,setProgress]=useState(0);
 const [gallery,setGallery]=useState<string|null>(null);
 useEffect(()=>{const update=()=>{setScrolled(window.scrollY>30);const height=document.documentElement.scrollHeight-window.innerHeight;setProgress(height>0?window.scrollY/height*100:0)};update();window.addEventListener("scroll",update,{passive:true});return()=>window.removeEventListener("scroll",update)},[]);
 useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape"){setGallery(null);setMenu(false)}};window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey)},[]);
 useEffect(()=>{if(!gallery)return;const previous=document.body.style.overflow;document.body.style.overflow="hidden";return()=>{document.body.style.overflow=previous}},[gallery]);
 useEffect(()=>{
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const els=Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}})},{threshold:.1,rootMargin:"0px 0px -35px 0px"});
  els.forEach(el=>observer.observe(el));
  const hero=document.querySelector<HTMLElement>(".hero-photo");
  let frame=0;const onScroll=()=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;if(hero){const p=Math.min(1,Math.max(0,window.scrollY/window.innerHeight));hero.style.transform=`translate3d(0,${p*80}px,0) scale(${1.08+p*.1})`}})};
  window.addEventListener("scroll",onScroll,{passive:true});onScroll();
  return()=>{observer.disconnect();window.removeEventListener("scroll",onScroll);if(frame)cancelAnimationFrame(frame);if(hero)hero.style.transform=""}
 },[]);
 const galleryItems=[
  {src:images.strength,label:"Treino de força"},
  {src:images.cardio,label:"Movimento e cardio"},
  {src:images.movement,label:"Movimento e bem-estar"},
  {src:images.equipment,label:"Rotina de treino"},
  {src:images.training,label:"Dedicação e constância"},
  {src:images.atmosphere,label:"Atmosfera fitness"}
 ];
 return <div className="site">
  <div className="progress" style={{width:`${progress}%`}} aria-hidden="true"/>
  <header className={`header ${scrolled||menu?"scrolled":""}`}><div className="container header-inner">
   <a className="brand" href="#inicio" onClick={()=>setMenu(false)} aria-label="Conceito Academia — início"><span className="brand-symbol"><Dumbbell size={22}/></span><span>CONCEITO <small>ACADEMIA</small></span></a>
   <nav className="desktop-nav" aria-label="Navegação principal">{nav.map(([n,h])=><a key={h} href={h}>{n}</a>)}<a className="btn btn-red nav-cta" href={wa()} target="_blank" rel="noopener noreferrer">COMECE HOJE MESMO <ArrowRight size={15}/></a></nav>
   <button className="menu-toggle" aria-label={menu?"Fechar menu":"Abrir menu"} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
  </div>{menu&&<nav className="mobile-nav" aria-label="Menu mobile">{nav.map(([n,h])=><a href={h} key={h} onClick={()=>setMenu(false)}>{n}</a>)}<a href={wa()} target="_blank" rel="noopener noreferrer" onClick={()=>setMenu(false)}>Comece hoje mesmo</a></nav>}</header>
  <main>
   <section className="hero" id="inicio"><img className="hero-photo" src={images.hero} alt="Fotografia editorial ilustrativa de ambiente de academia com equipamentos de treino" width="1920" height="1280" fetchPriority="high" decoding="async"/><div className="hero-overlay"/><div className="hero-grid" aria-hidden="true"/><div className="container hero-content">
    <p className="eyebrow hero-rise"><span className="eyebrow-line"/> CONCEITO ACADEMIA · JARDIM PAULISTA</p>
    <h1 className="hero-rise">SUPERE SEUS <span>LIMITES.</span><br/>COMECE <span>AGORA.</span></h1>
    <p className="hero-sub hero-rise">Seu próximo passo começa na Alameda Sarutaiá. Conheça a Conceito Academia e converse com a equipe para encontrar o caminho certo para começar.</p>
    <div className="hero-actions hero-rise"><a className="btn btn-red" href={wa()} target="_blank" rel="noopener noreferrer">COMECE HOJE MESMO <ArrowRight size={19}/></a><a className="btn btn-ghost" href="#sobre">CONHEÇA A CONCEITO <ArrowRight size={18}/></a></div>
    <p className="hero-tag hero-rise">ENERGIA. FOCO. EVOLUÇÃO.</p>
   </div><a href="#sobre" className="scroll-hint" aria-label="Rolar para conhecer a academia"><span/> EXPLORE</a></section>
   <section className="info-strip" aria-label="Informações rápidas"><div className="container info-grid"><div><MapPin size={23}/><span><strong>JARDIM PAULISTA</strong><small>Alameda Sarutaiá, 205</small></span></div><div><Clock3 size={23}/><span><strong>HORÁRIO INFORMADO</strong><small>Seg a Sáb · 9h às 19h</small></span></div><div><MessageCircle size={23}/><span><strong>CONTATO DIRETO</strong><small>Fale com nossa equipe</small></span></div></div></section>
   <section className="section about" id="sobre"><div className="container about-grid"><div className="about-visual reveal"><img src={images.about} alt="Fotografia editorial ilustrativa de pessoa se exercitando com pesos" loading="lazy" decoding="async" width="1000" height="1200"/><div className="photo-outline" aria-hidden="true"/><div className="visual-stamp"><Activity size={29}/><span>EVOLUA<br/>NO SEU RITMO</span></div></div><div className="about-copy reveal"><p className="eyebrow"><span className="eyebrow-line"/> QUEM SOMOS</p><h2>UMA NOVA FORMA DE <span>COMEÇAR.</span></h2><p>A Conceito Academia está na Alameda Sarutaiá, 205, no Jardim Paulista, em São Paulo — uma localização para quem busca uma academia na região.</p><p>Quer dar o primeiro passo? Entre em contato diretamente com a equipe para conhecer as informações de atendimento e consultar as opções disponíveis.</p><p>Encontre o endereço, o horário informado e o canal de contato em um só lugar. O próximo movimento é seu.</p><a className="text-link" href={wa()} target="_blank" rel="noopener noreferrer">FALE COM A EQUIPE <ArrowRight size={19}/></a></div></div></section>
   <section className="section features" id="experiencia"><div className="container features-layout"><div className="reveal"><p className="eyebrow"><span className="eyebrow-line"/> SUA PRÓXIMA ETAPA</p><h2>O MOMENTO É <span>AGORA.</span></h2><div className="feature-grid"><article><Target size={30}/><h3>DEFINA SEU OBJETIVO</h3><p>Conte à equipe o que você procura e consulte as opções disponíveis.</p></article><article><Zap size={30}/><h3>DÊ O PRIMEIRO PASSO</h3><p>Comece uma conversa pelo WhatsApp, sem formulários complicados.</p></article><article><MapPin size={30}/><h3>ENCONTRE A CONCEITO</h3><p>Veja o endereço no Jardim Paulista e planeje sua visita.</p></article><article><Clock3 size={30}/><h3>ORGANIZE SUA ROTINA</h3><p>Confira o horário informado antes de ir até a academia.</p></article></div><a className="btn btn-red" href={wa()} target="_blank" rel="noopener noreferrer">COMECE HOJE MESMO <ArrowRight size={18}/></a></div><div className="features-visual reveal"><img src={images.training} alt="Fotografia editorial ilustrativa de pessoa treinando em academia" loading="lazy" decoding="async" width="1000" height="1200"/><div className="features-word" aria-hidden="true">SEM<br/><span>DESCULPAS.</span></div></div></div></section>
   <section className="section gallery-section" id="galeria"><div className="container"><div className="section-heading reveal"><p className="eyebrow"><span className="eyebrow-line"/> INSPIRAÇÃO FITNESS</p><h2>MOVIMENTO QUE <span>INSPIRA.</span></h2><p>Fotografias editoriais ilustrativas do universo fitness; não representam necessariamente as instalações, os equipamentos ou os serviços reais da Conceito Academia.</p></div><div className="gallery-grid">{galleryItems.map((item,i)=><button key={item.label} className={`gallery-item gallery-item-${i} reveal`} onClick={()=>setGallery(item.src)} aria-label={`Ampliar imagem: ${item.label}`}><img src={item.src} alt={item.label+" — fotografia editorial ilustrativa"} loading="lazy" decoding="async" width="900" height="900"/><span>{item.label}<ArrowRight size={19}/></span></button>)}</div></div></section>
   <section className="banner"><div className="banner-photo" style={{backgroundImage:`linear-gradient(90deg,#0f0f10f5,#0f0f10a8),url("${images.strength}")`}}/><div className="container banner-content reveal"><p className="eyebrow"><span className="eyebrow-line"/> SEU PRÓXIMO PASSO</p><h2>NÃO DEIXE PARA <span>DEPOIS.</span></h2><p>Converse com a Conceito Academia e descubra como começar.</p><a className="btn btn-red" href={wa()} target="_blank" rel="noopener noreferrer">COMECE HOJE MESMO <ArrowRight size={19}/></a></div></section>
   <section className="section location" id="localizacao"><div className="container"><div className="section-heading reveal"><p className="eyebrow"><span className="eyebrow-line"/> VENHA NOS ENCONTRAR</p><h2>NO CORAÇÃO DO <span>JARDIM PAULISTA.</span></h2><p>{business.address}</p></div><div className="map reveal"><iframe title="Localização da Conceito Academia — Alameda Sarutaiá, 205, Jardim Paulista, São Paulo" src={embed} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"/></div><a className="btn btn-outline reveal" href={maps} target="_blank" rel="noopener noreferrer"><Navigation size={18}/> ABRIR NO GOOGLE MAPS <ArrowRight size={17}/></a></div></section>
   <section className="section contact" id="contato"><div className="container contact-grid"><div className="reveal"><p className="eyebrow"><span className="eyebrow-line"/> CONTATO</p><h2>PRONTO PARA <span>COMEÇAR?</span></h2><p>Fale com a equipe, consulte as informações disponíveis e planeje sua visita.</p><div className="contact-item"><MapPin/><div><strong>ENDEREÇO</strong><p>{business.address}</p></div></div><div className="contact-item"><Clock3/><div><strong>FUNCIONAMENTO INFORMADO</strong><p>{business.hours}</p></div></div><div className="contact-item"><MessageCircle/><div><strong>TELEFONE / WHATSAPP</strong><p><a href={wa()} target="_blank" rel="noopener noreferrer">{business.phone}</a></p></div></div><a className="btn btn-red" href={wa()} target="_blank" rel="noopener noreferrer">COMECE HOJE MESMO <ArrowRight size={18}/></a></div><div className="contact-photo reveal"><img src={images.equipment} alt="Fotografia editorial ilustrativa de treinamento físico" loading="lazy" decoding="async" width="900" height="1100"/><span>FAÇA ACONTECER.</span></div></div></section>
  </main>
  <footer><div className="container footer-grid"><div><a className="footer-brand" href="#inicio"><Dumbbell size={28}/> CONCEITO <span>ACADEMIA</span></a><p>Seu próximo passo começa aqui.</p><a className="btn btn-red" href={wa()} target="_blank" rel="noopener noreferrer">COMECE HOJE MESMO <ArrowRight size={17}/></a></div><nav aria-label="Links rápidos">{nav.map(([n,h])=><a key={h} href={h}>{n}</a>)}</nav><div><strong>ONDE ESTAMOS</strong><p>{business.address}</p><p>{business.hours}</p><a href={wa()} target="_blank" rel="noopener noreferrer">{business.phone}</a></div></div><div className="container copyright">© {new Date().getFullYear()} Conceito Academia. Todos os direitos reservados.</div></footer>
  <a className="floating-wa" href={wa()} target="_blank" rel="noopener noreferrer" aria-label="Falar com a Conceito Academia pelo WhatsApp"><MessageCircle size={27}/><span>FALE CONOSCO</span></a>
  {gallery&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Fotografia ampliada" onClick={()=>setGallery(null)}><button onClick={()=>setGallery(null)} aria-label="Fechar fotografia"><X size={24}/></button><img src={gallery} alt="Fotografia editorial ilustrativa ampliada" onClick={e=>e.stopPropagation()}/></div>}
 </div>
}
