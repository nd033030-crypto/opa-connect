import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Clock3, MapPin, Menu, MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

const business = {
 name: "ADEGA DO ZÉ - Delivery", slogan: "A escolha certa perto de você",
 address: "Av. Paulista - Bela Vista, São Paulo - SP, 01310-000, Brasil",
 phone: "(48) 98838-3327", whatsapp: "5548988383327", hours: "Seg a Sáb, 9h às 19h",
};
const wa = (message = "Olá! Conheci a Adega do Zé pelo site e gostaria de consultar as opções disponíveis.") => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;
const embed = `https://www.google.com/maps?q=${encodeURIComponent(business.address)}&z=16&output=embed`;
const photo = (id: string, width = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const images = {
 hero: photo("photo-1510812431401-41d2bd2722f3",1800),
 wine: photo("photo-1510812431401-41d2bd2722f3"),
 bottles: photo("photo-1528823872057-9c018a7a7553"),
 glass: photo("photo-1474722883778-792e7990302f"),
 bar: photo("photo-1514933651103-005eec06c04b"),
 cooler: photo("photo-1536935338788846bb9981813"),
 drinks: photo("photo-1544145945-f90425340c7e"),
 soda: photo("photo-1581006852262-e4307cf6283a"),
 water: photo("photo-1437482078695-73f5ca6c96e2"),
 snack: photo("photo-1568901346375-23c9450c58cd"),
};
type Product = {id:string;name:string;category:string;image:string};
const products:Product[] = [
 {id:"v1",name:"Vinhos",category:"Vinhos",image:images.wine},
 {id:"v2",name:"Espumantes",category:"Vinhos",image:images.glass},
 {id:"c1",name:"Cervejas",category:"Cervejas",image:images.bottles},
 {id:"c2",name:"Opções para compartilhar",category:"Cervejas",image:images.cooler},
 {id:"b1",name:"Refrigerantes",category:"Sem álcool",image:images.soda},
 {id:"b2",name:"Água",category:"Sem álcool",image:images.water},
 {id:"b3",name:"Outras bebidas",category:"Sem álcool",image:images.drinks},
 {id:"a1",name:"Acompanhamentos",category:"Complementos",image:images.snack},
];
const navigation = [["Início","#inicio"],["Sobre","#sobre"],["Cardápio","#cardapio"],["Galeria","#galeria"],["Localização","#localizacao"],["Contato","#contato"]] as const;
export const Route = createFileRoute("/")({
 head: () => ({
 meta:[
 {title:"ADEGA DO ZÉ - Delivery | Adega na Av. Paulista, Bela Vista"},
 {name:"description",content:"Conheça a ADEGA DO ZÉ - Delivery na região da Av. Paulista, Bela Vista, São Paulo. Consulte bebidas e disponibilidade pelo WhatsApp."},
 {property:"og:title",content:"ADEGA DO ZÉ - Delivery | A escolha certa perto de você"},
 {property:"og:description",content:"Consulte as opções disponíveis na Adega do Zé pelo WhatsApp."},
 {property:"og:type",content:"website"},
 {property:"og:image",content:images.hero},
 ],
 scripts:[{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"Store",name:business.name,address:{"@type":"PostalAddress",streetAddress:"Av. Paulista - Bela Vista",addressLocality:"São Paulo",addressRegion:"SP",postalCode:"01310-000",addressCountry:"BR"},telephone:"+5548988383327",openingHoursSpecification:[{"@type":"OpeningHoursSpecification",dayOfWeek:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],opens:"09:00",closes:"19:00"}]})}],
 }),
 component: Home,
});
function Home(){
 const [menu,setMenu]=useState(false);
 const [scrolled,setScrolled]=useState(false);
 const [cart,setCart]=useState<Record<string,number>>({});
 const [cartOpen,setCartOpen]=useState(false);
 const [name,setName]=useState("");
 const [gallery,setGallery]=useState<string|null>(null);
 const [category,setCategory]=useState("Todos");
 const [toast,setToast]=useState("");
 const [tooltip,setTooltip]=useState(false);
 const [progress,setProgress]=useState(0);

 const total=Object.values(cart).reduce((a,b)=>a+b,0);
 const change=(id:string,n:number)=>setCart(old=>{const next={...old};if(n<=0)delete next[id];else next[id]=n;return next});
 useEffect(()=>{const fn=()=>{setScrolled(window.scrollY>30);setProgress(document.documentElement.scrollHeight>innerHeight?window.scrollY/(document.documentElement.scrollHeight-innerHeight)*100:0)};fn();window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn)},[]);
 useEffect(()=>{const fn=(e:KeyboardEvent)=>{if(e.key==="Escape"){setGallery(null);setCartOpen(false);setMenu(false)}};window.addEventListener("keydown",fn);return()=>window.removeEventListener("keydown",fn)},[]);
 useEffect(()=>{
  if(typeof window==="undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const animations:Animation[]=[];
  const elements=Array.from(document.querySelectorAll<HTMLElement>(".reveal, .section-heading h2, .about-copy p, .contact-detail, .gallery-item, .hero-rise, .filters button, .where-link, .footer-grid > div"));
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(!entry.isIntersecting)continue;
      const el=entry.target as HTMLElement;
      const siblings=el.parentElement?Array.from(el.parentElement.children).filter(x=>x.matches(".product, .gallery-item, .contact-detail, .filters button, .hero-rise, .about-copy p")):[];
      const index=Math.max(0,siblings.indexOf(el));
      const delay=Math.min(index*110,550);
      const animation=el.animate([{opacity:0,transform:"translate3d(0,64px,0)",filter:"blur(7px)"},{opacity:1,transform:"translate3d(0,0,0)",filter:"blur(0px)"}],{duration:950,delay,easing:"cubic-bezier(.16,1,.3,1)",fill:"both"});
      animations.push(animation);observer.unobserve(el);
    }
  },{threshold:.08,rootMargin:"0px 0px -35px 0px"});
  elements.forEach(el=>observer.observe(el));
  const hero=document.querySelector<HTMLElement>(".cinematic-hero");
  const photo=document.querySelector<HTMLElement>(".lido-hero-photo");
  const content=document.querySelector<HTMLElement>(".hero-content");
  let frame=0;
  const scrollMotion=()=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;if(!hero)return;const rect=hero.getBoundingClientRect();const p=Math.max(0,Math.min(1,-rect.top/Math.max(rect.height,1)));if(photo)photo.style.transform=`translate3d(0,${p*65}px,0) scale(${1.04+p*.12})`;if(content){content.style.transform=`translate3d(0,${-p*85}px,0)`;content.style.opacity=String(Math.max(.18,1-p*.85));}})};
  window.addEventListener("scroll",scrollMotion,{passive:true});scrollMotion();
  return()=>{observer.disconnect();animations.forEach(a=>a.cancel());window.removeEventListener("scroll",scrollMotion);if(frame)cancelAnimationFrame(frame);if(photo)photo.style.transform="";if(content){content.style.transform="";content.style.opacity="";}};
 },[category]);
 useEffect(()=>{const t=window.setTimeout(()=>setTooltip(true),3000);return()=>window.clearTimeout(t)},[]);
 const order=()=>{const lines=products.filter(p=>cart[p.id]).map(p=>`• ${p.name} — ${cart[p.id]} unidade(s)`);const msg=`Olá! Conheci a Adega do Zé pelo site. Meu nome é ${name.trim()}. Gostaria de consultar disponibilidade e preços destes itens demonstrativos:\n\n${lines.join("\n")}\n\nPodem me informar os valores e as modalidades de atendimento disponíveis? Aguardo a confirmação da equipe. Obrigado!`;window.open(wa(msg),"_blank","noopener,noreferrer")};
 const add=(id:string)=>{change(id,(cart[id]||0)+1);setToast("Produto adicionado ao carrinho");window.setTimeout(()=>setToast(""),1800)};
 return <div className="site"><div className="scroll-progress" style={{width:`${progress}%`}} aria-hidden="true"/>
  <header className={`header ${scrolled||menu?"scrolled":""}`}>
   <div className="container header-inner"><a className="brand" href="#inicio" onClick={()=>setMenu(false)}>ADEGA DO ZÉ <small>{business.slogan}</small></a>
    <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(([n,h])=><a key={h} href={h}>{n}</a>)}<a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido</a></nav>
    <div className="header-actions"><button className="cart-toggle" onClick={()=>setCartOpen(true)} aria-label={`Abrir carrinho com ${total} itens`}><ShoppingBag size={21}/><span>{total}</span></button><button className="mobile-toggle" aria-label={menu?"Fechar menu":"Abrir menu"} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div>
   </div>
   {menu&&<nav className="mobile-nav" aria-label="Menu mobile">{navigation.map(([n,h])=><a href={h} key={h} onClick={()=>setMenu(false)}>{n}</a>)}<a href={wa()} target="_blank" rel="noopener noreferrer" onClick={()=>setMenu(false)}>Fazer pedido</a></nav>}
  </header>
  <main>
   <section id="inicio" className="hero cinematic-hero adega-hero"><img className="lido-hero-photo" src={images.hero} alt="Fotografia editorial ilustrativa de vinho e taças" fetchPriority="high" /><div className="hero-shade"/><div className="hero-orbit" aria-hidden="true"><span/><span/><span/></div><div className="hero-sparkles" aria-hidden="true"><i/><i/><i/><i/><i/></div><div className="container hero-content"><p className="eyebrow hero-rise">ADEGA • AV. PAULISTA • BELA VISTA</p><h1 className="hero-rise">{business.slogan}</h1><p className="hero-sub hero-rise">Consulte bebidas e opções para o seu momento. Atendimento direto pelo WhatsApp.</p><div className="hero-buttons hero-rise"><a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora <ArrowRight size={18}/></a><a className="pill pill-outline" href="#cardapio">Explorar cardápio</a></div></div></section>
   <section id="sobre" className="section about container"><div className="about-photo reveal lido-motion-photo"><img src={images.bar} alt="Fotografia ilustrativa de ambiente de adega" loading="lazy" width="1000" height="1100"/></div><div className="about-copy reveal"><span className="eyebrow">PERTO DE VOCÊ</span><h2>Sua próxima escolha começa aqui.</h2><div className="gold-line"/><p>Procurando uma adega na região da Avenida Paulista e Bela Vista? A Adega do Zé oferece um canal direto para você consultar as opções disponíveis sem complicação.</p><p>Explore as categorias demonstrativas e fale com a equipe para confirmar produtos, valores e atendimento.</p><p>Escolha o que procura e envie sua consulta pelo WhatsApp. Simples, direto e no seu ritmo.</p><a className="text-link" href={wa()} target="_blank" rel="noopener noreferrer">Falar com a equipe <ArrowRight size={18}/></a></div></section>
   <section id="cardapio" className="section menu-section"><div className="container"><div className="section-heading reveal"><span className="eyebrow">EXPLORE AS OPÇÕES</span><h2>Uma seleção para cada ocasião.</h2><p>Consulte as categorias e confirme as opções disponíveis diretamente com a equipe.</p><p className="disclaimer">Cardápio demonstrativo: produtos, imagens, disponibilidade e preços sujeitos à confirmação da equipe.</p></div><div className="filters" role="group" aria-label="Filtrar produtos">{["Todos","Vinhos","Cervejas","Sem álcool","Complementos"].map(c=><button key={c} aria-pressed={category===c} className={category===c?"active":""} onClick={()=>setCategory(c)}>{c}</button>)}</div><div className="product-grid">{products.filter(p=>category==="Todos"||p.category===category).map(p=><article className="product reveal lido-motion-card" key={p.id} style={{transitionDelay:`${(products.filter(item=>category==="Todos"||item.category===category).indexOf(p)%3)*90}ms`}}><div className="product-image">{p.image ? <img src={p.image} alt={`Fotografia ilustrativa de ${p.name}`} loading="lazy" width="1000" height="800" onError={e=>{const img=e.currentTarget;if(img.dataset.retried)return;img.dataset.retried="1";img.src=images.hero;}}/> : <div className="product-photo-pending" role="img" aria-label={`Fotografia de ${p.name} aguardando confirmação`}><span>FOTO DO PRODUTO EM SELEÇÃO</span><strong>{p.name}</strong><small>Imagem específica do produto em seleção</small></div>}</div><div className="product-info"><span className="eyebrow">{p.category} · CATEGORIA DEMONSTRATIVA</span><h3>{p.name}</h3><p>Consulte marcas, versões, valores e disponibilidade.</p><div className="product-bottom"><span>Consultar preço</span><button onClick={()=>add(p.id)} aria-label={`Adicionar ${p.name} ao carrinho`}><Plus size={18}/> Adicionar</button></div></div></article>)}</div><div className="menu-note">Itens apresentados como sugestões visuais; confirme o cardápio e os valores diretamente com a equipe.</div></div></section>
   <section id="galeria" className="section gallery-section container"><div className="section-heading reveal"><span className="eyebrow">ATMOSFERA DA ADEGA</span><h2>Uma experiência em cada detalhe.</h2><p>Imagens editoriais ilustrativas. Consulte a equipe para fotos e produtos reais do estabelecimento.</p></div><div className="gallery-grid">{[images.wine,images.bottles,images.glass,images.bar,images.drinks,images.soda].map((src,i)=><button key={i} className={`gallery-item gallery-item-${i} lido-motion-card`} onClick={()=>setGallery(src)} aria-label={`Ampliar fotografia ilustrativa ${i+1}`}><img src={src} alt={["Vinho e taças","Garrafas","Taça de vinho","Ambiente de bar","Bebidas","Refrigerante"][i]+" — imagem ilustrativa"} loading="lazy" width="1000" height="1000"/></button>)}</div></section>
   <section className="invitation"><div className="container reveal"><span className="eyebrow">ADEGA DO ZÉ</span><h2>Seu próximo pedido começa com uma conversa.</h2><p>Consulte a seleção e a disponibilidade pelo WhatsApp.</p><a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora <ArrowRight size={18}/></a></div></section>
   <section id="localizacao" className="section where-section">
    <div className="container where-container">
      <div className="section-heading reveal">
        <span className="eyebrow">VENHA NOS VISITAR</span>
        <h2>Onde estamos</h2>
        <p className="where-address"><MapPin size={22} aria-hidden="true" /> {business.address}</p>
      </div>
      <div className="where-map reveal">
        <iframe title="Localização aproximada da Adega do Zé — Avenida Paulista, Bela Vista" src={embed} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
      </div>
      <a className="pill pill-dark where-link" href={maps} target="_blank" rel="noopener noreferrer"><MapPin size={18}/> Abrir no Google Maps <ArrowRight size={17}/></a>
    </div>
   </section>
   <section className="section contact-section"><div className="container contact-grid"><div id="contato" className="reveal"><span className="eyebrow">VISITE-NOS</span><h2>Fale com a Adega do Zé.</h2><div className="contact-detail"><MapPin/><div><strong>Endereço</strong><p>{business.address}</p></div></div><div className="contact-detail"><Clock3/><div><strong>Funcionamento informado</strong><p>{business.hours}</p></div></div><div className="contact-detail"><MessageCircle/><div><strong>Contato</strong><p><a href={`tel:+${business.whatsapp}`}>{business.phone}</a></p></div></div><div className="contact-buttons"><a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora</a><a className="pill pill-dark" href={maps} target="_blank" rel="noopener noreferrer">Traçar rota <ArrowRight size={17}/></a></div></div><div className="contact-editorial reveal lido-motion-photo"><img src={images.wine} alt="Taças e vinho em fotografia ilustrativa" loading="lazy" width="1000" height="1000"/><div><span className="eyebrow">SUA ESCOLHA, SEU MOMENTO</span><p>Na região da Av. Paulista, Bela Vista.</p></div></div></div></section>
  </main>
  <footer><div className="container footer-grid"><div><strong className="footer-brand">ADEGA DO ZÉ</strong><p>{business.slogan}</p><a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora</a></div><nav aria-label="Links do rodapé">{navigation.map(([n,h])=><a key={h} href={h}>{n}</a>)}</nav><div><strong>Encontre-nos</strong><p>{business.address}</p><p>{business.hours}</p><p>{business.phone}</p></div></div><div className="container copyright">© {new Date().getFullYear()} ADEGA DO ZÉ - Delivery. Todos os direitos reservados.</div></footer>
  <div className="floating-actions"><button className="floating-cart" onClick={()=>setCartOpen(true)} aria-label={`Abrir carrinho: ${total} itens`}><ShoppingBag size={23}/><span>{total}</span></button><div className="wa-wrap"><span className={`wa-tooltip ${tooltip?"show":""}`} role="status">Fale conosco</span><a className="floating-wa" href={wa("Olá! Conheci a Adega do Zé pelo site e gostaria de consultar as opções disponíveis.")} target="_blank" rel="noopener noreferrer" aria-label="Fale conosco pelo WhatsApp"><MessageCircle size={26}/></a></div></div>
  {toast&&<div role="status" className="toast">{toast}</div>}
  {gallery&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Fotografia ampliada" onClick={()=>setGallery(null)}><button aria-label="Fechar fotografia" onClick={()=>setGallery(null)}><X/></button><img src={gallery} alt="Fotografia editorial ilustrativa ampliada" onClick={e=>e.stopPropagation()}/></div>}
  {cartOpen&&<div className="cart-backdrop" onClick={()=>setCartOpen(false)}><aside className="cart-panel" role="dialog" aria-modal="true" aria-label="Carrinho de consulta" onClick={e=>e.stopPropagation()}><div className="cart-head"><div><span className="eyebrow">SUA SELEÇÃO</span><h2>Meu carrinho ({total})</h2></div><button onClick={()=>setCartOpen(false)} aria-label="Fechar carrinho"><X/></button></div><p className="cart-disclaimer">Pedido de consulta: preços, disponibilidade e modalidades dependem da confirmação da equipe. Nenhuma compra é concluída pelo site.</p><div className="cart-items">{products.filter(p=>cart[p.id]).map(p=><div className="cart-item" key={p.id}>{p.image?<img src={p.image} alt="" width="80" height="80" onError={e=>{e.currentTarget.style.display="none"}}/>:<span className="cart-image-placeholder" aria-hidden="true"/>}<div><strong>{p.name}</strong><small>Consultar preço</small><div className="quantity"><button aria-label={`Diminuir ${p.name}`} onClick={()=>change(p.id,cart[p.id]-1)}><Minus size={16}/></button><span>{cart[p.id]}</span><button aria-label={`Aumentar ${p.name}`} onClick={()=>change(p.id,cart[p.id]+1)}><Plus size={16}/></button><button className="remove" aria-label={`Remover ${p.name}`} onClick={()=>change(p.id,0)}><Trash2 size={16}/></button></div></div></div>)}{total===0&&<p>Seu carrinho está vazio. Explore o cardápio demonstrativo para começar.</p>}</div><div className="cart-footer"><label htmlFor="customer-name">Seu nome</label><input id="customer-name" value={name} maxLength={80} onChange={e=>setName(e.target.value)} placeholder="Como podemos chamar você?"/><p>Consulte retirada ou entrega diretamente com a equipe.</p><button className="pill pill-gold" disabled={!total||!name.trim()} onClick={order}>Consultar pedido no WhatsApp <ArrowRight size={18}/></button></div></aside></div>}
 </div>
}
