import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Clock3, MapPin, Menu, MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

const business = {
 name: "Lido Café", slogan: "A escolha certa perto de você",
 address: "R. Manoel Coelho, 506 - Lj 3 - Centro, São Caetano do Sul - SP, 09510-101, Brasil",
 phone: "(11) 2376-8739", whatsapp: "551123768739", hours: "Segunda a sábado, das 9h às 19h",
};
const wa = (message = "Olá! Conheci a Lido Café pelo site e gostaria de consultar o cardápio.") => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;
const embed = `https://www.google.com/maps?q=${encodeURIComponent(business.address)}&z=17&output=embed`;
const photo = (id: string, width = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const images = {
 hero: photo("photo-1442512595331-e89e73853f31", 1800),
 bread: photo("photo-1442512595331-e89e73853f31"),
 croissant: photo("photo-1555507036-ab1f4038808a"),
 coffee: photo("photo-1509042239860-f550ce710b93"),
 pastry: photo("photo-1484723091739-30a097e8f929"),
 cake: photo("photo-1464305795204-6f5bbfc7fb81"),
 sandwich: photo("photo-1528735602780-2552fd46c7af"),
 espresso: photo("photo-1511920170033-f8396924c348"),
 cappuccino: photo("photo-1534778101976-62847782c213"),
 latte: photo("photo-1461023058943-07fcbe16d735"),
 cookie: photo("photo-1499636136210-6f4ee915583e"),
 paodequeijo: photo("photo-1598373182133-52452f7691ef"),
 chocolate: photo("photo-1542990253-0b8be8f0f0ed"),
 juice: photo("photo-1600271886742-f049cd451bba"),
 tea: photo("photo-1544787219-7f47ccb76574"),
};
type Product = { id: string; name: string; category: string; image: string };
const products: Product[] = [
 {id:"c1",name:"Café expresso",category:"Cafés",image:images.espresso},
 {id:"c2",name:"Café coado",category:"Cafés",image:images.coffee},
 {id:"c3",name:"Cappuccino",category:"Cafés",image:images.cappuccino},
 {id:"c4",name:"Latte",category:"Cafés",image:images.latte},
 {id:"d1",name:"Bolo artesanal",category:"Doces",image:images.cake},
 {id:"d2",name:"Croissant",category:"Doces",image:images.croissant},
 {id:"d3",name:"Cookie",category:"Doces",image:images.cookie},
 {id:"s1",name:"Sanduíche",category:"Salgados",image:images.sandwich},
 {id:"s2",name:"Pão de queijo",category:"Salgados",image:images.paodequeijo},
 {id:"b1",name:"Chocolate quente",category:"Bebidas",image:images.chocolate},
 {id:"b2",name:"Suco natural",category:"Bebidas",image:images.juice},
 {id:"b3",name:"Chá",category:"Bebidas",image:images.tea},
];
const navigation = [["Início","#inicio"],["Sobre","#sobre"],["Cardápio","#cardapio"],["Galeria","#galeria"],["Localização","#localizacao"],["Contato","#contato"]] as const;
export const Route = createFileRoute("/")({
 head: () => ({
  meta: [
   {title:"Lido Café | Cafeteria no Centro de São Caetano do Sul"},
   {name:"description",content:"Conheça o Lido Café na R. Manoel Coelho, 506 - Lj 3, Centro de São Caetano do Sul. A escolha certa perto de você. Consulte cafés e acompanhamentos pelo WhatsApp."},
   {property:"og:title",content:"Lido Café | A escolha certa perto de você"},
   {property:"og:description",content:"Cafeteria no Centro de São Caetano do Sul. Consulte nossos produtos e fale com a equipe."},
   {property:"og:type",content:"website"},
   {property:"og:image",content:images.hero},
  ],
  scripts:[{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"CafeOrCoffeeShop",name:business.name,address:{"@type":"PostalAddress",streetAddress:"R. Manoel Coelho, 506 - Lj 3",addressLocality:"São Caetano do Sul",addressRegion:"SP",postalCode:"09510-101",addressCountry:"BR"},telephone:"+551123768739",openingHoursSpecification:[{"@type":"OpeningHoursSpecification",dayOfWeek:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],opens:"09:00",closes:"19:00"}]})}],
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
 useEffect(()=>{if(!("IntersectionObserver" in window)||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;document.documentElement.classList.add("motion-ready");const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll(".reveal").forEach(e=>io.observe(e));return()=>{io.disconnect();document.documentElement.classList.remove("motion-ready")}},[category]);
 useEffect(()=>{const t=window.setTimeout(()=>setTooltip(true),3000);return()=>window.clearTimeout(t)},[]);
 const order=()=>{const lines=products.filter(p=>cart[p.id]).map(p=>`• ${p.name} — ${cart[p.id]} unidade(s)`);const msg=`Olá! Conheci a Lido Café pelo site. Meu nome é ${name.trim()}. Gostaria de consultar disponibilidade e preços destes itens demonstrativos:\n\n${lines.join("\n")}\n\nPodem me informar os valores e as modalidades de atendimento disponíveis? Aguardo a confirmação da equipe. Obrigado!`;window.open(wa(msg),"_blank","noopener,noreferrer")};
 const add=(id:string)=>{change(id,(cart[id]||0)+1);setToast("Produto adicionado ao carrinho");window.setTimeout(()=>setToast(""),1800)};
 return <div className="site"><div className="scroll-progress" style={{width:`${progress}%`}} aria-hidden="true"/>
  <header className={`header ${scrolled||menu?"scrolled":""}`}>
   <div className="container header-inner"><a className="brand" href="#inicio" onClick={()=>setMenu(false)}>LIDO CAFÉ <small>{business.slogan}</small></a>
    <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(([n,h])=><a key={h} href={h}>{n}</a>)}<a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido</a></nav>
    <div className="header-actions"><button className="cart-toggle" onClick={()=>setCartOpen(true)} aria-label={`Abrir carrinho com ${total} itens`}><ShoppingBag size={21}/><span>{total}</span></button><button className="mobile-toggle" aria-label={menu?"Fechar menu":"Abrir menu"} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div>
   </div>
   {menu&&<nav className="mobile-nav" aria-label="Menu mobile">{navigation.map(([n,h])=><a href={h} key={h} onClick={()=>setMenu(false)}>{n}</a>)}<a href={wa()} target="_blank" rel="noopener noreferrer" onClick={()=>setMenu(false)}>Fazer pedido</a></nav>}
  </header>
  <main>
   <section id="inicio" className="hero cinematic-hero"><img className="lido-hero-photo" src={images.hero} alt="Fotografia ilustrativa de café — vídeo cinematográfico de preparo pendente" fetchPriority="high" /><div className="hero-asset-note">Vídeo cinematográfico de preparo em produção</div><div className="hero-shade"/><div className="container hero-content"><p className="eyebrow hero-rise">CAFETERIA • CENTRO DE SÃO CAETANO DO SUL</p><h1 className="hero-rise">{business.slogan}</h1><p className="hero-sub hero-rise">Cafés e acompanhamentos para transformar sua pausa no Centro de São Caetano do Sul.</p><div className="hero-buttons hero-rise"><a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora <ArrowRight size={18}/></a><a className="pill pill-outline" href="#cardapio">Explorar cardápio</a></div><span className="hero-caption">Fotografia ilustrativa · animação cinematográfica pendente</span></div></section>
   <section id="sobre" className="section about container"><div className="about-photo reveal"><img src={images.coffee} alt="Café folhado em fotografia gastronômica ilustrativa" loading="lazy" width="1000" height="1100"/></div><div className="about-copy reveal"><span className="eyebrow">UM CONVITE ESPECIAL</span><h2>Seu momento de café no coração de São Caetano.</h2><div className="gold-line"/><p>Na correria do dia a dia, encontrar um lugar para fazer uma pausa faz toda a diferença. O Lido Café está localizado na Rua Manoel Coelho, no Centro de São Caetano do Sul.</p><p>Conheça nossa seleção ilustrativa de cafés, doces e salgados e converse diretamente com a equipe para confirmar o cardápio disponível.</p><p>Sem complicação: escolha o que desperta sua vontade e entre em contato pelo WhatsApp.</p><a className="text-link" href={maps} target="_blank" rel="noopener noreferrer">Como chegar <ArrowRight size={18}/></a></div></section>
   <section id="cardapio" className="section menu-section"><div className="container"><div className="section-heading reveal"><span className="eyebrow">NOSSA SELEÇÃO</span><h2>Seu café, do seu jeito.</h2><p>Explore cafés e acompanhamentos. Consulte o cardápio atualizado com a equipe.</p><p className="disclaimer">Cardápio demonstrativo: produtos, imagens, disponibilidade e preços sujeitos à confirmação da equipe.</p></div><div className="filters" role="group" aria-label="Filtrar produtos">{["Todos","Cafés","Doces","Salgados","Bebidas"].map(c=><button key={c} aria-pressed={category===c} className={category===c?"active":""} onClick={()=>setCategory(c)}>{c}</button>)}</div><div className="product-grid">{products.filter(p=>category==="Todos"||p.category===category).map(p=><article className="product reveal" key={p.id} style={{transitionDelay:`${(products.filter(item=>category==="Todos"||item.category===category).indexOf(p)%3)*90}ms`}}><div className="product-image">{p.image ? <img src={p.image} alt={`Fotografia gastronômica ilustrativa de ${p.name}`} loading="lazy" width="1000" height="800" onError={e=>{e.currentTarget.style.display="none";e.currentTarget.parentElement?.classList.add("photo-unavailable");e.currentTarget.parentElement?.setAttribute("data-product",p.name)}}/> : <div className="product-photo-pending" role="img" aria-label={`Fotografia de ${p.name} aguardando confirmação`}><span>FOTO DO PRODUTO EM SELEÇÃO</span><strong>{p.name}</strong><small>Imagem específica do produto em seleção</small></div>}</div><div className="product-info"><span className="eyebrow">{p.category} · SELEÇÃO ILUSTRATIVA</span><h3>{p.name}</h3><p>Opção ilustrativa. Consulte ingredientes e disponibilidade.</p><div className="product-bottom"><span>Consultar preço</span><button onClick={()=>add(p.id)} aria-label={`Adicionar ${p.name} ao carrinho`}><Plus size={18}/> Adicionar</button></div></div></article>)}</div><div className="menu-note">Itens apresentados como sugestões visuais; confirme o cardápio e os valores diretamente com a equipe.</div></div></section>
   <section id="galeria" className="section gallery-section container"><div className="section-heading reveal"><span className="eyebrow">UMA PAUSA PARA OS SENTIDOS</span><h2>O prazer mora nos detalhes.</h2><p>Inspirações gastronômicas ilustrativas. Fotografias oficiais do espaço e dos produtos poderão substituir estas imagens.</p></div><div className="gallery-grid">{[images.bread,images.coffee,images.cake,images.croissant,images.pastry,images.espresso].map((src,i)=><button key={i} className={`gallery-item gallery-item-${i}`} onClick={()=>setGallery(src)} aria-label={`Ampliar fotografia gastronômica ${i+1}`}><img src={src} alt={["Pães artesanais","Café","Doce artesanal","Croissant","Preparação gastronômica","Café expresso"][i]+" — imagem ilustrativa"} loading="lazy" width="1000" height="1000"/></button>)}</div></section>
   <section className="invitation"><div className="container reveal"><span className="eyebrow">LIDO CAFÉ</span><h2>Seu momento merece um bom café.</h2><p>Consulte nossos sabores diretamente com a equipe.</p><a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora <ArrowRight size={18}/></a></div></section>
   <section id="localizacao" className="section where-section">
    <div className="container where-container">
      <div className="section-heading reveal">
        <span className="eyebrow">VENHA NOS VISITAR</span>
        <h2>Onde estamos</h2>
        <p className="where-address"><MapPin size={22} aria-hidden="true" /> {business.address}</p>
      </div>
      <div className="where-map reveal">
        <iframe title="Localização da Lido Café no Google Maps — Rua Cel. Xavier de Toledo" src={embed} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
      </div>
      <a className="pill pill-dark where-link" href={maps} target="_blank" rel="noopener noreferrer"><MapPin size={18}/> Abrir no Google Maps <ArrowRight size={17}/></a>
    </div>
   </section>
   <section className="section contact-section"><div className="container contact-grid"><div id="contato" className="reveal"><span className="eyebrow">VISITE-NOS</span><h2>Encontre a Lido Café.</h2><div className="contact-detail"><MapPin/><div><strong>Endereço</strong><p>{business.address}</p></div></div><div className="contact-detail"><Clock3/><div><strong>Funcionamento informado</strong><p>{business.hours}</p></div></div><div className="contact-detail"><MessageCircle/><div><strong>Contato</strong><p><a href={`tel:+${business.whatsapp}`}>{business.phone}</a></p></div></div><div className="contact-buttons"><a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora</a><a className="pill pill-dark" href={maps} target="_blank" rel="noopener noreferrer">Traçar rota <ArrowRight size={17}/></a></div></div><div className="contact-editorial reveal"><img src={images.coffee} alt="Café servido em fotografia gastronômica ilustrativa" loading="lazy" width="1000" height="1000"/><div><span className="eyebrow">UM MOMENTO DE ACONCHEGO</span><p>Uma pausa no coração de São Caetano.</p></div></div></div></section>
  </main>
  <footer><div className="container footer-grid"><div><strong className="footer-brand">LIDO CAFÉ</strong><p>{business.slogan}</p><a className="pill pill-gold" href={wa()} target="_blank" rel="noopener noreferrer">Fazer pedido agora</a></div><nav aria-label="Links do rodapé">{navigation.map(([n,h])=><a key={h} href={h}>{n}</a>)}</nav><div><strong>Encontre-nos</strong><p>{business.address}</p><p>{business.hours}</p><p>{business.phone}</p></div></div><div className="container copyright">© {new Date().getFullYear()} Lido Café. Todos os direitos reservados.</div></footer>
  <div className="floating-actions"><button className="floating-cart" onClick={()=>setCartOpen(true)} aria-label={`Abrir carrinho: ${total} itens`}><ShoppingBag size={23}/><span>{total}</span></button><div className="wa-wrap"><span className={`wa-tooltip ${tooltip?"show":""}`} role="status">Fale conosco</span><a className="floating-wa" href={wa("Olá! Conheci a Lido Café pelo site e gostaria de saber mais sobre os produtos.")} target="_blank" rel="noopener noreferrer" aria-label="Fale conosco pelo WhatsApp"><MessageCircle size={26}/></a></div></div>
  {toast&&<div role="status" className="toast">{toast}</div>}
  {gallery&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Fotografia ampliada" onClick={()=>setGallery(null)}><button aria-label="Fechar fotografia" onClick={()=>setGallery(null)}><X/></button><img src={gallery} alt="Fotografia gastronômica ilustrativa ampliada" onClick={e=>e.stopPropagation()}/></div>}
  {cartOpen&&<div className="cart-backdrop" onClick={()=>setCartOpen(false)}><aside className="cart-panel" role="dialog" aria-modal="true" aria-label="Carrinho de consulta" onClick={e=>e.stopPropagation()}><div className="cart-head"><div><span className="eyebrow">SEU MOMENTO ESPECIAL</span><h2>Meu carrinho ({total})</h2></div><button onClick={()=>setCartOpen(false)} aria-label="Fechar carrinho"><X/></button></div><p className="cart-disclaimer">Pedido de consulta: preços, disponibilidade e modalidades dependem da confirmação da equipe. Nenhuma compra é concluída pelo site.</p><div className="cart-items">{products.filter(p=>cart[p.id]).map(p=><div className="cart-item" key={p.id}>{p.image?<img src={p.image} alt="" width="80" height="80" onError={e=>{e.currentTarget.style.display="none"}}/>:<span className="cart-image-placeholder" aria-hidden="true"/>}<div><strong>{p.name}</strong><small>Consultar preço</small><div className="quantity"><button aria-label={`Diminuir ${p.name}`} onClick={()=>change(p.id,cart[p.id]-1)}><Minus size={16}/></button><span>{cart[p.id]}</span><button aria-label={`Aumentar ${p.name}`} onClick={()=>change(p.id,cart[p.id]+1)}><Plus size={16}/></button><button className="remove" aria-label={`Remover ${p.name}`} onClick={()=>change(p.id,0)}><Trash2 size={16}/></button></div></div></div>)}{total===0&&<p>Seu carrinho está vazio. Explore o cardápio demonstrativo para começar.</p>}</div><div className="cart-footer"><label htmlFor="customer-name">Seu nome</label><input id="customer-name" value={name} maxLength={80} onChange={e=>setName(e.target.value)} placeholder="Como podemos chamar você?"/><p>Consulte retirada ou entrega diretamente com a equipe.</p><button className="pill pill-gold" disabled={!total||!name.trim()} onClick={order}>Consultar pedido no WhatsApp <ArrowRight size={18}/></button></div></aside></div>}
 </div>
}
