const CONFIG={whatsapp:'265998768510',canonical:'https://triplenfarm.com'};
const PRODUCTS=[
{id:'day-old',name:'Day-old chicks',category:'poultry',stage:'0–7 days',stock:'Available',tone:'available',desc:'Healthy local and improved-local chicks for household and commercial production.',icon:'🐣'},
{id:'sasso',name:'Sasso chickens',category:'poultry',stage:'Chicks to mature',stock:'Pre-order',tone:'preorder',desc:'Hardy dual-purpose birds suitable for meat, eggs and breeding programmes.',icon:'🐔'},
{id:'kuroiler',name:'Kuroiler chickens',category:'poultry',stage:'Chicks to point-of-lay',stock:'Limited',tone:'limited',desc:'Improved free-range birds selected for strong growth and useful egg production.',icon:'🐓'},
{id:'mikolongwe',name:'Mikolongwe chickens',category:'poultry',stage:'Growers & mature',stock:'Available',tone:'available',desc:'Locally adapted improved chickens with familiar appearance and practical performance.',icon:'🐔'},
{id:'pol',name:'Point-of-lay birds',category:'poultry',stage:'Ready to start laying',stock:'Pre-order',tone:'preorder',desc:'Well-managed pullets prepared for customers who want to shorten the rearing period.',icon:'🥚'},
{id:'piglets',name:'Piglets',category:'pigs',stage:'Weaned',stock:'Limited',tone:'limited',desc:'Healthy piglets raised under practical small-farm management and biosecurity.',icon:'🐖'},
{id:'breeding-pigs',name:'Breeding gilts & boars',category:'pigs',stage:'Breeding age',stock:'Enquire',tone:'preorder',desc:'Selected breeding animals supplied according to availability and farm records.',icon:'🐷'},
{id:'fish',name:'Pond-raised fish',category:'fish',stage:'Seasonal harvest',stock:'Enquire',tone:'preorder',desc:'Fresh fish from farm ponds, available around planned harvest cycles.',icon:'🐟'},
{id:'vegetables',name:'Fresh vegetables',category:'crops',stage:'Seasonal',stock:'Available',tone:'available',desc:'Solar-irrigated tomatoes, onions, carrots and leafy vegetables depending on season.',icon:'🥕'},
{id:'azolla',name:'Azolla starter material',category:'inputs',stage:'Farm input',stock:'Limited',tone:'limited',desc:'Starter material and practical guidance for integrating azolla into farm systems.',icon:'🌿'},
{id:'bsf',name:'Black soldier fly support',category:'inputs',stage:'Training & starter systems',stock:'Enquire',tone:'preorder',desc:'Farm demonstrations and practical support for low-cost biological feed production.',icon:'♻️'},
{id:'feed',name:'On-farm feed support',category:'inputs',stage:'Advisory',stock:'Enquire',tone:'preorder',desc:'Practical feed-formulation learning based on locally available ingredients.',icon:'🌾'}
];
const art=(emoji)=>`<svg viewBox="0 0 300 220" aria-hidden="true"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#f36b16"/><stop offset="1" stop-color="#a9d849"/></linearGradient></defs><circle cx="150" cy="110" r="88" fill="url(#g)" opacity=".16"/><circle cx="150" cy="110" r="62" fill="#fff"/><text x="150" y="137" text-anchor="middle" font-size="78">${emoji}</text><path d="M40 185 C90 155 210 155 260 185" fill="none" stroke="#1f1715" stroke-width="8" stroke-linecap="round" opacity=".14"/></svg>`;
function renderProducts(filter='all'){
 const grid=document.querySelector('#productGrid');if(!grid)return;
 grid.innerHTML=PRODUCTS.filter(p=>filter==='all'||p.category===filter).map(p=>`<article class="product-card reveal" data-id="${p.id}"><div class="product-art"><span class="stock ${p.tone}">${p.stock}</span>${art(p.icon)}</div><div class="product-body"><div class="product-meta"><span>${p.category.toUpperCase()}</span><span>${p.stage}</span></div><h3>${p.name}</h3><p>${p.desc}</p><div class="product-actions"><button class="btn btn-outline quick-view" data-id="${p.id}">Details</button><button class="btn btn-primary order-now" data-id="${p.id}">Order</button></div></div></article>`).join('');
 bindProductActions();observeReveals();
}
function bindProductActions(){
 document.querySelectorAll('.quick-view').forEach(b=>b.onclick=()=>openProduct(b.dataset.id));
 document.querySelectorAll('.order-now').forEach(b=>b.onclick=()=>openOrder(b.dataset.id));
}
function openProduct(id){const p=PRODUCTS.find(x=>x.id===id);if(!p)return;const m=document.querySelector('#productModal');m.querySelector('.modal-art').innerHTML=art(p.icon);m.querySelector('[data-modal-title]').textContent=p.name;m.querySelector('[data-modal-stock]').textContent=p.stock;m.querySelector('[data-modal-desc]').textContent=p.desc;m.querySelector('[data-modal-stage]').textContent=p.stage;m.querySelector('[data-modal-order]').onclick=()=>{closeModal('productModal');openOrder(id)};openModal('productModal')}
function openOrder(id=''){const p=PRODUCTS.find(x=>x.id===id);const select=document.querySelector('#orderProduct');if(select){select.innerHTML='<option value="">Select a product</option>'+PRODUCTS.map(x=>`<option value="${x.name}">${x.name}</option>`).join('');if(p)select.value=p.name}openModal('orderModal')}
function openModal(id){document.querySelector('#'+id)?.classList.add('open');document.body.classList.add('modal-open')}
function closeModal(id){document.querySelector('#'+id)?.classList.remove('open');document.body.classList.remove('modal-open')}
function sendWhatsApp(form){const data=new FormData(form);const name=data.get('name')||'Customer';const product=data.get('product')||'a farm product';const qty=data.get('quantity')||'not specified';const location=data.get('location')||'not specified';const message=data.get('message')||'';const text=`Hello Triple N EcoSmart Farm. My name is ${name}. I am interested in ${product}. Quantity: ${qty}. Location: ${location}. ${message}`;window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`,'_blank');showToast('Opening WhatsApp…')}
function showToast(text){const t=document.querySelector('#toast');if(!t)return;t.textContent=text;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600)}
const SYSTEM={
 poultry:{tag:'Core livestock enterprise',title:'Poultry supports the whole farm',text:'Chickens generate sales at multiple stages—from day-old chicks to mature birds—while manure is composted for crop production.',input:'Feed, BSF, azolla',output:'Birds, eggs, manure'},
 pigs:{tag:'Nutrient cycling',title:'Pigs convert feed into value',text:'Pig production creates breeding and market opportunities. Manure is collected and composted rather than treated as waste.',input:'Local feed ingredients',output:'Piglets, growers, manure'},
 fish:{tag:'Integrated aquaculture',title:'Fish ponds diversify production',text:'Fish farming broadens food and income sources and can support nutrient-efficient water management around horticulture.',input:'Water, feed, management',output:'Fish, nutrient-rich water'},
 crops:{tag:'Solar-powered horticulture',title:'Sunlight drives irrigation',text:'Solar pumps support drip and open irrigation for tomatoes, onions, carrots and leafy vegetables, improving dry-season resilience.',input:'Solar energy, water, compost',output:'Fresh produce, crop residues'},
 bsf:{tag:'Biological feed innovation',title:'BSF turns organic material into feed',text:'Black soldier fly larvae can convert suitable organic materials into a protein-rich feed ingredient while reducing waste.',input:'Suitable organic residues',output:'Larvae, frass'},
 azolla:{tag:'On-farm feed resource',title:'Azolla adds another local input',text:'Azolla is cultivated as a supplementary farm feed resource, helping diversify ingredients while requiring careful ration balancing.',input:'Water, nutrients, sunlight',output:'Fresh azolla biomass'}
};
function setSystem(key){const s=SYSTEM[key];if(!s)return;document.querySelectorAll('.system-btn').forEach(b=>b.classList.toggle('active',b.dataset.system===key));document.querySelector('#systemTag').textContent=s.tag;document.querySelector('#systemTitle').textContent=s.title;document.querySelector('#systemText').textContent=s.text;document.querySelector('#systemInput').textContent=s.input;document.querySelector('#systemOutput').textContent=s.output}
function observeReveals(){const items=document.querySelectorAll('.reveal:not(.visible)');const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});items.forEach(x=>io.observe(x))}
function animateCounters(){document.querySelectorAll('[data-count]').forEach(el=>{const target=+el.dataset.count;const suffix=el.dataset.suffix||'';let start=0;const dur=1300;const tick=(t)=>{if(!el._start)el._start=t;const p=Math.min((t-el._start)/dur,1);el.textContent=Math.floor(target*(1-Math.pow(1-p,3)))+suffix;if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)})}
function init(){
 renderProducts();observeReveals();
 document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderProducts(b.dataset.filter)});
 document.querySelectorAll('.system-btn').forEach(b=>b.onclick=()=>setSystem(b.dataset.system));
 document.querySelector('#menuBtn')?.addEventListener('click',()=>document.querySelector('#mobileMenu').classList.toggle('open'));
 document.querySelectorAll('[data-open-order]').forEach(b=>b.onclick=()=>openOrder(b.dataset.openOrder||''));
 document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>closeModal(b.dataset.close));
 document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModal(m.id)}));
 document.querySelector('#orderForm')?.addEventListener('submit',e=>{e.preventDefault();sendWhatsApp(e.currentTarget)});
 document.querySelector('#contactForm')?.addEventListener('submit',e=>{e.preventDefault();sendWhatsApp(e.currentTarget)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.modal.open').forEach(m=>closeModal(m.id))});
 const counterBand=document.querySelector('#impactBand');if(counterBand){new IntersectionObserver((es,io)=>{if(es[0].isIntersecting){animateCounters();io.disconnect()}},{threshold:.35}).observe(counterBand)}
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>document.querySelector('#mobileMenu')?.classList.remove('open')));
}
document.addEventListener('DOMContentLoaded',init);
