import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Bike, Check, Heart, Menu, Minus, PackageCheck, Plus, Search, ShieldCheck, ShoppingBag, Sparkles, Trash2, Truck, X } from "lucide-react";
import "../shop.css";

export const Route = createFileRoute("/")({ component: Store });

type Product = { id: number; name: string; category: string; price: number; image: string; badge?: string };
const images = {
 trampoline: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=700&q=85",
 bike: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=700&q=85",
 toy: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=700&q=85",
 playground: "https://images.unsplash.com/photo-1564429238817-393bd4286b2d?w=700&q=85",
 tricycle: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=700&q=85",
 inflatable: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=700&q=85",
 blocks: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=700&q=85",
 scooter: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=700&q=85",
};
const products: Product[] = [
 { id:1,name:"Cama elástica infantil com rede de proteção",category:"Camas elásticas",price:1299.9,image:images.trampoline,badge:"DESTAQUE" },
 { id:2,name:"Bicicleta infantil para novas aventuras",category:"Bicicletas",price:649.9,image:images.bike,badge:"POPULAR" },
 { id:3,name:"Kit de brinquedos educativos coloridos",category:"Brinquedos",price:119.9,image:images.toy },
 { id:4,name:"Playground infantil para muita diversão",category:"Playground",price:2499.9,image:images.playground,badge:"NOVIDADE" },
 { id:5,name:"Velocípede infantil três rodas",category:"Velocípedes",price:279.9,image:images.tricycle },
 { id:6,name:"Brinquedo inflável para recreação",category:"Infláveis",price:899.9,image:images.inflatable },
 { id:7,name:"Blocos de montar educativos",category:"Brinquedos",price:89.9,image:images.blocks,badge:"OFERTA" },
 { id:8,name:"Patinete infantil para passeio",category:"Velocípedes",price:329.9,image:images.scooter },
];
const categories = [
 {name:"Camas elásticas",image:images.trampoline},
 {name:"Bicicletas",image:images.bike},
 {name:"Velocípedes",image:images.tricycle},
 {name:"Brinquedos",image:images.blocks},
 {name:"Playground",image:images.playground},
];
const money=(n:number)=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(n);
function Store(){
 const [category,setCategory]=useState("Todos");
 const [query,setQuery]=useState("");
 const [sort,setSort]=useState("featured");
 const [cart,setCart]=useState<Record<number,number>>({});
 const [favorites,setFavorites]=useState<number[]>([]);
 const [open,setOpen]=useState(false);
 const [ready,setReady]=useState(false);
 useEffect(()=>{try{setCart(JSON.parse(localStorage.getItem("opa-cart")||"{}"));setFavorites(JSON.parse(localStorage.getItem("opa-favorites")||"[]"));}catch{}setReady(true)},[]);
 useEffect(()=>{if(ready)localStorage.setItem("opa-cart",JSON.stringify(cart))},[cart,ready]);
 useEffect(()=>{if(ready)localStorage.setItem("opa-favorites",JSON.stringify(favorites))},[favorites,ready]);
 const visible=useMemo(()=>{let list=products.filter(p=>(category==="Todos"||p.category===category)&&(`${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())));if(sort==="low")list=[...list].sort((a,b)=>a.price-b.price);if(sort==="high")list=[...list].sort((a,b)=>b.price-a.price);return list},[category,query,sort]);
 const qty=Object.values(cart).reduce((a,b)=>a+b,0);
 const total=products.reduce((a,p)=>a+p.price*(cart[p.id]||0),0);
 const add=(id:number)=>setCart(prev=>({...prev,[id]:(prev[id]||0)+1}));
 const change=(id:number,delta:number)=>setCart(prev=>{const next={...prev};next[id]=Math.max(0,(next[id]||0)+delta);if(!next[id])delete next[id];return next});
 const jump=(cat:string)=>{setCategory(cat);document.getElementById("catalogo")?.scrollIntoView({behavior:"smooth"})};
 return <main className="oc">
  <div className="top">✨ OPA! A diversão começa aqui — conheça nosso catálogo de brinquedos e lazer</div>
  <header className="wrap header">
   <a href="/" className="brand" aria-label="OPA CONNECT início">OPA<span> </span><b>CONNECT.</b></a>
   <label className="search"><Search size={19}/><input aria-label="Buscar produtos" value={query} onChange={e=>setQuery(e.target.value)} placeholder="O que você está procurando?"/></label>
   <div className="actions"><button className="round" aria-label="Ver favoritos" onClick={()=>{setCategory("Todos");setQuery("");document.getElementById("catalogo")?.scrollIntoView({behavior:"smooth"})}}><Heart size={20}/></button><button className="round" aria-label={`Abrir carrinho com ${qty} itens`} onClick={()=>setOpen(true)}><ShoppingBag size={20}/>{qty>0&&<span className="count">{qty}</span>}</button></div>
  </header>
  <div className="wrap"><label className="search mobileSearch"><Search size={18}/><input aria-label="Buscar produtos" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Busque brinquedos, bicicletas..."/></label></div>
  <nav className="nav" aria-label="Categorias"><div className="wrap navinner"><button onClick={()=>jump("Todos")}><Menu size={15} style={{display:"inline",marginRight:7}}/>Todos os produtos</button>{["Camas elásticas","Bicicletas","Velocípedes","Brinquedos","Playground","Infláveis"].map(c=><button key={c} onClick={()=>jump(c)}>{c}</button>)}</div></nav>
  <div className="wrap">
   <section className="hero"><div className="heroCopy"><span className="eyebrow">BEM-VINDO À OPA CONNECT</span><h1>Um mundo de <span>diversão</span> para explorar.</h1><p>Brinquedos, bicicletas, camas elásticas e muito mais. Descubra ideias para momentos inesquecíveis.</p><button className="primary" onClick={()=>jump("Todos")}>Explorar produtos <ArrowRight size={17}/></button></div><img className="heroArt" src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1100&q=85" alt="Brinquedos coloridos para crianças"/></section>
   <section className="benefits" aria-label="Diferenciais"><div className="benefit"><PackageCheck size={26}/><div><strong>Catálogo variado</strong><small>Opções para brincar e explorar</small></div></div><div className="benefit"><ShieldCheck size={26}/><div><strong>Escolha com tranquilidade</strong><small>Conheça os detalhes de cada item</small></div></div><div className="benefit"><Truck size={26}/><div><strong>Consulte a entrega</strong><small>Condições a confirmar com a loja</small></div></div></section>
   <section><div className="sectionHead"><div><small>EXPLORE POR TIPO</small><h2>Encontre a diversão ideal</h2></div><span style={{fontSize:12,color:"#8b95a5"}}>Escolha sua categoria favorita</span></div><div className="categories">{categories.map(c=><button key={c.name} className={`category ${category===c.name?"active":""}`} onClick={()=>jump(c.name)}><img src={c.image} alt={c.name} loading="lazy"/><strong>{c.name}</strong></button>)}</div></section>
   <section id="catalogo"><div className="sectionHead"><div><small>SELEÇÃO OPA CONNECT</small><h2>Produtos em destaque</h2></div><span style={{fontSize:12,color:"#8b95a5"}}>{visible.length} produtos</span></div><div className="filters"><div className="chips">{["Todos","Camas elásticas","Bicicletas","Velocípedes","Brinquedos","Playground","Infláveis"].map(c=><button className={`chip ${category===c?"selected":""}`} key={c} onClick={()=>setCategory(c)}>{c}</button>)}</div><select aria-label="Ordenar produtos" value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Destaques</option><option value="low">Menor preço</option><option value="high">Maior preço</option></select></div>
   <div className="products">{visible.map(p=><article className="product" key={p.id}><div className="photo"><img src={p.image} alt={p.name} loading="lazy"/>{p.badge&&<span className="tag">{p.badge}</span>}<button className={`heart ${favorites.includes(p.id)?"on":""}`} aria-label={favorites.includes(p.id)?"Remover dos favoritos":"Adicionar aos favoritos"} onClick={()=>setFavorites(prev=>prev.includes(p.id)?prev.filter(x=>x!==p.id):[...prev,p.id])}><Heart size={17} fill={favorites.includes(p.id)?"currentColor":"none"}/></button></div><div className="info"><small>{p.category}</small><h3>{p.name}</h3><div className="price">{money(p.price)}</div><div className="priceNote">Valor ilustrativo · confirmar antes da venda</div><button className="add" onClick={()=>add(p.id)}><Plus size={16}/> Adicionar ao carrinho</button></div></article>)}</div>{visible.length===0&&<div className="empty">Nenhum produto encontrado. Tente outra busca ou categoria.</div>}</section>
   <section className="banner"><div><h2>Prontos para uma nova aventura?</h2><p>Encontre opções para brincar, aprender e aproveitar cada momento.</p></div><button onClick={()=>jump("Todos")}>Ver catálogo completo →</button></section>
  </div>
  <footer className="footer"><div className="wrap"><div><div className="brand">OPA <b>CONNECT.</b></div><p>Um universo de diversão em cada descoberta.</p></div><div><strong>Informações importantes</strong><p>Loja demonstrativa: fotos, produtos e preços ilustrativos.<br/>Pagamento, estoque, frete e contato comercial ainda precisam de configuração.</p></div><div><strong>Explore</strong><p><button onClick={()=>jump("Todos")}>Todos os produtos</button></p><p><button onClick={()=>setOpen(true)}>Meu carrinho</button></p></div></div></footer>
  {open&&<><button className="overlay" aria-label="Fechar carrinho" onClick={()=>setOpen(false)}></button><aside className="drawer" role="dialog" aria-modal="true" aria-label="Carrinho de compras"><div className="drawerHeader"><h2>Meu carrinho ({qty})</h2><button aria-label="Fechar" onClick={()=>setOpen(false)}><X size={22}/></button></div><div className="drawerBody">{qty===0?<div className="empty"><ShoppingBag size={40} style={{margin:"0 auto 15px"}}/>Seu carrinho está vazio.<p style={{marginTop:10}}>Explore nossos produtos e adicione seus favoritos!</p><button className="primary" style={{marginTop:20}} onClick={()=>setOpen(false)}>Continuar comprando</button></div>:products.filter(p=>cart[p.id]).map(p=><div className="cartLine" key={p.id}><img src={p.image} alt={p.name}/><div style={{flex:1}}><strong style={{fontSize:13}}>{p.name}</strong><p style={{fontSize:13,fontWeight:800,marginTop:6}}>{money(p.price*(cart[p.id]||0))}</p><div className="qty"><button aria-label="Diminuir quantidade" onClick={()=>change(p.id,-1)}><Minus size={13}/></button><span>{cart[p.id]}</span><button aria-label="Aumentar quantidade" onClick={()=>change(p.id,1)}><Plus size={13}/></button><button aria-label="Remover item" style={{marginLeft:"auto",color:"#d14c5d"}} onClick={()=>setCart(prev=>{const n={...prev};delete n[p.id];return n})}><Trash2 size={15}/></button></div></div></div>)}</div><div className="drawerFoot"><div style={{display:"flex",justifyContent:"space-between",fontWeight:900}}><span>Subtotal ilustrativo</span><span>{money(total)}</span></div><button className="primary" disabled>Finalizar pedido — em configuração</button><p className="notice">O checkout ficará disponível após cadastrar dados reais da loja, formas de pagamento e entrega. Nenhuma cobrança é realizada nesta demonstração.</p></div></aside></>}
 </main>;
}
