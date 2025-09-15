// script.js — Responsive behaviors & cart logic (clean & minimal)
const products = [
  { id: 1, name: "Wireless Headphones", price: 49.99, img: "https://via.placeholder.com/600x400?text=Headphones" },
  { id: 2, name: "Smart Watch", price: 79.99, img: "https://via.placeholder.com/600x400?text=Smart+Watch" },
  { id: 3, name: "Gaming Mouse", price: 29.99, img: "https://via.placeholder.com/600x400?text=Mouse" },
  { id: 4, name: "Bluetooth Speaker", price: 39.99, img: "https://via.placeholder.com/600x400?text=Speaker" },
  { id: 5, name: "Backpack", price: 59.99, img: "https://via.placeholder.com/600x400?text=Backpack" },
  { id: 6, name: "Sunglasses", price: 19.99, img: "https://via.placeholder.com/600x400?text=Sunglasses" }
];

let cart = [];
const productList = document.getElementById('product-list');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartOpen = document.getElementById('cart-open');
const cartClose = document.getElementById('cart-close');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

function renderProducts(){
  productList.innerHTML = '';
  products.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'product';
    card.innerHTML = `
      <img class="media" loading="lazy" src="${p.img}" alt="${p.name}">
      <div class="body">
        <h3>${p.name}</h3>
        <div class="price">$${p.price.toFixed(2)}</div>
        <div class="actions">
          <button class="btn ghost" onclick="viewDetails(${p.id})">Details</button>
          <button class="btn primary" onclick="addToCart(${p.id})">Add to cart</button>
        </div>
      </div>
    `;
    productList.appendChild(card);
  });
}

function addToCart(id){
  const prod = products.find(x=>x.id===id);
  const existing = cart.find(x=>x.id===id);
  if(existing) existing.qty++;
  else cart.push({...prod, qty:1});
  updateCartUI();
}

function removeFromCart(id){
  cart = cart.filter(i=>i.id!==id);
  updateCartUI();
}

function updateCartUI(){
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item=>{
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <div>${item.name} <small>×${item.qty}</small></div>
      <div>
        <strong>$${(item.price * item.qty).toFixed(2)}</strong>
        <button class="btn ghost" style="margin-left:8px" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
    cartItems.appendChild(li);
  });
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
}

// Simple details placeholder
function viewDetails(id){
  const p = products.find(x=>x.id===id);
  alert(p.name + " — $" + p.price.toFixed(2));
}

// Modal controls
cartOpen.addEventListener('click', (e)=>{
  e.preventDefault();
  cartModal.setAttribute('aria-hidden', 'false');
});
cartClose.addEventListener('click', ()=> cartModal.setAttribute('aria-hidden', 'true'));
window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') cartModal.setAttribute('aria-hidden','true') });
cartModal.addEventListener('click', (e)=>{ if(e.target===cartModal) cartModal.setAttribute('aria-hidden','true') });

// Checkout
checkoutBtn.addEventListener('click', ()=>{
  if(cart.length===0){ alert('Cart is empty'); return; }
  alert('Checkout — total $' + cartTotal.textContent);
  cart = [];
  updateCartUI();
  cartModal.setAttribute('aria-hidden','true');
});

// Menu toggle for small screens
menuToggle.addEventListener('click', ()=>{
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  mainNav.style.display = expanded ? 'none' : 'block';
});

// initial render
renderProducts();
updateCartUI();
