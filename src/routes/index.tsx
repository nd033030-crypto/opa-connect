import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Clock3, MapPin, Menu, MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

const business = {
 name: "Dona Alexandrina", slogan: "O sabor, que abraça",
 address: "R. Sampaio Viana, 409 - Paraíso, São Paulo - SP, 04004-001, Brasil",
 phone: "(11) 3885-9831", whatsapp: "551138859831", hours: "Segunda a sábado, das 9h às 19h",
};
const wa = (message = "Olá! Conheci a Dona Alexandrina pelo site e gostaria de saber mais sobre os produtos.") => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;
// Google Maps iframe embed URL for the complete supplied street address (no API key required).
const embed = `https://www.google.com/maps?q=${encodeURIComponent(business.address)}&z=17&output=embed`;
const photo = (id: string, width = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const images = {
 hero: photo("photo-1509440159596-0249088772ff", 1800),
 bread: photo("photo-1549931319-a545dcf3bc73"),
 croissant: photo("photo-1555507036-ab1f4038808a"),
 coffee: photo("photo-1509042239860-f550ce710b93"),
 pastry: photo("photo-1484723091739-30a097e8f929"),
 cake: photo("photo-1464305795204-6f5bbfc7fb81"),
 sandwich: photo("photo-1528735602780-2552fd46c7af"),
 espresso: photo("photo-1511920170033-f8396924c348"),
};
type Product = { id: string; name: string; category: string; image: string };
const products: Product[] = [
 {id:"p1",name:"Pão francês",category:"Pães",image:""},
 {id:"p2",name:"Pão de queijo",category:"Pães",image:""},
 {id:"p3",name:"Pães especiais",category:"Pães",image:images.bread},
 {id:"s1",name:"Coxinha",category:"Salgados",image:""},
 {id:"s2",name:"Esfiha",category:"Salgados",image:""},
 {id:"s3",name:"Empadas",category:"Salgados",image:""},
 {id:"d1",name:"Croissant doce",category:"Doces",image:""},
 {id:"d2",name:"Bolos",category:"Doces",image:images.cake},
 {id:"d3",name:"Doces variados",category:"Doces",image:""},
 {id:"b1",name:"Café expresso",category:"Bebidas",image:images.espresso},
 {id:"b2",name:"Cappuccino",category:"Bebidas",image:""},
 {id:"b3",name:"Sucos",category:"Bebidas",image:""},
];
const navigation = [["Início","#inicio"],["Sobre","#sobre"],["Cardápio","#cardapio"],["Galeria","#galeria"],["Localização","#localizacao"],["Contato","#contato"]] as const;
export const Route = createFileRoute("/")({
 head: () => ({
  meta: [
   {title:"Dona Alexandrina | Padaria no Paraíso, São Paulo"},
   {name:"description",content:"Conheça a Dona Alexandrina na Rua Sampaio Viana, 409, Paraíso, São Paulo. O sabor, que abraça. Consulte produtos e entre em contato."},
   {property:"og:title",content:"Dona Alexandrina | O sabor, que abraça"},
   {property:"og:description",content:"Padaria no Paraíso, São Paulo. Conheça nossos sabores e fale com a equipe."},
   {property:"og:type",content:"website"},
   {property:"og:image",content:images.hero},
  ],
  scripts:[{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"Bakery",name:business.name,address:{"@type":"PostalAddress",streetAddress:"R. Sampaio Viana, 409",addressLocality:"São Paulo",addressRegion:"SP",postalCode:"04004-001",addressCountry:"BR"},telephone:"+551138859831",openingHoursSpecification:[{"@type":"OpeningHoursSpecification",dayOfWeek:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],opens:"09:00",closes:"19:00"}]})}],
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
 const total=Object.values(cart).reduce((a,b)=>a+b,0);
 const change=(id:string,n:number)=>setCart(old=>{const next={...old};if(n<=0)delete next[id];else next[id]=n;return next});
 useEffect(()=>{const fn=()=>setScrolled(window.scrollY>30);fn();window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn)},[]);
 useEffect(()=>{const fn=(e:KeyboardEvent)=>{if(e.key==="Escape"){setGallery(null);setCartOpen(false);setMenu(false)}};window.addEventListener("keydown",fn);return()=>window.removeEventListener("keydown",fn)},[]);
 useEffect(()=>{if(!("IntersectionObserver" in window))return;const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll(".reveal").forEach(e=>io.observe(e));return()=>io.disconnect()},[category]);
 const order=()=>{const lines=products.filter(p=>cart[p.id]).map(p=>`• ${p.name} — ${cart[p.id]} unidade(s)`);const msg=`Olá! Conheci a Dona Alexandrina pelo site. Meu nome é ${name.trim()}. Gostaria de consultar disponibilidade e preços destes itens demonstrativos:\n\n${lines.join("\n")}\n\nPodem me informar os valores e as modalidades de atendimento disponíveis? Aguardo a confirmação da equipe. Obrigado!`;window.open(wa(msg),"_blank","noopener,noreferrer")};
 const add=(id:string)=>{change(id,(cart[id]||0)+1);setToast("Produto adicionado ao carrinho");window.setTimeout(()=>setToast(""),1800)};
 return <div className="site">
  <header className={`header ${scrolled||menu?"scrolled":""}`}>
   <div className="container header-inner"><a className="brand" href="#inicio" onClick={()=>setMenu(false)}>DONA ALEXANDRINA <small>{business.slogan}</small></a>
    <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(([n,h])=><a key={h} href={h}>{n}</a>)}<a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido</a></nav>
    <div className="header-actions"><button className="cart-toggle" onClick={()=>setCartOpen(true)} aria-label={`Abrir carrinho com ${total} itens`}><ShoppingBag size={21}/><span>{total}</span></button><button className="mobile-toggle" aria-label={menu?"Fechar menu":"Abrir menu"} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div>
   </div>
   {menu&&<nav className="mobile-nav" aria-label="Menu mobile">{navigation.map(([n,h])=><a href={h} key={h} onClick={()=>setMenu(false)}>{n}</a>)}<a href={wa()} target="_blank" rel="noopener noreferrer" onClick={()=>setMenu(false)}>Fazer pedido</a></nav>}
  </header>
  <main>
   <section id="inicio" className="hero"><img src={images.hero} alt="Fotografia ilustrativa de pães artesanais dourados" fetchPriority="high" width="1800" height="1200"/><div className="hero-shade"/><div className="container hero-content"><p className="eyebrow hero-rise">PADARIA & GASTRONOMIA • PARAÍSO, SP</p><h1 className="hero-rise">{business.slogan}</h1><p className="hero-sub hero-rise">Seu momento mais gostoso do dia, no coração do Paraíso.</p><div className="hero-buttons hero-rise"><a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora <ArrowRight size={18}/></a><a className="pill pill-outline" href="#cardapio">Explorar cardápio</a></div><span className="hero-caption">Fotografia gastronômica ilustrativa</span></div></section>
   <section id="sobre" className="section about container"><div className="about-photo reveal"><img src={images.croissant} alt="Croissant folhado em fotografia gastronômica ilustrativa" loading="lazy" width="1000" height="1100"/></div><div className="about-copy reveal"><span className="eyebrow">UM CONVITE ESPECIAL</span><h2>Um convite para saborear bons momentos.</h2><div className="gold-line"/><p>Na Dona Alexandrina, cada visita é uma oportunidade de transformar uma pausa do dia em um momento especial.</p><p>Localizada no Paraíso, em São Paulo, nossa padaria convida você a conhecer nossos sabores e encontrar aquele acompanhamento perfeito para o café, para uma pausa ou para compartilhar.</p><p>Venha nos visitar e descubra o sabor que abraça.</p><a className="text-link" href={maps} target="_blank" rel="noopener noreferrer">Como chegar <ArrowRight size={18}/></a></div></section>
   <section id="cardapio" className="section menu-section"><div className="container"><div className="section-heading reveal"><span className="eyebrow">NOSSA SELEÇÃO</span><h2>Sabores para cada momento.</h2><p>Encontre algo especial para deixar seu dia ainda mais gostoso.</p><p className="disclaimer">Cardápio demonstrativo: produtos, imagens, disponibilidade e preços sujeitos à confirmação da equipe.</p></div><div className="filters" role="group" aria-label="Filtrar produtos">{["Todos","Pães","Salgados","Doces","Bebidas"].map(c=><button key={c} aria-pressed={category===c} className={category===c?"active":""} onClick={()=>setCategory(c)}>{c}</button>)}</div><div className="product-grid">{products.filter(p=>category==="Todos"||p.category===category).map(p=><article className="product reveal" key={p.id}><div className="product-image">{p.image ? <img src={p.image} alt={`Fotografia gastronômica ilustrativa de ${p.name}`} loading="lazy" width="1000" height="800" onError={e=>{e.currentTarget.style.display="none";e.currentTarget.parentElement?.classList.add("photo-unavailable")}}/> : <div className="product-photo-pending" role="img" aria-label={`Fotografia de ${p.name} aguardando confirmação`}><span>FOTOGRAFIA EM ATUALIZAÇÃO</span><strong>{p.name}</strong><small>Imagem específica do produto em seleção</small></div>}</div><div className="product-info"><span className="eyebrow">{p.category} · SELEÇÃO ILUSTRATIVA</span><h3>{p.name}</h3><p>Opção ilustrativa. Consulte ingredientes e disponibilidade.</p><div className="product-bottom"><span>Consultar preço</span><button onClick={()=>add(p.id)} aria-label={`Adicionar ${p.name} ao carrinho`}><Plus size={18}/> Adicionar</button></div></div></article>)}</div><div className="menu-note">Os produtos apresentados são sugestões para demonstração, não um cardápio oficial.</div></div></section>
   <section id="galeria" className="section gallery-section container"><div className="section-heading reveal"><span className="eyebrow">UMA PAUSA PARA OS SENTIDOS</span><h2>Detalhes que despertam o apetite.</h2><p>Fotografias gastronômicas ilustrativas; não representam necessariamente produtos ou ambiente da padaria.</p></div><div className="gallery-grid">{[images.bread,images.coffee,images.cake,images.croissant,images.pastry,images.espresso].map((src,i)=><button key={i} className={`gallery-item gallery-item-${i}`} onClick={()=>setGallery(src)} aria-label={`Ampliar fotografia gastronômica ${i+1}`}><img src={src} alt={["Pães artesanais","Café","Doce artesanal","Croissant","Preparação gastronômica","Café expresso"][i]+" — imagem ilustrativa"} loading="lazy" width="1000" height="1000"/></button>)}</div></section>
   <section className="invitation"><div className="container reveal"><span className="eyebrow">DONA ALEXANDRINA</span><h2>Seu próximo momento especial começa aqui.</h2><p>Consulte nossos sabores diretamente com a equipe.</p><a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora <ArrowRight size={18}/></a></div></section>
   <section id="localizacao" className="section where-section">
    <div className="container where-container">
      <div className="section-heading reveal">
        <span className="eyebrow">VENHA NOS VISITAR</span>
        <h2>Onde estamos</h2>
        <p className="where-address"><MapPin size={22} aria-hidden="true" /> {business.address}</p>
      </div>
      <div className="where-map reveal">
        <iframe title="Localização da Dona Alexandrina no Google Maps — Rua Sampaio Viana, 409" src={embed} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
      </div>
      <a className="pill pill-dark where-link" href={maps} target="_blank" rel="noopener noreferrer"><MapPin size={18}/> Abrir no Google Maps <ArrowRight size={17}/></a>
    </div>
   </section>
   <section className="section contact-section"><div className="container contact-grid"><div id="contato" className="reveal"><span className="eyebrow">VISITE-NOS</span><h2>Venha conhecer a Dona Alexandrina.</h2><div className="contact-detail"><MapPin/><div><strong>Endereço</strong><p>{business.address}</p></div></div><div className="contact-detail"><Clock3/><div><strong>Funcionamento informado</strong><p>{business.hours}</p></div></div><div className="contact-detail"><MessageCircle/><div><strong>Contato</strong><p><a href={`tel:+${business.whatsapp}`}>{business.phone}</a></p></div></div><div className="contact-buttons"><a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora</a><a className="pill pill-dark" href={maps} target="_blank" rel="noopener noreferrer">Traçar rota <ArrowRight size={17}/></a></div></div><div className="contact-editorial reveal"><img src={images.coffee} alt="Café servido em fotografia gastronômica ilustrativa" loading="lazy" width="1000" height="1000"/><div><span className="eyebrow">UM MOMENTO DE ACONCHEGO</span><p>Uma pausa especial no coração do Paraíso.</p></div></div></div></section>
  </main>
  <footer><div className="container footer-grid"><div><strong className="footer-brand">DONA ALEXANDRINA</strong><p>{business.slogan}</p><a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora</a></div><nav aria-label="Links do rodapé">{navigation.map(([n,h])=><a key={h} href={h}>{n}</a>)}</nav><div><strong>Encontre-nos</strong><p>{business.address}</p><p>{business.hours}</p><p>{business.phone}</p></div></div><div className="container copyright">© {new Date().getFullYear()} Dona Alexandrina. Todos os direitos reservados.</div></footer>
  <div className="floating-actions"><button className="floating-cart" onClick={()=>setCartOpen(true)} aria-label={`Abrir carrinho: ${total} itens`}><ShoppingBag size={23}/><span>{total}</span></button><a className="floating-wa" href={wa()} target="_blank" rel="noopener noreferrer" aria-label="Fale com nossa equipe pelo WhatsApp" title="Fale com nossa equipe"><MessageCircle size={26}/></a></div>
  {toast&&<div role="status" className="toast">{toast}</div>}
  {gallery&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Fotografia ampliada" onClick={()=>setGallery(null)}><button aria-label="Fechar fotografia" onClick={()=>setGallery(null)}><X/></button><img src={gallery} alt="Fotografia gastronômica ilustrativa ampliada" onClick={e=>e.stopPropagation()}/></div>}
  {cartOpen&&<div className="cart-backdrop" onClick={()=>setCartOpen(false)}><aside className="cart-panel" role="dialog" aria-modal="true" aria-label="Carrinho de consulta" onClick={e=>e.stopPropagation()}><div className="cart-head"><div><span className="eyebrow">SEU MOMENTO ESPECIAL</span><h2>Meu carrinho ({total})</h2></div><button onClick={()=>setCartOpen(false)} aria-label="Fechar carrinho"><X/></button></div><p className="cart-disclaimer">Pedido de consulta: preços, disponibilidade e modalidades dependem da confirmação da equipe. Nenhuma compra é concluída pelo site.</p><div className="cart-items">{products.filter(p=>cart[p.id]).map(p=><div className="cart-item" key={p.id}><img src={p.image} alt="" width="80" height="80"/><div><strong>{p.name}</strong><small>Consultar preço</small><div className="quantity"><button aria-label={`Diminuir ${p.name}`} onClick={()=>change(p.id,cart[p.id]-1)}><Minus size={16}/></button><span>{cart[p.id]}</span><button aria-label={`Aumentar ${p.name}`} onClick={()=>change(p.id,cart[p.id]+1)}><Plus size={16}/></button><button className="remove" aria-label={`Remover ${p.name}`} onClick={()=>change(p.id,0)}><Trash2 size={16}/></button></div></div></div>)}{total===0&&<p>Seu carrinho está vazio. Explore o cardápio demonstrativo para começar.</p>}</div><div className="cart-footer"><label htmlFor="customer-name">Seu nome</label><input id="customer-name" value={name} maxLength={80} onChange={e=>setName(e.target.value)} placeholder="Como podemos chamar você?"/><p>Consulte retirada ou entrega diretamente com a equipe.</p><button className="pill pill-gold" disabled={!total||!name.trim()} onClick={order}>Consultar pedido no WhatsApp <ArrowRight size={18}/></button></div></aside></div>}
 </div>
}
