/* Personalize os dados e o cardápio neste bloco. Avaliações abaixo são exemplos e devem ser substituídas por reais. */
const CONFIG={name:"[NOME DA HAMBURGUERIA]",whatsapp:"[WHATSAPP]",address:"[ENDEREÇO]",city:"[CIDADE]",instagram:"[INSTAGRAM]",googleReviews:"https://www.google.com/maps",deliveryFee:5,deliveryMinutes:40,deliveryArea:"[CIDADE] e região",foundedYear:2011,businessHours:{0:["18:00","23:00"],1:["18:00","23:00"],2:["18:00","23:00"],3:["18:00","23:00"],4:["18:00","23:00"],5:["18:00","23:30"],6:["18:00","23:30"]}};
const MENU=[
{id:"burger-normal",name:"Hambúrguer Tradicional",category:"Burgers",description:"Pão macio, hambúrguer bovino grelhado, salada fresca e molho da casa.",price:24.90,image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=90",featured:true,addons:[{name:"Hambúrguer extra",price:9},{name:"Queijo extra",price:4.5},{name:"Bacon extra",price:6},{name:"Molho extra",price:1.5}]},
{id:"x-salada",name:"X-Salada",category:"Burgers",description:"Hambúrguer bovino, queijo, alface, tomate e maionese da casa.",price:29.90,image:"https://i0.wp.com/anamariabraga.globo.com/wp-content/uploads/2016/11/x-salada-classico.jpg?fit=1200%2C675&ssl=1",addons:[{name:"Queijo extra",price:4.5},{name:"Ovo",price:3},{name:"Bacon extra",price:6}]},
{id:"double-burger",name:"Duplo Burger",category:"Burgers",description:"Dois hambúrgueres bovinos, queijo, salada crocante e molho especial no pão tostado.",price:34.90,image:"https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=1200&q=90",addons:[{name:"Terceiro hambúrguer",price:9},{name:"Queijo extra",price:4.5},{name:"Bacon extra",price:6}]},
{id:"triple-burger",name:"Triplo Burger",category:"Burgers",description:"Três hambúrgueres suculentos, salada fresca e molho da casa.",price:42.90,image:"https://slice-menu-assets-prod.imgix.net/108481/1707069235_c09c7fb27e?fit=crop&h=900&w=900",featured:true,addons:[{name:"Quarto hambúrguer",price:9},{name:"Queijo extra",price:4.5},{name:"Bacon extra",price:6}]},
{id:"double-smash",name:"Duplo Smash",category:"Burgers",description:"Dois smash fininhos, bordas crocantes, queijo derretido, picles e molho especial.",price:36.90,image:"https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=90",addons:[{name:"Terceiro smash",price:9},{name:"Picles extra",price:1.5},{name:"Cheddar extra",price:4.5}]},
{id:"triple-smash",name:"Triplo Smash",category:"Burgers",description:"Três carnes smash empilhadas, queijo cheddar derretido escorrendo e bordas crocantes.",price:44.90,image:"https://1885ny.com/images/burger3.jpg",featured:true,addons:[{name:"Quarto smash",price:9},{name:"Cheddar extra",price:4.5},{name:"Bacon extra",price:6}]},
{id:"combo-individual",name:"Combo Individual",category:"Combos",description:"1 hambúrguer tradicional + batata frita + Coca-Cola lata 500 ml.",price:39.90,image:"https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=1200&q=90",featured:true,addons:[{name:"Trocar por Duplo Smash",price:12},{name:"Batata grande",price:5},{name:"Adicionar queijo",price:4.5}]},
{id:"combo-duplo",name:"Combo Duplo",category:"Combos",description:"2 hambúrgueres completos + batata frita grande + Coca-Cola 500 ml.",price:59.90,image:"https://images.squarespace-cdn.com/content/v1/64bff2ede59d0038ced4d2c3/1769801755074-34FIPKQW2TYAIYPPS6KK/pexels-eric-moura-859101902-33068080.jpg",addons:[{name:"Trocar por 2 Duplos Smash",price:20},{name:"Batata com cheddar e bacon",price:8},{name:"Coca-Cola extra 500 ml",price:7.5}]},
{id:"combo-smash",name:"Combo Triplo Smash",category:"Combos",description:"3 hambúrgueres Triplo Smash + batata grande + Coca-Cola 2 litros para compartilhar.",price:99.90,image:"https://1885ny.com/images/burger3.jpg",featured:true,addons:[{name:"Batata X com bacon e calabresa",price:12},{name:"Coca-Cola extra 2 litros",price:13},{name:"Molhos especiais",price:3}]},
{id:"fries",name:"Batata Frita Crocante",category:"Porções",description:"Batatas douradas e crocantes por fora, macias por dentro.",price:18.90,image:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=90",addons:[{name:"Porção grande",price:6},{name:"Cheddar cremoso",price:5},{name:"Bacon crocante",price:6}]},
{id:"potato-rings",name:"Rosquinhas de Batata",category:"Porções",description:"Rosquinhas de batata douradas e crocantes, perfeitas para compartilhar.",price:19.90,image:"https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=1000&q=90",addons:[{name:"Porção grande",price:6},{name:"Molho especial",price:1.5}]},
{id:"loaded-fries",name:"X-Batata Completa",category:"Porções",description:"Porção generosa de batata frita com cheddar cremoso, bacon crocante, calabresa acebolada, queijo e molhos especiais.",price:32.90,image:"https://img0.didiglobal.com/static/soda_public/img_adff3146f0fcf52cd0a4b469d624c691.jpeg",featured:true,addons:[{name:"Mais bacon",price:5},{name:"Mais calabresa",price:5},{name:"Cheddar extra",price:4},{name:"Molho barbecue",price:1.5},{name:"Molho de alho",price:1.5},{name:"Molho picante",price:1.5},{name:"Queijo extra",price:4.5}]},
{id:"onion-rings",name:"Onion Rings",category:"Porções",description:"Anéis de cebola empanados, dourados e crocantes.",price:21.90,image:"https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=1000&q=90",addons:[{name:"Molho barbecue",price:1.5},{name:"Molho de alho",price:1.5}]},
{id:"coke-glass",name:"Coca-Cola Garrafa de Vidro",category:"Bebidas",description:"Coca-Cola gelada na clássica garrafa de vidro.",price:7.00,image:"https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=1000&q=90",addons:[]},
{id:"coke-500",name:"Coca-Cola Lata 500 ml",category:"Bebidas",description:"Coca-Cola gelada em lata de 500 ml.",price:7.50,image:"https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=1000&q=90",addons:[]},
{id:"coke-zero-can",name:"Coca-Cola Zero Lata",category:"Bebidas",description:"Coca-Cola Zero Açúcar, bem gelada, em lata.",price:7.50,image:"https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=1000&q=90",addons:[]},
{id:"fanta-500",name:"Fanta Laranja Lata 500 ml",category:"Bebidas",description:"Fanta Laranja gelada em lata de 500 ml.",price:7.50,image:"https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1000&q=90",addons:[]},
{id:"fanta-uva",name:"Fanta Uva Lata",category:"Bebidas",description:"Fanta Uva gelada em lata.",price:7.50,image:"https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1000&q=90",addons:[]},
{id:"pepsi-can",name:"Pepsi Lata",category:"Bebidas",description:"Pepsi original gelada em lata.",price:7.00,image:"https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=1000&q=90",addons:[]},
{id:"pepsi-zero",name:"Pepsi Zero Lata",category:"Bebidas",description:"Pepsi Zero Açúcar gelada em lata.",price:7.00,image:"https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=1000&q=90",addons:[]},
{id:"pepsi-black",name:"Pepsi Black Lata",category:"Bebidas",description:"Pepsi Black gelada em lata.",price:7.00,image:"https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=1000&q=90",addons:[]},
{id:"coke-2l",name:"Coca-Cola 2 Litros",category:"Bebidas",description:"Garrafa de Coca-Cola 2 litros para compartilhar.",price:13.00,image:"https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=1000&q=90",addons:[]},
{id:"coke-zero-2l",name:"Coca-Cola Zero 2 Litros",category:"Bebidas",description:"Coca-Cola Zero Açúcar em garrafa de 2 litros.",price:13.00,image:"https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=1000&q=90",addons:[]},
{id:"pepsi-2l",name:"Pepsi 2 Litros",category:"Bebidas",description:"Pepsi original em garrafa de 2 litros.",price:12.00,image:"https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=1000&q=90",addons:[]},
{id:"fanta-25l",name:"Fanta Laranja 2,5 Litros",category:"Bebidas",description:"Fanta Laranja em garrafa de 2,5 litros.",price:13.00,image:"https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=1000&q=90",addons:[]},
{id:"fanta-uva-2l",name:"Fanta Uva 2 Litros",category:"Bebidas",description:"Fanta Uva em garrafa de 2 litros.",price:13.00,image:"https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=1000&q=90",addons:[]},
{id:"brownie",name:"Brownie com Sorvete",category:"Sobremesas",description:"Brownie de chocolate servido com sorvete cremoso.",price:19.90,image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=90",addons:[]},
{id:"churros",name:"Churros Recheado",category:"Sobremesas",description:"Churros dourado com recheio doce.",price:16.90,image:"https://images.unsplash.com/photo-1624371414361-e670edf4898d?auto=format&fit=crop&w=1000&q=90",addons:[]},

{id:"combo-xsalada",name:"Combo X-Salada",category:"Combos",description:"X-Salada clássico, batata crocante e refrigerante lata à sua escolha.",price:42.90,image:"https://i0.wp.com/anamariabraga.globo.com/wp-content/uploads/2016/11/x-salada-classico.jpg?fit=1200%2C675&ssl=1",addons:[{name:"Trocar por Coca-Cola 2 litros",price:8},{name:"Queijo extra",price:4.5}]},
{id:"combo-bacon",name:"Combo Bacon Cheddar",category:"Combos",description:"Burger com cheddar derretido e bacon crocante, batata frita e refrigerante.",price:49.90,image:"https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=1200&q=90",addons:[{name:"Mais bacon",price:5},{name:"Cheddar extra",price:4.5}]},
{id:"combo-casal",name:"Combo Casal",category:"Combos",description:"2 hambúrgueres artesanais, 1 porção grande de batata e 2 refrigerantes em lata.",price:74.90,image:"https://images.squarespace-cdn.com/content/v1/64bff2ede59d0038ced4d2c3/1769801755074-34FIPKQW2TYAIYPPS6KK/pexels-eric-moura-859101902-33068080.jpg",addons:[{name:"Adicionar X-Batata",price:20},{name:"Molhos extras",price:3}]},
{id:"combo-familia",name:"Combo Família",category:"Combos",description:"4 hambúrgueres tradicionais, batata grande para compartilhar e Coca-Cola 2 litros.",price:119.90,image:"https://images.squarespace-cdn.com/content/v1/64bff2ede59d0038ced4d2c3/1769801755074-34FIPKQW2TYAIYPPS6KK/pexels-eric-moura-859101902-33068080.jpg",addons:[{name:"Adicionar 2 hambúrgueres",price:35},{name:"Refrigerante extra 2 litros",price:13}]},
{id:"combo-xbatata",name:"Combo X-Batata",category:"Combos",description:"X-Batata Completa com cheddar, bacon, calabresa e molhos + 2 hambúrgueres + refrigerante 2 litros.",price:89.90,image:"https://img0.didiglobal.com/static/soda_public/img_adff3146f0fcf52cd0a4b469d624c691.jpeg",featured:true,addons:[{name:"Mais bacon e calabresa",price:8},{name:"Adicionar hambúrguer",price:18}]},
{id:"combo-crispy",name:"Combo Crispy Chicken",category:"Combos",description:"Sanduíche de frango crocante, batata frita e refrigerante lata.",price:44.90,image:"https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1200&q=90",addons:[{name:"Frango extra",price:8},{name:"Molho especial",price:2}]},
{id:"chicken-wings",name:"Asinhas de Frango Crocantes",category:"Porções",description:"Asinhas temperadas, douradas e crocantes com molho barbecue.",price:29.90,image:"https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=1000&q=90",addons:[{name:"Molho barbecue extra",price:2},{name:"Molho picante",price:2}]},
{id:"chicken-strips",name:"Tiras de Frango Empanadas",category:"Porções",description:"Tiras de frango empanadas e crocantes acompanhadas de molho especial.",price:27.90,image:"https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1000&q=90",addons:[{name:"Porção extra",price:12},{name:"Molho de alho",price:1.5}]},
{id:"nuggets",name:"Nuggets Crocantes",category:"Porções",description:"Nuggets dourados para compartilhar, com molho à escolha.",price:22.90,image:"https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=1000&q=90",addons:[{name:"Mais 6 unidades",price:8},{name:"Molho barbecue",price:1.5}]},
{id:"calabresa",name:"Calabresa Acebolada",category:"Porções",description:"Calabresa fatiada na chapa com cebola dourada, perfeita para compartilhar.",price:28.90,image:"https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?auto=format&fit=crop&w=1000&q=90",addons:[{name:"Queijo derretido",price:4.5},{name:"Pão fatiado",price:4}]},
{id:"mozzarella-sticks",name:"Palitos de Queijo",category:"Porções",description:"Palitos de queijo empanados e crocantes, servidos com molho especial.",price:24.90,image:"https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=1000&q=90",addons:[{name:"Porção extra",price:10},{name:"Molho extra",price:1.5}]},
{id:"fried-pickles",name:"Picles Empanados",category:"Porções",description:"Rodelas de picles empanadas e crocantes com molho especial.",price:19.90,image:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=90",addons:[{name:"Molho ranch",price:1.5},{name:"Molho picante",price:1.5}]},
{id:"guarana-can",name:"Guaraná Antarctica Lata",category:"Bebidas",description:"Guaraná Antarctica bem gelado em lata.",price:7.00,image:"https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1000&q=90",addons:[]},
{id:"sprite-can",name:"Sprite Lata",category:"Bebidas",description:"Sprite gelada em lata.",price:7.00,image:"https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1000&q=90",addons:[]},
{id:"guarana-2l",name:"Guaraná Antarctica 2 Litros",category:"Bebidas",description:"Guaraná Antarctica em garrafa de 2 litros.",price:12.00,image:"https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=1000&q=90",addons:[]},
{id:"sprite-2l",name:"Sprite 2 Litros",category:"Bebidas",description:"Sprite em garrafa de 2 litros.",price:12.00,image:"https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=1000&q=90",addons:[]}
];const REVIEWS=[["RM","Rafael M.","Centro","O melhor smash que já comi. Chegou quentinho e o ponto da carne estava perfeito. Já virou rotina de sexta.","há 2 dias"],["CS","Camila S.","Jardins","Pedi o Smoke Bacon e fiquei viciada no barbecue da casa. Atendimento no WhatsApp super rápido.","há 3 dias"],["BT","Bruno T.","Vila Nova","Entrega antes do prazo e embalagem impecável, o pão chegou crocante. Nota 10.","há 5 dias"],["JP","Juliana P.","Centro","Levei a família toda no combo duplo e todo mundo aprovou. Custo-benefício excelente.","há 1 semana"],["DA","Diego A.","Bela Vista","A batata com cheddar e bacon é pecado. Peço toda semana.","há 1 semana"],["FL","Fernanda L.","Jardins","Opção vegetariana de verdade, saborosa. Finalmente uma hamburgueria que lembra da gente.","há 2 semanas"]];
const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>Array.from(root.querySelectorAll(s)), cash=n=>Number(n).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}), cleanPhone=()=>String(CONFIG.whatsapp).replace(/\D/g,""), wa=text=>"https://wa.me/"+cleanPhone()+"?text="+encodeURIComponent(text||"Olá! Gostaria de fazer um pedido.");
let cart=[];try{cart=JSON.parse(localStorage.getItem("burger-cart")||"[]");if(!Array.isArray(cart))cart=[]}catch(e){cart=[]}
let observer=null;const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Toast notifications: accessible, stacked, auto-dismiss */
function showToast(message,type="info",duration=3600){
 const host=$("#toast-container");if(!host)return;
 const toast=document.createElement("div");
 const kinds={success:{icon:"✓",label:"Sucesso"},error:{icon:"!",label:"Erro"},warning:{icon:"⚠",label:"Aviso"},info:{icon:"i",label:"Informação"}};
 const kind=kinds[type]||kinds.info;
 toast.className="toast toast-"+type;
 toast.setAttribute("role",type==="error"?"alert":"status");
 toast.setAttribute("aria-live",type==="error"?"assertive":"polite");
 toast.innerHTML='<span class="toast-icon" aria-hidden="true">'+kind.icon+'</span><span class="toast-copy"><strong>'+kind.label+'</strong><span class="toast-message"></span></span><button class="toast-close" type="button" aria-label="Fechar notificação">×</button><span class="toast-timer"></span>';
 toast.querySelector(".toast-message").textContent=String(message);
 host.appendChild(toast);
 requestAnimationFrame(()=>toast.classList.add("toast-show"));
 const remove=()=>{if(toast.dataset.closing)return;toast.dataset.closing="1";toast.classList.remove("toast-show");setTimeout(()=>toast.remove(),260)};
 const timer=setTimeout(remove,Math.max(1800,Number(duration)||3600));
 toast.querySelector(".toast-close").addEventListener("click",()=>{clearTimeout(timer);remove()});
}

let activeReview=0,reviewTimer=null,confirmAction=null,confirmPreviousFocus=null;
function renderTestimonial(index){
 const host=$("#testimonials");if(!host)return;
 activeReview=(index+REVIEWS.length)%REVIEWS.length;
 const r=REVIEWS[activeReview];
 host.innerHTML='<article class="testimonial testimonial-active" aria-live="polite"><div class="person"><span class="initials">'+esc(r[0])+'</span><div><h3>'+esc(r[1])+'</h3><small>'+esc(r[2])+'</small></div></div><p class="stars" aria-label="5 de 5 estrelas">★★★★★</p><blockquote>'+esc(r[3])+'</blockquote><small>'+esc(r[4])+'</small><p class="verified">✓ Depoimento demonstrativo</p></article><div class="review-dots" aria-label="Escolher depoimento">'+REVIEWS.map((_,i)=>'<button type="button" class="review-dot '+(i===activeReview?'active':'')+'" data-review-index="'+i+'" aria-label="Mostrar depoimento '+(i+1)+'" aria-pressed="'+(i===activeReview)+'"></button>').join("")+'</div>';
}
function renderClientAvatars(){
 const host=$("#client-avatars");if(!host)return;
 const shown=REVIEWS.slice(0,4),remaining=Math.max(0,REVIEWS.length-shown.length);
 host.innerHTML=shown.map((r,i)=>'<span class="client-avatar" title="'+esc(r[1])+'" style="--avatar-index:'+i+'">'+esc(r[0])+'</span>').join("")+(remaining?'<span class="client-avatar client-more" aria-label="'+remaining+' clientes a mais">+'+remaining+'</span>':"");
}
function startReviewCarousel(){
 if(reviewTimer)clearInterval(reviewTimer);
 if(REVIEWS.length>1)reviewTimer=setInterval(()=>renderTestimonial(activeReview+1),4000);
 const host=$("#testimonials");if(!host)return;
 host.addEventListener("mouseenter",()=>{if(reviewTimer){clearInterval(reviewTimer);reviewTimer=null}});
 host.addEventListener("mouseleave",()=>{if(!reviewTimer)reviewTimer=setInterval(()=>renderTestimonial(activeReview+1),4000)});
 host.addEventListener("focusin",()=>{if(reviewTimer){clearInterval(reviewTimer);reviewTimer=null}});
 host.addEventListener("focusout",()=>{if(!reviewTimer)reviewTimer=setInterval(()=>renderTestimonial(activeReview+1),4000)});
 host.addEventListener("click",e=>{const b=e.target.closest("[data-review-index]");if(b)renderTestimonial(Number(b.dataset.reviewIndex))});
}
function openConfirm({title="Confirmar ação",description="Tem certeza de que deseja continuar?",confirmText="Confirmar",onConfirm}={}){
 const back=$("#confirm-backdrop");if(!back)return;
 confirmAction=typeof onConfirm==="function"?onConfirm:null;confirmPreviousFocus=document.activeElement;
 $("#confirm-title").textContent=title;$("#confirm-description").textContent=description;$(".confirm-accept").textContent=confirmText;
 back.hidden=false;document.body.classList.add("lock");$(".confirm-cancel").focus();
}
function closeConfirm(){
 const back=$("#confirm-backdrop");if(!back)return;
 back.hidden=true;confirmAction=null;if($(".drawer").classList.contains("open"))document.body.classList.add("lock");else document.body.classList.remove("lock");
 if(confirmPreviousFocus&&typeof confirmPreviousFocus.focus==="function")confirmPreviousFocus.focus();
}
function fieldError(input,message){
 const error=$("#err-"+input.name);input.classList.toggle("invalid",!!message);input.setAttribute("aria-invalid",String(!!message));
 if(error)error.textContent=message||"";
 return !message;
}
function validateContactField(input){
 const value=input.value.trim();let error="";
 if(input.name==="contact-name"&&(value.length<2||!/^[\p{L}][\p{L}\p{M} .'-]{1,79}$/u.test(value)))error="Digite um nome válido (mínimo de 2 letras).";
 if(input.name==="contact-email"&&!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(value))error="Digite um e-mail válido, como nome@email.com.";
 if(input.name==="contact-phone"){const digits=value.replace(/\D/g,"");if(!/^[0-9+().\s-]+$/.test(value)||digits.length<10||digits.length>13)error="Digite um telefone válido com DDD (somente números, espaços, +, parênteses ou hífen).";}
 if(input.name==="contact-message"&&(value.length<10||value.length>1000))error="A mensagem deve ter entre 10 e 1.000 caracteres.";
 return fieldError(input,error);
}
function initContactForm(){
 const form=$("#contact-form");if(!form)return;
 const fields=Array.from(form.querySelectorAll("input,textarea"));
 fields.forEach(input=>{input.addEventListener("input",()=>{if(input.dataset.touched==="1"||input.value.trim())validateContactField(input);});input.addEventListener("blur",()=>{input.dataset.touched="1";validateContactField(input)})});
 form.addEventListener("submit",e=>{
  e.preventDefault();let valid=true;
  fields.forEach(input=>{input.dataset.touched="1";if(!validateContactField(input))valid=false});
  if(!valid){$("#contact-feedback").textContent="Revise os campos destacados antes de continuar.";showToast("Há campos inválidos no formulário de contato.","warning");const first=form.querySelector(".invalid");if(first)first.focus();return}
  const d=new FormData(form),msg="Olá, "+CONFIG.name+"! Vim pelo site.\n\nNome: "+d.get("contact-name")+"\nE-mail: "+d.get("contact-email")+"\nTelefone: "+d.get("contact-phone")+"\nMensagem: "+d.get("contact-message");
  const opened=window.open(wa(msg),"_blank","noopener,noreferrer");
  if(opened){$("#contact-feedback").textContent="Mensagem preparada. Conclua o envio pelo WhatsApp.";showToast("Formulário validado! Continue pelo WhatsApp.","success")}
  else{$("#contact-feedback").textContent="O navegador bloqueou a abertura. Permita pop-ups e tente novamente.";showToast("Não foi possível abrir o WhatsApp. Permita pop-ups.","error")}
 });
}
function initFulfillment(){
 const form=$(".checkout");if(!form)return;
 form.querySelectorAll('input[name="fulfillment"]').forEach(input=>input.addEventListener("change",()=>{
  updateFulfillment();renderCart();
  showToast(input.value==="pickup"?"Retirada selecionada: sem taxa de entrega.":"Entrega rápida selecionada.", "info",2600);
 }));
 form.querySelector('[name="customer"]').addEventListener("input",e=>validateCheckoutField(e.target));
 form.querySelector('[name="address"]').addEventListener("input",e=>{if(e.target.value.trim())validateCheckoutField(e.target)});
 form.querySelector('[name="customer"]').addEventListener("blur",e=>validateCheckoutField(e.target));
 form.querySelector('[name="address"]').addEventListener("blur",e=>{if(isDelivery())validateCheckoutField(e.target)});
 updateFulfillment();
}
function isDelivery(){const selected=$('.checkout input[name="fulfillment"]:checked');return !selected||selected.value==="delivery"}
function updateFulfillment(){
 const address=$('.checkout [name="address"]'),label=$(".address-field"),delivery=isDelivery();
 if(address){address.required=delivery;address.disabled=!delivery;if(!delivery){address.value="";fieldError(address,"")}}
 if(label)label.hidden=!delivery;
 const fee=delivery?(Number(CONFIG.deliveryFee)||0):0;
 const el=$("[data-delivery-fee]");if(el)el.textContent=cash(fee);
 const mins=$("[data-delivery-minutes]");if(mins)mins.textContent=CONFIG.deliveryMinutes;
 const feeRow=$("[data-cart-fee]");if(feeRow&&cart.length)feeRow.textContent=cash(fee);
 const feedback=$("#cart-feedback");if(feedback)feedback.textContent=delivery?"Entrega rápida: taxa aplicada ao pedido.":"Retirada no local: sem taxa de entrega.";
}
function validateCheckoutField(input){
 const value=input.value.trim();let error="";
 if(input.name==="customer"&&(value.length<2||!/^[\p{L}][\p{L}\p{M} .'-]{1,79}$/u.test(value)))error="Informe seu nome completo (mínimo de 2 letras).";
 if(input.name==="address"&&isDelivery()&&value.length<5)error="Informe rua, número e bairro para a entrega.";
 fieldError(input,error);return !error;
}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function setupConfig(){
 $$("[data-name]").forEach(e=>e.textContent=CONFIG.name);$$("[data-minutes]").forEach(e=>e.textContent=CONFIG.deliveryMinutes);$$("[data-address]").forEach(e=>e.textContent=CONFIG.address+", "+CONFIG.city);$$("[data-phone]").forEach(e=>e.textContent=CONFIG.whatsapp);$$("[data-area]").forEach(e=>e.textContent=CONFIG.deliveryArea);$$("[data-fee]").forEach(e=>e.textContent=cash(CONFIG.deliveryFee));$$("[data-year]").forEach(e=>e.textContent=CONFIG.foundedYear);$$("[data-current-year]").forEach(e=>e.textContent=new Date().getFullYear());
 $$("[data-wa]").forEach(e=>e.href=wa());$$("[data-instagram]").forEach(e=>e.href=/^https?:\/\//i.test(CONFIG.instagram)?CONFIG.instagram:"https://instagram.com");$$("[data-reviews]").forEach(e=>e.href=CONFIG.googleReviews);
 const q=encodeURIComponent(CONFIG.address+" "+CONFIG.city);$$("[data-maps],[data-route]").forEach(e=>e.href="https://www.google.com/maps/search/?api=1&query="+q);const map=$(".map iframe");if(map)map.src="https://maps.google.com/maps?q="+q+"&z=14&output=embed";
 const ld=$("#jsonld");if(ld)ld.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Restaurant","name":CONFIG.name,"telephone":CONFIG.whatsapp,"address":{"@type":"PostalAddress","streetAddress":CONFIG.address,"addressLocality":CONFIG.city},"hasMenu":location.href.split("#")[0]+"#cardapio"});document.title=CONFIG.name+" | Brasa. Queijo. Vício.";updateStatus()
}
function updateStatus(){const now=new Date(),range=CONFIG.businessHours[now.getDay()];let open=false;if(range){const n=now.getHours()*60+now.getMinutes(),a=range[0].split(":").map(Number),b=range[1].split(":").map(Number),start=a[0]*60+a[1],end=b[0]*60+b[1];open=end<start?(n>=start||n<end):(n>=start&&n<end)}$$("[data-status]").forEach(e=>{e.textContent=open?"ABERTO AGORA":"FECHADO";e.parentElement.classList.toggle("closed",!open)})}
function handleProductImageError(img){if(img.dataset.fallbackTried==="1")return;img.dataset.fallbackTried="1";const product=MENU.find(item=>img.alt.indexOf(item.name+" — ")===0);if(!product)return;const id=product.id;const fallbacks={"x-salada":"https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85","triple-smash":"https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=900&q=85","triple-burger":"https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=900&q=85","combo-duplo":"https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=900&q=85","combo-smash":"https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=900&q=85","loaded-fries":"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85"};img.src=fallbacks[id]||(product.category==="Porções"?"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85":product.category==="Bebidas"?"https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=900&q=85":product.category==="Sobremesas"?"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85":"https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=900&q=85")}
function renderMenu(category){const root=$("#menu-items"),items=MENU.filter(p=>p.category===category);root.innerHTML=items.map(function(p,i){return '<article class="product reveal '+(p.featured?'featured':'')+'" style="--delay:'+(i*100)+'ms"><div class="photo"><img src="'+esc(p.image)+'" alt="'+esc(p.name+" — "+p.description)+'" width="600" height="440" '+(i?'loading="lazy"':'')+'>'+(p.featured?'<span class="tag" style="position:absolute;top:14px;left:14px;z-index:2">Destaque da casa</span>':'')+'</div><div class="body"><span class="num">'+String(i+1).padStart(2,"0")+'</span><h3>'+esc(p.name)+'</h3><p>'+esc(p.description)+'</p><div class="addons">'+(p.addons||[]).map(function(a,j){return '<button class="addon" type="button" data-addon="'+p.id+'" data-index="'+j+'" aria-pressed="false">'+esc(a.name)+' + '+cash(a.price)+'</button>'}).join("")+'</div><div class="product-foot"><b class="price">'+cash(p.price)+'</b><button class="add" data-add="'+p.id+'">+ Adicionar</button></div></div></article>'}).join("");$$(".photo img",root).forEach(function(img){img.classList.add("scroll-motion-img")});$(".photo img",root).forEach(function(img){img.addEventListener("error",function(){handleProductImageError(img)},{once:true})});if(observer)$(".product.reveal").forEach(e=>observer.observe(e))}
function saveCart(){try{localStorage.setItem("burger-cart",JSON.stringify(cart))}catch(e){}}

let customizingProduct=null,customizingOptions={};
const CUSTOM_OPTIONS=[
 {id:"pickle-extra",name:"Mais picles",price:1.5,type:"add",description:"Porção extra de picles"},
 {id:"pickle-less",name:"Menos picles",price:0,type:"remove",description:"Reduzir a quantidade de picles"},
 {id:"no-pickle",name:"Sem picles",price:0,type:"remove",description:"Retirar os picles"},
 {id:"salad-extra",name:"Mais salada",price:2,type:"add",description:"Mais alface e tomate"},
 {id:"no-salad",name:"Sem salada",price:0,type:"remove",description:"Retirar alface e tomate"},
 {id:"cheese-extra",name:"Queijo extra",price:4.5,type:"add",description:"Uma camada extra de queijo"},
 {id:"bacon-extra",name:"Bacon extra",price:6,type:"add",description:"Porção extra de bacon"},
 {id:"patty-extra",name:"Hambúrguer extra",price:9,type:"add",description:"Mais um disco de carne"},
 {id:"egg-extra",name:"Ovo",price:3,type:"add",description:"Ovo preparado na chapa"},
 {id:"sauce-extra",name:"Molho extra",price:1.5,type:"add",description:"Molho especial servido à parte"},
 {id:"onion-caramel",name:"Cebola caramelizada",price:3.5,type:"add",description:"Cebola caramelizada na chapa"},
 {id:"fries-side",name:"Adicionar batata pequena",price:8,type:"add",description:"Porção pequena de batata frita"}
];
function customPrice(){if(!customizingProduct)return 0;return customizingProduct.price+CUSTOM_OPTIONS.reduce((sum,o)=>sum+(customizingOptions[o.id]?o.price:0),0)+(customizingProduct.addons||[]).reduce((sum,o)=>sum+(customizingOptions["legacy-"+o.name]?o.price:0),0)}
function updateCustomPrice(){const total=customPrice();const el=$("#customize-total"),btn=$("#customize-button-price");if(el)el.textContent=cash(total);if(btn)btn.textContent=cash(total)}
function openCustomize(id){
 const p=MENU.find(x=>x.id===id);if(!p){showToast("Não encontramos esse produto. Atualize o cardápio e tente novamente.","error");return}
 customizingProduct=p;customizingOptions={};
 const back=$("#customize-backdrop");if(!back){showToast("Não foi possível abrir as opções do produto.","error");return}
 $(".customize-product").innerHTML='<div class="customize-product-image"><img src="'+esc(p.image)+'" alt="'+esc(p.name)+'"></div><div><strong>'+esc(p.name)+'</strong><span>'+esc(p.description)+'</span><b>'+cash(p.price)+'</b></div>';
 const options=[...CUSTOM_OPTIONS,...(p.addons||[]).map((a,i)=>({id:"legacy-"+a.name,name:a.name,price:a.price,type:"add",description:"Adicional do cardápio"}))];
 $(".customize-options").innerHTML='<p class="customize-group-label">ADICIONAIS E PREFERÊNCIAS</p>'+options.map(o=>'<label class="customize-option"><span class="customize-option-copy"><strong>'+esc(o.name)+'</strong><small>'+esc(o.description||"")+'</small></span><span class="customize-option-price">'+(o.price?"+ "+cash(o.price):o.type==="remove"?"Sem custo":"Incluso")+'</span><input type="checkbox" data-custom-option="'+esc(o.id)+'" aria-label="'+esc(o.name)+'"></label>').join("");
 back.hidden=false;document.body.classList.add("lock");updateCustomPrice();$(".customize-close").focus();
}
function closeCustomize(){const back=$("#customize-backdrop");if(back)back.hidden=true;customizingProduct=null;if(!$(".drawer").classList.contains("open")&&!$("#confirm-backdrop").hidden)document.body.classList.add("lock");else if(!$(".drawer").classList.contains("open"))document.body.classList.remove("lock")}
function commitCustomize(){
 if(!customizingProduct)return;
 const p=customizingProduct,options=CUSTOM_OPTIONS.filter(o=>customizingOptions[o.id]).concat((p.addons||[]).filter(o=>customizingOptions["legacy-"+o.name]));
 const removeOptions=CUSTOM_OPTIONS.filter(o=>customizingOptions[o.id]&&o.type==="remove").map(o=>o.name);
 const extras=options.filter(o=>o.type!=="remove").map(o=>({name:o.name,price:o.price}));
 const selected=[...extras,...removeOptions.map(name=>({name,price:0}))];
 addProduct(p.id,selected);
 closeCustomize();
}
function addProduct(id,addons){try{const p=MENU.find(x=>x.id===id);if(!p){showToast("Não foi possível adicionar esse item. Tente novamente.","error");return;}const key=id+"|"+addons.map(a=>a.name).sort().join("|"),same=cart.find(x=>x.key===key);if(same)same.qty++;else cart.push({key:key,id:id,name:p.name,price:p.price,addons:addons,qty:1});saveCart();renderCart();openCart();showToast(p.name+" adicionado ao carrinho.","success")}catch(err){console.error("Falha ao adicionar produto:",err);showToast("Não foi possível adicionar agora. Recarregue a página e tente novamente.","error",5000)}}
function lineTotal(x){return (x.price+x.addons.reduce((s,a)=>s+a.price,0))*x.qty}
function renderCart(){const root=$(".cart-items");root.innerHTML=cart.map(function(x){return '<div class="cart-line"><div><h3>'+esc(x.name)+'</h3><small>'+(x.addons.length?x.addons.map(a=>esc(a.name)+(a.price>0?" (+"+cash(a.price)+")":"")).join(", "):"Sem adicionais")+'</small><small>'+cash(lineTotal(x))+'</small><button class="remove" data-remove="'+esc(x.key)+'">Remover</button></div><div class="qty"><button data-qty="'+esc(x.key)+'" data-delta="-1" aria-label="Diminuir">−</button><b>'+x.qty+'</b><button data-qty="'+esc(x.key)+'" data-delta="1" aria-label="Aumentar">+</button></div></div>'}).join("");const count=cart.reduce((s,x)=>s+x.qty,0),sub=cart.reduce((s,x)=>s+lineTotal(x),0),fee=count&&isDelivery()?(Number(CONFIG.deliveryFee)||0):0,total=sub+fee;$(".count").textContent=count;$("[data-subtotal]").textContent=cash(sub);$("[data-cart-fee]").textContent=cash(fee);$("[data-total]").textContent=cash(total);$(".empty").hidden=count>0;$(".checkout").hidden=count===0;$(".checkout-btn").disabled=count===0;updateFulfillment();const bar=$(".mobile-cart");bar.hidden=count===0;bar.querySelector("b").textContent=cash(total)}
function openCart(){$(".drawer").classList.add("open");$(".drawer").setAttribute("aria-hidden","false");$(".overlay").hidden=false;document.body.classList.add("lock");$(".close").focus()}
function closeCart(){$(".drawer").classList.remove("open");$(".drawer").setAttribute("aria-hidden","true");$(".overlay").hidden=true;document.body.classList.remove("lock")}
function checkout(){if(!cart.length){showToast("Adicione pelo menos um hambúrguer antes de finalizar.","warning");return;}const f=$(".checkout");if(!f.reportValidity()){showToast("Confira os campos obrigatórios para continuar.","warning");return;}const d=new FormData(f);if(!validateCheckoutField(f.elements.customer)||(isDelivery()&&!validateCheckoutField(f.elements.address))){showToast("Corrija os campos destacados no carrinho.","warning");return}const sub=cart.reduce((s,x)=>s+lineTotal(x),0),fee=isDelivery()?(Number(CONFIG.deliveryFee)||0):0,fulfillment=isDelivery()?"Entrega rápida":"Retirada no local",lines=cart.map(x=>"• "+x.qty+"x "+x.name+(x.addons.length?" ("+x.addons.map(a=>a.name).join(", ")+")":"")+" — "+cash(lineTotal(x))).join("\n"),msg="Olá, "+CONFIG.name+"! Quero fazer um pedido:\n\n"+lines+"\n\nModalidade: "+fulfillment+"\nSubtotal: "+cash(sub)+"\nEntrega: "+cash(fee)+"\nTOTAL: "+cash(sub+fee)+"\n\nNome: "+d.get("customer")+"\n"+(isDelivery()?"Endereço: "+d.get("address")+"\n":"")+"Pagamento: "+d.get("payment")+"\nObservações: "+(d.get("notes")||"Nenhuma");const orderWindow=window.open(wa(msg),"_blank","noopener,noreferrer");if(orderWindow){showToast("Pedido preparado! Continue o envio pelo WhatsApp.","success",4500)}else{showToast("O navegador bloqueou a abertura do WhatsApp. Permita pop-ups e tente novamente.","error",5000)}}
function initScroll(){
 document.documentElement.classList.add("js-ready");
 $$(".photo img, .story-photo img, .gallery figure img, .hero-photo img").forEach(function(img){img.classList.add("scroll-motion-img");img.style.transform="translate3d(0,0,0) scale(1.04)";});
 if("IntersectionObserver" in window){
  observer=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}})},{threshold:.08,rootMargin:"0px 0px -20px 0px"});
  $$(".reveal").forEach(function(e,i){e.style.setProperty("--delay",(i%4*75)+"ms");observer.observe(e)});
 }else{
  $$(".reveal").forEach(function(e){e.classList.add("visible")});
 }
 if(window.Lenis){try{const lenis=new Lenis({duration:1.25,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),smoothWheel:true,syncTouch:false});function frame(t){lenis.raf(t);requestAnimationFrame(frame)}requestAnimationFrame(frame);window.__lenis=lenis}catch(e){}}
 const hero=$(".hero-photo");let ticking=false;
 function scrollMotion(){if(ticking)return;ticking=true;requestAnimationFrame(function(){const y=window.scrollY||0;const vh=window.innerHeight||800;if(hero&&y<vh*1.3)hero.style.transform="translate3d(0,"+(y*.18)+"px,0) scale(1.08)";$$(".scroll-motion-img").forEach(function(img){const box=img.getBoundingClientRect();if(box.bottom<0||box.top>vh)return;const progress=(vh-box.top)/(vh+box.height);const centered=(box.top+box.height*.5-vh*.5)/(vh*.5);const shift=((progress-.5)*-30).toFixed(2);const scale=(1.035+Math.max(0,1-Math.min(1,Math.abs(centered)))*.035).toFixed(3);img.style.transform="translate3d(0,"+shift+"px,0) scale("+scale+")";});const n=document.documentElement;$(".nav").classList.toggle("scrolled",y>40);$(".progress").style.transform="scaleX("+(n.scrollHeight-innerHeight>0?Math.min(1,y/(n.scrollHeight-innerHeight)):0)+")";
 if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){$$$(".reveal.visible").forEach(function(el,i){const r=el.getBoundingClientRect();const center=r.top+r.height*.5;const delta=Math.max(-1,Math.min(1,(center-vh*.5)/(vh*.72)));const tilt=(-delta*4.5).toFixed(2);const depth=(1-Math.abs(delta))*14;const drift=(delta* -8).toFixed(2);el.style.setProperty("--scroll-tilt",tilt+"deg");el.style.setProperty("--scroll-depth",depth.toFixed(2)+"px");el.style.setProperty("--scroll-drift",drift+"px");});}
 ticking=false})}
 window.addEventListener("scroll",scrollMotion,{passive:true});scrollMotion();
}
function initPremiumLoader(){const loader=$("#site-loader");if(!loader)return;loader.remove()}

document.addEventListener("DOMContentLoaded",function(){setupConfig();renderMenu("Burgers");initPremiumLoader();renderTestimonial(0);renderClientAvatars();initScroll();initContactForm();initFulfillment();startReviewCarousel();renderCart();updateStatus();setInterval(updateStatus,60000);
 document.addEventListener("click",function(e){const tab=e.target.closest("[data-cat]");if(tab){showToast("Cardápio: "+tab.textContent.trim()+".","info",2200);$$(".tab").forEach(function(b){b.classList.toggle("active",b===tab);b.setAttribute("aria-selected",String(b===tab))});renderMenu(tab.dataset.cat);return}const addon=e.target.closest("[data-addon]");if(addon){addon.classList.toggle("selected");addon.setAttribute("aria-pressed",String(addon.classList.contains("selected")));return}const add=e.target.closest("[data-add]");if(add){e.preventDefault();openCustomize(add.dataset.add);return}const qty=e.target.closest("[data-qty]");if(qty){const item=cart.find(x=>x.key===qty.dataset.qty);if(item){item.qty+=Number(qty.dataset.delta);if(item.qty<1){openConfirm({title:"Remover produto?",description:"A quantidade chegou a zero. Deseja remover "+item.name+" do carrinho?",confirmText:"Remover produto",onConfirm:()=>{cart=cart.filter(x=>x!==item);saveCart();renderCart();showToast("Produto removido do carrinho.","success")}});item.qty=1}else{saveCart();renderCart();showToast("Quantidade atualizada.","success",1800)}}return}const rm=e.target.closest("[data-remove]");if(rm){const item=cart.find(x=>x.key===rm.dataset.remove);if(item)openConfirm({title:"Remover produto?",description:"Deseja remover "+item.name+" do seu carrinho? Essa ação não pode ser desfeita.",confirmText:"Sim, remover",onConfirm:()=>{cart=cart.filter(x=>x!==item);saveCart();renderCart();showToast("Produto removido do carrinho.","success")}});return}if(e.target.closest(".cart-open")||e.target.closest(".mobile-cart")){openCart();return}if(e.target.closest(".close")||e.target===$(".overlay")){closeCart();return}if(e.target.closest(".hamb")){const open=$(".links").classList.toggle("open");$(".hamb").setAttribute("aria-expanded",String(open));$(".hamb").setAttribute("aria-label",open?"Fechar menu":"Abrir menu");return}if(e.target.closest(".links a")){$(".links").classList.remove("open");$(".hamb").setAttribute("aria-expanded","false")}const a=e.target.closest('a[href^="#"]');if(a){const target=document.querySelector(a.getAttribute("href"));if(target){e.preventDefault();if(window.__lenis)window.__lenis.scrollTo(target,{offset:-82});else window.scrollTo({top:target.getBoundingClientRect().top+scrollY-82,behavior:reduced?"auto":"smooth"})}}});
 $("#customize-backdrop").addEventListener("click",e=>{if(e.target===$("#customize-backdrop"))closeCustomize()});$(".customize-close").addEventListener("click",closeCustomize);$(".customize-options").addEventListener("change",e=>{const input=e.target.closest("[data-custom-option]");if(!input)return;const id=input.dataset.customOption;customizingOptions[id]=input.checked;if(id==="pickle-less"&&input.checked){customizingOptions["pickle-extra"]=false;const x=$("[data-custom-option=\"pickle-extra\"]");if(x)x.checked=false}if(id==="pickle-extra"&&input.checked){customizingOptions["pickle-less"]=false;const x=$("[data-custom-option=\"pickle-less\"]");if(x)x.checked=false}if(id==="no-pickle"&&input.checked){customizingOptions["pickle-extra"]=false;customizingOptions["pickle-less"]=false;$$("[data-custom-option=\"pickle-extra\"], [data-custom-option=\"pickle-less\"]").forEach(x=>x.checked=false)}updateCustomPrice()});$(".customize-add").addEventListener("click",commitCustomize);$(".checkout-btn").addEventListener("click",checkout);$(".confirm-cancel").addEventListener("click",closeConfirm);$(".confirm-x").addEventListener("click",closeConfirm);$("#confirm-backdrop").addEventListener("click",e=>{if(e.target===$("#confirm-backdrop"))closeConfirm()});$(".confirm-accept").addEventListener("click",()=>{const action=confirmAction;closeConfirm();if(action)action()});document.addEventListener("keydown",function(e){if(e.key==="Escape"){if(!$("#customize-backdrop").hidden)closeCustomize();else if(!$("#confirm-backdrop").hidden)closeConfirm();else closeCart()}});let busy=false;window.addEventListener("scroll",function(){if(busy)return;busy=true;requestAnimationFrame(function(){const n=document.documentElement;$(".nav").classList.toggle("scrolled",scrollY>40);$(".progress").style.transform="scaleX("+(n.scrollHeight-innerHeight>0?Math.min(1,scrollY/(n.scrollHeight-innerHeight)):0)+")";busy=false})},{passive:true});
});