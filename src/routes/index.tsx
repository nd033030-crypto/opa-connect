import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Clock3, MapPin, Menu, MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

const business = {
 name: "Bar e Restaurante Verdes Mares",
 address: "Av. Leonita Cavalcante, 290 - Porto de Vacas, Barra de São Miguel - AL, 57180-000, Brasil",
 phone: "(82) 3272-1957", whatsapp: "558232721957", hours: "Seg a Sáb, 9h às 19h",
};
const wa = (message = "Olá! Conheci o Bar e Restaurante Verdes Mares pelo site e gostaria de consultar o cardápio.") => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;
const embed = `https://www.google.com/maps?q=${encodeURIComponent(business.address)}&z=16&output=embed`;
const photo = (id: string, width = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const images = {
 hero: photo("photo-1517248135467-4c7edcad34c4",1800),
 restaurant: photo("photo-1414235077428-338989a2e8c0"),
 coffee: photo("photo-1509042239860-f550ce710b93"),
 espresso: photo("photo-1511920170033-f8396924c348"),
 cappuccino: photo("photo-1534778101976-62847782c213"),
 cake: photo("photo-1464305795204-6f5bbfc7fb81"),
 croissant: photo("photo-1555507036-ab1f4038808a"),
 sandwich: photo("photo-1528735602780-2552fd46c7af"),
 food: photo("photo-1547592180-85f173990554"),
 juice: photo("photo-1600271886742-f049cd451bba"),
 tea: photo("photo-1544787219-7f47ccb76574"),
 dessert: photo("photo-1488477181946-6428a0291777"),
};
type Product = {id:string;name:string;category:string;image:string};
const products:Product[] = [
 {id:"c1",name:"Café expresso",category:"Cafés",image:images.espresso},
 {id:"c2",name:"Cappuccino",category:"Cafés",image:images.cappuccino},
 {id:"c3",name:"Café coado",category:"Cafés",image:images.coffee},
 {id:"d1",name:"Bolo",category:"Doces",image:images.cake},
 {id:"d2",name:"Croissant",category:"Doces",image:images.croissant},
 {id:"d3",name:"Sobremesa",category:"Doces",image:images.dessert},
 {id:"s1",name:"Sanduíche",category:"Salgados",image:images.sandwich},
 {id:"s2",name:"Opção de refeição",category:"Salgados",image:images.food},
 {id:"b1",name:"Suco natural",category:"Bebidas",image:images.juice},
 {id:"b2",name:"Chá",category:"Bebidas",image:images.tea},
];
const navigation = [["Início","#inicio"],["Sobre","#sobre"],["Cardápio","#cardapio"],["Galeria","#galeria"],["Localização","#localizacao"],["Contato","#contato"]] as const;
export const Route = createFileRoute("/")({
 head: () => ({
 meta:[
 {title:"Bar e Restaurante Verdes Mares | Cafeteria em Barra de São Miguel - AL"},
 {name:"description",content:"Conheça o Bar e Restaurante Verdes Mares na Av. Leonita Cavalcante, 290, Porto de Vacas, Barra de São Miguel - AL. Consulte o cardápio pelo WhatsApp."},
 {property:"og:title",content:"Bar e Restaurante Verdes Mares | Barra de São Miguel"},
 {property:"og:description",content:"Um convite para sua pausa em Porto de Vacas. Consulte as opções disponíveis pelo WhatsApp."},
 {property:"og:type",content:"website"},
 {property:"og:image",content:images.hero},
 ],
 scripts:[{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"Restaurant",name:business.name,address:{"@type":"PostalAddress",streetAddress:"Av. Leonita Cavalcante, 290 - Porto de Vacas",addressLocality:"Barra de São Miguel",addressRegion:"AL",postalCode:"57180-000",addressCountry:"BR"},telephone:"+558232721957",openingHoursSpecification:[{"@type":"OpeningHoursSpecification",dayOfWeek:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],opens:"09:00",closes:"19:00"}]})}],
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
 const order=()=>{const lines=products.filter(p=>cart[p.id]).map(p=>`• ${p.name} — ${cart[p.id]} unidade(s)`);const msg=`Olá! Conheci o Bar e Restaurante Verdes Mares pelo site. Meu nome é ${name.trim()}. Gostaria de consultar disponibilidade e preços destes itens demonstrativos:\n\n${lines.join("\n")}\n\nPodem me informar os valores e as modalidades de atendimento disponíveis? Aguardo a confirmação da equipe. Obrigado!`;window.open(wa(msg),"_blank","noopener,noreferrer")};
 const add=(id:string)=>{change(id,(cart[id]||0)+1);setToast("Produto adicionado ao carrinho");window.setTimeout(()=>setToast(""),1800)};
 return <div className="site"><div className="scroll-progress" style={{width:`${progress}%`}} aria-hidden="true"/>
  <header className={`header ${scrolled||menu?"scrolled":""}`}>
   <div className="container header-inner"><a className="brand" href="#inicio" onClick={()=>setMenu(false)}>VERDES MARES <small>Bar e Restaurante</small></a>
    <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(([n,h])=><a key={h} href={h}>{n}</a>)}<a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido</a></nav>
    <div className="header-actions"><button className="cart-toggle" onClick={()=>setCartOpen(true)} aria-label={`Abrir carrinho com ${total} itens`}><ShoppingBag size={21}/><span>{total}</span></button><button className="mobile-toggle" aria-label={menu?"Fechar menu":"Abrir menu"} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div>
   </div>
   {menu&&<nav className="mobile-nav" aria-label="Menu mobile">{navigation.map(([n,h])=><a href={h} key={h} onClick={()=>setMenu(false)}>{n}</a>)}<a href={wa()} target="_blank" rel="noopener noreferrer" onClick={()=>setMenu(false)}>Fazer pedido</a></nav>}
  </header>
  <main>
   <section id="inicio" className="hero cinematic-hero verdes-hero"><img className="lido-hero-photo" src={images.hero} alt="Fotografia editorial ilustrativa de ambiente de restaurante" fetchPriority="high" /><div className="hero-shade"/><div className="hero-orbit" aria-hidden="true"><span/><span/><span/></div><div className="hero-sparkles" aria-hidden="true"><i/><i/><i/><i/><i/></div><div className="container hero-content"><p className="eyebrow hero-rise">BAR • RESTAURANTE • PORTO DE VACAS</p><h1 className="hero-rise">Uma pausa especial em Barra de São Miguel.</h1><p className="hero-sub hero-rise">Conheça o Verdes Mares e consulte nossas opções diretamente pelo WhatsApp.</p><div className="hero-buttons hero-rise"><a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora <ArrowRight size={18}/></a><a className="pill pill-outline" href="#cardapio">Explorar cardápio</a></div></div></section>
   <section id="sobre" className="section about container"><div className="about-photo reveal lido-motion-photo"><img src={images.restaurant} alt="Fotografia ilustrativa de ambiente gastronômico" loading="lazy" width="1000" height="1100"/></div><div className="about-copy reveal"><span className="eyebrow">CONHEÇA O VERDES MARES</span><h2>Seu encontro com uma boa pausa.</h2><div className="gold-line"/><p>Na Avenida Leonita Cavalcante, em Porto de Vacas, o Bar e Restaurante Verdes Mares é uma opção para quem procura um lugar na região de Barra de São Miguel.</p><p>Explore as sugestões do nosso catálogo demonstrativo e consulte diretamente a equipe sobre o cardápio e a disponibilidade do dia.</p><p>Quer saber mais antes de sair de casa? Fale pelo WhatsApp e tire suas dúvidas em poucos passos.</p><a className="text-link" href={wa()} target="_blank" rel="noopener noreferrer">Consultar cardápio <ArrowRight size={18}/></a></div></section>
   <section id="cardapio" className="section menu-section"><div className="container"><div className="section-heading reveal"><span className="eyebrow">DESCUBRA AS OPÇÕES</span><h2>Escolha seu próximo momento.</h2><p>Cafés, doces, salgados e bebidas: sugestões ilustrativas para consultar com a equipe.</p><p className="disclaimer">Cardápio demonstrativo: produtos, imagens, disponibilidade e preços sujeitos à confirmação da equipe.</p></div><div className="filters" role="group" aria-label="Filtrar produtos">{["Todos","Cafés","Doces","Salgados","Bebidas"].map(c=><button key={c} aria-pressed={category===c} className={category===c?"active":""} onClick={()=>setCategory(c)}>{c}</button>)}</div><div className="product-grid">{products.filter(p=>category==="Todos"||p.category===category).map(p=><article className="product reveal lido-motion-card" key={p.id} style={{transitionDelay:`${(products.filter(item=>category==="Todos"||item.category===category).indexOf(p)%3)*90}ms`}}><div className="product-image">{p.image ? <img src={p.image} alt={`Fotografia ilustrativa de ${p.name}`} loading="lazy" width="1000" height="800" onError={e=>{const img=e.currentTarget;if(img.dataset.retried)return;img.dataset.retried="1";img.src=images.restaurant;}}/> : <div className="product-photo-pending" role="img" aria-label={`Fotografia de ${p.name} aguardando confirmação`}><span>FOTO DO PRODUTO EM SELEÇÃO</span><strong>{p.name}</strong><small>Imagem específica do produto em seleção</small></div>}</div><div className="product-info"><span className="eyebrow">{p.category} · CATEGORIA DEMONSTRATIVA</span><h3>{p.name}</h3><p>Consulte opções, ingredientes, valores e disponibilidade.</p><div className="product-bottom"><span>Consultar preço</span><button onClick={()=>add(p.id)} aria-label={`Adicionar ${p.name} ao carrinho`}><Plus size={18}/> Adicionar</button></div></div></article>)}</div><div className="menu-note">Itens apresentados como sugestões visuais; confirme o cardápio e os valores diretamente com a equipe.</div></div></section>
   <section id="galeria" className="section gallery-section container"><div className="section-heading reveal"><span className="eyebrow">SABORES E ATMOSFERA</span><h2>Uma experiência para apreciar.</h2><p>Fotografias editoriais ilustrativas; as imagens oficiais do estabelecimento poderão substituí-las.</p></div><div className="gallery-grid">{[images.restaurant,images.coffee,images.food,images.cake,images.sandwich,images.juice].map((src,i)=><button key={i} className={`gallery-item gallery-item-${i} lido-motion-card`} onClick={()=>setGallery(src)} aria-label={`Ampliar fotografia ilustrativa ${i+1}`}><img src={src} alt={["Ambiente gastronômico","Café","Refeição","Bolo","Sanduíche","Suco"][i]+" — fotografia ilustrativa"} loading="lazy" width="1000" height="1000"/></button>)}</div></section>
   <section className="invitation"><div className="container reveal"><span className="eyebrow">VERDES MARES</span><h2>O próximo momento começa aqui.</h2><p>Fale com a equipe e consulte o cardápio disponível.</p><a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora <ArrowRight size={18}/></a></div></section>
   <section id="localizacao" className="section where-section">
    <div className="container where-container">
      <div className="section-heading reveal">
        <span className="eyebrow">VENHA NOS VISITAR</span>
        <h2>Onde estamos</h2>
        <p className="where-address"><MapPin size={22} aria-hidden="true" /> {business.address}</p>
      </div>
      <div className="where-map reveal">
        <iframe title="Localização do Bar e Restaurante Verdes Mares — Avenida Leonita Cavalcante, 290" src={embed} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
      </div>
      <a className="pill pill-dark where-link" href={maps} target="_blank" rel="noopener noreferrer"><MapPin size={18}/> Abrir no Google Maps <ArrowRight size={17}/></a>
    </div>
   </section>
   <section className="section contact-section"><div className="container contact-grid"><div id="contato" className="reveal"><span className="eyebrow">VISITE-NOS</span><h2>Fale com a Bar e Restaurante Verdes Mares.</h2><div className="contact-detail"><MapPin/><div><strong>Endereço</strong><p>{business.address}</p></div></div><div className="contact-detail"><Clock3/><div><strong>Funcionamento informado</strong><p>{business.hours}</p></div></div><div className="contact-detail"><MessageCircle/><div><strong>Contato</strong><p><a href={`tel:+${business.whatsapp}`}>{business.phone}</a></p></div></div><div className="contact-buttons"><a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora</a><a className="pill pill-dark" href={maps} target="_blank" rel="noopener noreferrer">Traçar rota <ArrowRight size={17}/></a></div></div><div className="contact-editorial reveal lido-motion-photo"><img src={images.coffee} alt="Café em fotografia ilustrativa" loading="lazy" width="1000" height="1000"/><div><span className="eyebrow">UM CONVITE AO SEU MOMENTO</span><p>Em Porto de Vacas, Barra de São Miguel.</p></div></div></div></section>
  </main>
  <footer><div className="container footer-grid"><div><strong className="footer-brand">VERDES MARES</strong><p>Um convite para sua próxima pausa.</p><a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora</a></div><nav aria-label="Links do rodapé">{navigation.map(([n,h])=><a key={h} href={h}>{n}</a>)}</nav><div><strong>Encontre-nos</strong><p>{business.address}</p><p>{business.hours}</p><p>{business.phone}</p></div></div><div className="container copyright">© {new Date().getFullYear()} Bar e Restaurante Verdes Mares. Todos os direitos reservados.</div></footer>
  <div className="floating-actions"><button className="floating-cart" onClick={()=>setCartOpen(true)} aria-label={`Abrir carrinho: ${total} itens`}><ShoppingBag size={23}/><span>{total}</span></button><div className="wa-wrap"><span className={`wa-tooltip ${tooltip?"show":""}`} role="status">Fale conosco</span><a className="floating-wa" href={wa("Olá! Conheci o Bar e Restaurante Verdes Mares pelo site e gostaria de consultar as opções disponíveis.")} target="_blank" rel="noopener noreferrer" aria-label="Fale conosco pelo WhatsApp"><MessageCircle size={26}/></a></div></div>
  {toast&&<div role="status" className="toast">{toast}</div>}
  {gallery&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Fotografia ampliada" onClick={()=>setGallery(null)}><button aria-label="Fechar fotografia" onClick={()=>setGallery(null)}><X/></button><img src={gallery} alt="Fotografia editorial ilustrativa ampliada" onClick={e=>e.stopPropagation()}/></div>}
  {cartOpen&&<div className="cart-backdrop" onClick={()=>setCartOpen(false)}><aside className="cart-panel" role="dialog" aria-modal="true" aria-label="Carrinho de consulta" onClick={e=>e.stopPropagation()}><div className="cart-head"><div><span className="eyebrow">SUA SELEÇÃO</span><h2>Meu carrinho ({total})</h2></div><button onClick={()=>setCartOpen(false)} aria-label="Fechar carrinho"><X/></button></div><p className="cart-disclaimer">Pedido de consulta: preços, disponibilidade e modalidades dependem da confirmação da equipe. Nenhuma compra é concluída pelo site.</p><div className="cart-items">{products.filter(p=>cart[p.id]).map(p=><div className="cart-item" key={p.id}>{p.image?<img src={p.image} alt="" width="80" height="80" onError={e=>{e.currentTarget.style.display="none"}}/>:<span className="cart-image-placeholder" aria-hidden="true"/>}<div><strong>{p.name}</strong><small>Consultar preço</small><div className="quantity"><button aria-label={`Diminuir ${p.name}`} onClick={()=>change(p.id,cart[p.id]-1)}><Minus size={16}/></button><span>{cart[p.id]}</span><button aria-label={`Aumentar ${p.name}`} onClick={()=>change(p.id,cart[p.id]+1)}><Plus size={16}/></button><button className="remove" aria-label={`Remover ${p.name}`} onClick={()=>change(p.id,0)}><Trash2 size={16}/></button></div></div></div>)}{total===0&&<p>Seu carrinho está vazio. Explore o cardápio demonstrativo para começar.</p>}</div><div className="cart-footer"><label htmlFor="customer-name">Seu nome</label><input id="customer-name" value={name} maxLength={80} onChange={e=>setName(e.target.value)} placeholder="Como podemos chamar você?"/><p>Consulte retirada ou entrega diretamente com a equipe.</p><button className="pill pill-gold" disabled={!total||!name.trim()} onClick={order}>Consultar pedido no WhatsApp <ArrowRight size={18}/></button></div></aside></div>}
 </div>
}
