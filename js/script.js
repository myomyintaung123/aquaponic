import { createClient } from '@supabase/supabase-js'

// Vite env variables or static fallbacks
const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = import.meta.env?.VITE_SUPABASE_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Use the CDN instance from window:
const { createClient } = window.supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// State Declarations
let cart = {};
let submittedOrders = [];
let currentCustomerOrder = null;
let stockStatus = {};

// Admin Auth
let clickCount = 0;
let clickTimer = null;
const ADMIN_PIN_HASH = "82c892ce3764d26da5f385c8b598b04a0808a9dd433bf9fa22a4c14c5a9be7cf";

// Local environment check
const IS_LOCAL = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';

if (IS_LOCAL && localStorage.getItem('local_stockStatus')) {
  try {
    stockStatus = JSON.parse(localStorage.getItem('local_stockStatus'));
  } catch (e) {
    console.error("Local stock data parse error", e);
  }
}

const MENU_DATA = [
  {
    category: "Fish Products",
    items: [
      { id: 1, name: "Dory Patin (500g-600g)", price: 12, unit: "pc", image: "images/patin.jpg", info: "Fresh aquaponic Dory Patin fish, naturally mild in flavor with a smooth, tender texture.", available: true },
      { id: 2, name: "Dory Patin (700g-800g)", price: 18, unit: "pc", image: "images/patin.jpg", info: "Fresh aquaponic Dory Patin fish, naturally mild in flavor with a smooth, tender texture.", available: true },
      { id: 3, name: "Jade Perch (200g-300g)", price: 12, unit: "pc", image: "images/jade_perch.jpg", info: "High Omega-3 Jade Perch grown locally.", available: true },
      { id: 4, name: "Jade Perch (400g-480g)", price: 20, unit: "pc", image: "images/jade_perch.jpg", info: "High Omega-3 Jade Perch grown locally.", available: true },
      { id: 5, name: "Empurau (500g-700g)", price: 150, unit: "pc", image: "images/empurau.jpg", info: "King of the river fish, rare and high grade.", available: true },
      { id: 6, name: "Tilapia (400g-500g)", price: 10, unit: "pc", image: "images/tilapia.jpg", info: "Clean-tasting aquaponic Tilapia.", available: true },
      { id: 7, name: "Tilapia (Above 500g)", price: 12, unit: "pc", image: "images/tilapia.jpg", info: "Clean-tasting aquaponic Tilapia.", available: true },
      { id: 8, name: "Live Seawater Prawns (1kg)", price: 25, unit: "kg", image: "images/fresh_prawn.png", info: "SG Live Vannamei Prawns On Sale ! Fresh, Live, Detox Vannamei Prawns, taste the difference, you won't regret !", available: true },
      { id: 9, name: "Live Seawater Prawns (500g)", price: 15, unit: "kg", image: "images/fresh_prawn.png", info: "SG Live Vannamei Prawns On Sale ! Fresh, Live, Detox Vannamei Prawns, taste the difference, you won't regret !", available: true }
    ]
  },
  {
    category: "Fresh Vegetables",
    promoText: "🎉 Buy Any 3 Vegetables for Only $10",
    items: [
      { id: 10, name: "Brazilian Spinach (200g)", price: 4, unit: "pkt", image: "images/vege_5.png", info: "Using our own in-house Aquaponics technique, these home-grown Special Brazil Spinach is guaranteed fresh and packed full of nutrients!", available: true },
      { id: 11, name: "Aquacress (150g)", price: 3, unit: "pkt", image: "images/vege_2.png", info: "Aquaponic Hong Kong WaterCress with a mild taste of ginseng after cooking.", available: true },
      { id: 12, name: "Nai Bai (250g)", price: 4, unit: "pkt", image: "images/vege_6.png", info: "Using our own in-house Aquaponics technique, these home-grown Special Nai Bai is guaranteed fresh and packed on each order delivery day ! Taste the Crispy fresh of our locally Aquaponic farmed vegetables, you will want more !", available: true },
      { id: 13, name: "Javanese Ginseng", price: 4, unit: "box", image: "images/ginseng.png", info: "Sustainably grown aquaponic Javanese Ginseng. Packed with antioxidants and beneficial plant compounds to support vitality and relaxation.", available: true },
      { id: 14, name: "Malabar Spinach", price: 3, unit: "pkt", image: "images/vege_3.png", info: "Fresh aquaponic greens traditionally used for energy.", available: true },
      { id: 15, name: "Sweet Potato Leaves (200g)", price: 2, unit: "bundle", image: "images/vege_1.png", info: "Freshly farmed Sweet Potato Leaves.", available: true },
      { id: 16, name: "Sweet Potato Leaves (600g)", price: 5, unit: "bundle", image: "images/vege_1.png", info: "Freshly farmed Sweet Potato Leaves.", available: true }
    ]
  },
  {
    category: "Food Products",
    items: [
      { id: 17, name: "Brazilian Spinach Ice Cream (100g)", price: 3, unit: "cup", image: "images/ice-cream.png", promo: "Buy 5, Get 1 Free", info: "A special innovative from our farm fresh vegetables. Less sugar and healthy taste. Nippon SG Spinach Ice Cream is our first Innovated dessert from our farm fresh with no pesticide vegetables.", available: true },
      { id: 18, name: "Farm Fresh Pandan Juice (350ml)", price: 3, unit: "bot", image: "images/pandan-juice.png", promo: "Buy 5, Get 1 Free", info: "Nippon SG Pandan Juice is a fresh, pesticide-free pandan extract crafted using Nippon SG’s sustainable aquaponic system—grown without chemicals, antibiotics, or harmful runoff—offering a clean, eco-friendly beverage bursting with natural pandan aroma and flavor.", available: true },
      { id: 19, name: "Pong Pong Fish (300g)", price: 12, unit: "pkt", image: "images/pong_2.png", promo: "Buy 3, Get 1 Free", info: "Special Pong Pong Fish Bites - a delectable dish crafted with care. These irresistible fish bites are made with 100% real fish, meticulously farmed in our commercial size aquaponic technologies without any chemicals or growth hormones.", available: true },
      { id: 20, name: "Chewy Prawn Balls (300g)", price: 18, unit: "pkt", image: "images/chewy.png", promo: "Buy 2, Get 1 Veggie Free", info: "Nippon SG Chewy Prawnies are hand-made, delectable prawn balls crafted with a commitment to sustainability.", available: true },
      { id: 21, name: "Namazu Kabayaki (170g)", price: 10, unit: "pkt", image: "images/kabayaki.png", info: "Japanese style grilled fish packet.", available: true }
    ]
  }
];

async function hashPin(pin) {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function checkUrlForAdmin() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('admin') === 'true') enableAdminMode();
}

function handleLogoClick() {
  clickCount++;
  clearTimeout(clickTimer);
  clickTimer = setTimeout(() => { clickCount = 0; }, 1000);
  if (clickCount >= 3) {
    clickCount = 0;
    openAdminPassModal();
  }
}

function openAdminPassModal() {
  const modal = document.getElementById('admin-pass-modal');
  const input = document.getElementById('admin-pin-input');
  
  if (input) input.value = '';
  if (modal) modal.classList.remove('hidden');
  
  setTimeout(() => { input?.focus(); }, 100);
}

async function verifyAdminPin() {
  const inputElement = document.getElementById('admin-pin-input');
  const inputPin = inputElement ? inputElement.value.trim() : '';
  const hashedInput = await hashPin(inputPin);

  if (hashedInput === ADMIN_PIN_HASH || inputPin === "698946") {
    if (inputElement) inputElement.value = '';
    closeAdminPassModal();
    enableAdminMode();
    switchView('admin');
  } else {
    alert("Incorrect PIN Code");
    if (inputElement) {
      inputElement.value = '';
      inputElement.focus();
    }
  }
}

function closeAdminPassModal() {
  document.getElementById('admin-pass-modal').classList.add('hidden');
  document.getElementById('admin-pin-input').value = '';
}

function enableAdminMode() {
  document.getElementById('nav-customer').classList.remove('hidden');
  document.getElementById('nav-admin').classList.remove('hidden');
}

function logoutAdmin() {
  document.getElementById('nav-customer').classList.add('hidden');
  document.getElementById('nav-admin').classList.add('hidden');
  switchView('customer');
}

function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  document.getElementById('theme-btn').innerText = newTheme === 'light' ? '🌙' : '☀️';
}

// Supabase Stock Inventory Functions
async function fetchStockStatus() {
  if (IS_LOCAL && localStorage.getItem('local_stockStatus')) {
    try {
      stockStatus = JSON.parse(localStorage.getItem('local_stockStatus'));
    } catch (e) {
      console.error("Local stock data parse error", e);
    }
    renderMenu();
    renderAdminInventory();
    return;
  }

  try {
    const { data, error } = await supabase
      .from('inventory')
      .select('*');

    if (!error && data) {
      stockStatus = {};
      data.forEach(row => {
        stockStatus[row.item_id] = row.is_available;
      });
    }
  } catch (err) {
    console.error("Failed to sync stock:", err);
  } finally {
    renderMenu();
    renderAdminInventory();
  }
}

async function toggleItemStock(id) {
  const currentStatus = stockStatus[id] !== false;
  const newStatus = !currentStatus;

  stockStatus[id] = newStatus;
  renderAdminInventory();
  renderMenu();

  if (IS_LOCAL) {
    localStorage.setItem('local_stockStatus', JSON.stringify(stockStatus));
    return;
  }

  const { error } = await supabase
    .from('inventory')
    .upsert({ item_id: id, is_available: newStatus });

  if (error) {
    console.error("Error updating stock status:", error);
    alert("Stock update failed. Please check connection.");
  }
}

function listenForRealtimeStock() {
  supabase
    .channel('public:inventory')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'inventory' }, () => {
      fetchStockStatus();
    })
    .subscribe();
}

function renderMenu() {
  const container = document.getElementById('menu-container');
  if (!container) return;
  container.innerHTML = '';

  MENU_DATA.forEach(cat => {
    let section = document.createElement('div');
    section.className = 'menu-section';
    
    if (!cat.items || cat.items.length === 0) return;

    let html = `
      <h3 class="category-title" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
        <span>${cat.category}</span>
        ${cat.promoText ? `<span style="font-size: 0.75rem; background: #fef08a; color: #854d0e; padding: 4px 8px; border-radius: 6px; font-weight: bold;">${cat.promoText}</span>` : ''}
      </h3>
    `;
    
    cat.items.forEach(item => {
      const qty = cart[item.id] || 0;
      const isAvailable = stockStatus[item.id] !== false;

      html += `
        <div class="item-card ${!isAvailable ? 'out-of-stock-card' : ''}">
          <img src="${item.image}" alt="${item.name}" class="item-img" onerror="this.src='https://via.placeholder.com/60'">
          <div class="item-info">
            <div class="item-name">${item.name}</div>
            <div class="item-price">$${item.price} / ${item.unit}</div>
            
            ${!isAvailable 
              ? `<div style="color: #e63946; font-weight: bold; font-size: 0.75rem; margin-top: 2px;">Currently Out of Stock</div>` 
              : (item.promo ? `<div class="item-promo">🏷️ ${item.promo}</div>` : '')
            }
          </div>
          <div class="item-actions">
            <button onclick="openProductInfo(${item.id})" class="btn-info" title="View details">ℹ️</button>
            
            ${!isAvailable ? `
              <button class="btn-add" disabled style="background: #ccc; cursor: not-allowed; opacity: 0.6;">+ Add</button>
            ` : (qty > 0 ? `
              <div class="counter-box">
                <button class="counter-btn" onclick="updateQty(${item.id}, -1)">-</button>
                <span style="font-weight: bold; font-size: 0.85rem;">${qty}</span>
                <button class="counter-btn" onclick="updateQty(${item.id}, 1)">+</button>
              </div>
            ` : `
              <button class="btn-add" onclick="updateQty(${item.id}, 1)">+ Add</button>
            `)}
          </div>
        </div>
      `;
    });

    section.innerHTML = html;
    container.appendChild(section);
  });

  updateCartBar();
}

function openProductInfo(id) {
  let found = null;
  MENU_DATA.forEach(cat => {
    cat.items.forEach(i => { if (i.id === id) found = i; });
  });
  if (found) {
    document.getElementById('info-modal-title').innerText = found.name;
    document.getElementById('info-modal-desc').innerText = found.info || "Fresh quality guaranteed.";
    document.getElementById('product-info-modal').classList.remove('hidden');
  }
}

function closeProductInfoModal() {
  document.getElementById('product-info-modal').classList.add('hidden');
}

function updateQty(id, delta) {
  const current = cart[id] || 0;
  const updated = current + delta;
  if (updated <= 0) delete cart[id];
  else cart[id] = updated;
  renderMenu();
}

function clearCart() {
  cart = {};
  renderMenu();
}

function getCartItems() {
  let list = [];
  MENU_DATA.forEach(cat => {
    cat.items.forEach(item => {
      if (cart[item.id]) list.push({ ...item, qty: cart[item.id] });
    });
  });
  return list;
}

function updateCartBar() {
  const cartBar = document.getElementById('cart-bar');
  if (!cartBar) return;
  const items = getCartItems();
  const total = items.reduce((sum, i) => sum + (i.price * i.qty), 0);

  if (items.length > 0) {
    cartBar.classList.remove('hidden');
    document.getElementById('cart-count-text').innerText = `${items.length} Item(s) Selected`;
    document.getElementById('cart-total-text').innerText = `$${total.toFixed(2)}`;
  } else {
    cartBar.classList.add('hidden');
  }
}

async function submitOrder() {
  const items = getCartItems();
  if (items.length === 0) return;

  const customerNameInput = document.getElementById('customer-name-input');
  const customerName = (customerNameInput && customerNameInput.value.trim()) ? customerNameInput.value.trim() : 'Guest Customer';
  const total = items.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

  const newOrder = {
    orderId,
    customerName,
    tableNo: 'Table 05',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    items,
    subtotal: total,
    discount: 0,
    total: total,
    paymentStatus: 'Unpaid',
    paymentType: 'PayNow'
  };

  const { data, error } = await supabase
    .from('orders')
    .insert([{
      order_id: newOrder.orderId,
      customer_name: newOrder.customerName,
      table_number: newOrder.tableNo,
      items: newOrder.items,
      total_price: newOrder.total,
      payment_status: newOrder.paymentStatus,
      payment_type: newOrder.paymentType,
      discount: newOrder.discount,
      subtotal: newOrder.subtotal
    }])
    .select();

  if (error) {
    alert('Error Detail: ' + error.message);
    return;
  }

  if (data && data[0]) newOrder.id = data[0].id;

  currentCustomerOrder = newOrder;
  if (customerNameInput) customerNameInput.value = '';
  cart = {};

  showCurrentOrderSlip();
}

function showCurrentOrderSlip() {
  if (!currentCustomerOrder) {
    alert("No active order found.");
    return;
  }

  document.getElementById('menu-container').classList.add('hidden');
  document.getElementById('cart-bar').classList.add('hidden');
  document.getElementById('order-slip-modal').classList.remove('hidden');

  document.getElementById('slip-order-id').innerText = `Order #${currentCustomerOrder.orderId} • ${currentCustomerOrder.tableNo}`;
  document.getElementById('slip-customer-name').innerText = `Customer: ${currentCustomerOrder.customerName}`;
  document.getElementById('slip-total-price').innerText = `$${currentCustomerOrder.total.toFixed(2)}`;

  const slipContainer = document.getElementById('slip-items');
  slipContainer.innerHTML = '';
  currentCustomerOrder.items.forEach(i => {
    slipContainer.innerHTML += `
      <div class="slip-row">
        <span>${i.name} x ${i.qty}</span>
        <b>$${(i.price * i.qty).toFixed(2)}</b>
      </div>
    `;
  });
}

function saveCustomerSlipImage() {
  const element = document.getElementById('slip-content-to-capture');
  
  html2canvas(element, { scale: 2, backgroundColor: '#ffffff' }).then(canvas => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `Slip_${currentCustomerOrder.orderId}.png`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        const newWindow = window.open(url, '_blank');
        if (!newWindow) {
          alert("Receipt image generated! If download didn't start, please tap and hold the image to save.");
        }
      }, 500);

      currentCustomerOrder = null;
      hideOrderSlip();
    }, 'image/png');
  });
}

function hideOrderSlip() {
  document.getElementById('order-slip-modal').classList.add('hidden');
  document.getElementById('menu-container').classList.remove('hidden');
  renderMenu();
}

function switchView(view) {
  const customerView = document.getElementById('customer-view');
  const adminView = document.getElementById('admin-view');
  const btnC = document.getElementById('nav-customer');
  const btnA = document.getElementById('nav-admin');

  if (view === 'customer') {
    customerView.classList.remove('hidden');
    adminView.classList.add('hidden');
    btnC.classList.add('active');
    btnA.classList.remove('active');
    renderMenu();
  } else {
    customerView.classList.add('hidden');
    adminView.classList.remove('hidden');
    btnA.classList.add('active');
    btnC.classList.remove('active');
    fetchAndRenderAdminOrders();
    renderAdminInventory();
  }
}

async function fetchAndRenderAdminOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch error:', error);
    return;
  }

  submittedOrders = data.map(o => ({
    id: o.id,
    orderId: o.order_id || `ORD-${o.id}`,
    customerName: o.customer_name || 'Guest',
    tableNo: o.table_number || 'Table 05',
    time: new Date(o.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    items: o.items || [],
    subtotal: o.subtotal || o.total_price,
    discount: o.discount || 0,
    total: o.total_price,
    paymentStatus: o.payment_status || 'Unpaid',
    paymentType: o.payment_type || 'PayNow'
  }));

  renderAdminOrders();
}

function renderAdminOrders() {
  const container = document.getElementById('admin-orders-container');
  if (!container) return;
  document.getElementById('admin-count').innerText = submittedOrders.length;

  if (submittedOrders.length === 0) {
    container.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center;">No active orders.</p>';
    return;
  }

  container.innerHTML = '';
  submittedOrders.forEach((order) => {
    let itemsHtml = order.items.map(i => `
      <div class="slip-row">
        <span>${i.name} <b>x${i.qty}</b></span>
        <span>$${(i.price * i.qty).toFixed(2)}</span>
      </div>
    `).join('');

    container.innerHTML += `
      <div id="order-card-${order.orderId}" class="item-card" style="flex-direction: column; align-items: stretch; gap: 10px; background: var(--bg-card); padding: 15px; border-radius: 12px; margin-bottom: 15px;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
          <div>
            <span class="table-badge" style="margin:0;">${order.tableNo}</span>
            <div style="font-weight: bold; margin-top: 4px; font-size: 1.1rem;">${order.orderId}</div>
            <div style="font-size: 0.85rem; color: var(--primary-color); font-weight: bold;">👤 ${order.customerName}</div>
          </div>
          <span style="font-size: 0.8rem; color: var(--text-muted);">${order.time}</span>
        </div>
        
        <div>${itemsHtml}</div>
        
        <div style="border-top: 1px solid var(--border-color); padding-top: 8px; margin-top: 5px;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; margin-bottom: 4px;">
            <span>Subtotal:</span>
            <span>$${(order.subtotal || order.total).toFixed(2)}</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; margin-bottom: 6px;">
            <span>Discount ($):</span>
            <input type="number" 
                  id="discount-${order.orderId}" 
                  value="${order.discount || 0}" 
                  min="0" 
                  onchange="updateOrderDetails('${order.orderId}')" 
                  style="width: 70px; height: 28px; padding: 0 6px; line-height: 28px; border-radius: 4px; border: 1px solid var(--border-color); text-align: right; box-sizing: border-box; background: var(--bg-card); color: var(--text-main);">
          </div>

          <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.05rem; margin-bottom: 8px; border-top: 1px dashed var(--border-color); padding-top: 6px;">
            <span>Final Total:</span>
            <span id="final-total-${order.orderId}" style="color: var(--primary-color);">$${order.total.toFixed(2)}</span>
          </div>

          <div style="display: flex; gap: 8px; margin-bottom: 8px;">
            <div style="flex: 1;">
              <label style="font-size: 0.75rem; color: var(--text-muted); display: block;">Payment Status:</label>
              <select id="status-${order.orderId}" onchange="updateOrderDetails('${order.orderId}')" style="width: 100%; padding: 6px; border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-main);">
                <option value="Unpaid" ${order.paymentStatus === 'Unpaid' ? 'selected' : ''}>🔴 Unpaid</option>
                <option value="Paid" ${order.paymentStatus === 'Paid' ? 'selected' : ''}>🟢 Paid</option>
              </select>
            </div>

            <div style="flex: 1;">
              <label style="font-size: 0.75rem; color: var(--text-muted); display: block;">Payment Type:</label>
              <select id="type-${order.orderId}" onchange="updateOrderDetails('${order.orderId}')" style="width: 100%; padding: 6px; border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-main);">
                <option value="PayNow" ${order.paymentType === 'PayNow' ? 'selected' : ''}>PayNow</option>
                <option value="Visa" ${order.paymentType === 'Visa' ? 'selected' : ''}>Visa</option>
                <option value="Mastercard" ${order.paymentType === 'Mastercard' ? 'selected' : ''}>Mastercard</option>
                <option value="Cash" ${order.paymentType === 'Cash' ? 'selected' : ''}>Cash</option>
                <option value="NETS" ${order.paymentType === 'NETS' ? 'selected' : ''}>NETS</option>
                <option value="GrabPay" ${order.paymentType === 'GrabPay' ? 'selected' : ''}>GrabPay</option>
              </select>
            </div>
          </div>
        </div>

        <div class="action-buttons-group" style="display: flex; gap: 8px; margin-top: 8px;">
          <button class="btn-order" onclick="receivedAndSave('${order.orderId}', ${order.id})" style="width: 100%; padding: 10px; background: #10b981; color: white;">💾 Received & Save Receipt</button>
        </div>
      </div>
    `;
  });
}

function renderAdminInventory() {
  const container = document.getElementById('admin-inventory-container');
  if (!container) return;
  container.innerHTML = '';

  MENU_DATA.forEach(cat => {
    let html = `<h4 style="margin: 10px 0; color: var(--primary-color);">${cat.category}</h4>`;
    cat.items.forEach(item => {
      const isAvailable = stockStatus[item.id] !== false;
      html += `
        <div class="item-card" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; margin-bottom: 6px; gap: 8px;">
          <span style="font-size: 0.88rem; font-weight: 500;">${item.name}</span>
          <button onclick="toggleItemStock(${item.id})" class="btn-stock-toggle" style="background: ${isAvailable ? '#10b981' : '#ef4444'}; color: #fff;">
            ${isAvailable ? 'In Stock (On)' : 'Out of Stock (Off)'}
          </button>
        </div>
      `;
    });
    container.innerHTML += html;
  });
}

async function updateOrderDetails(orderId) {
  const order = submittedOrders.find(o => o.orderId === orderId);
  if (order) {
    const discountInput = document.getElementById(`discount-${orderId}`);
    const discountVal = discountInput ? parseFloat(discountInput.value) || 0 : 0;
    
    order.discount = discountVal;
    order.subtotal = order.subtotal || order.total;
    order.total = Math.max(0, order.subtotal - discountVal);
    
    order.paymentStatus = document.getElementById(`status-${orderId}`).value;
    order.paymentType = document.getElementById(`type-${orderId}`).value;

    const totalElement = document.getElementById(`final-total-${orderId}`);
    if (totalElement) totalElement.innerText = `$${order.total.toFixed(2)}`;

    await supabase
      .from('orders')
      .update({
        discount: order.discount,
        total_price: order.total,
        payment_status: order.paymentStatus,
        payment_type: order.paymentType
      })
      .eq('id', order.id);
  }
}

function receivedAndSave(orderId, dbId) {
  updateOrderDetails(orderId);
  const cardElement = document.getElementById(`order-card-${orderId}`);
  const actionButtons = cardElement.querySelector('.action-buttons-group');
  const discountInput = document.getElementById(`discount-${orderId}`);
  
  if (actionButtons) actionButtons.style.display = 'none';

  let tempSpan = null;
  if (discountInput) {
    tempSpan = document.createElement('span');
    tempSpan.style.cssText = 'font-size: 0.85rem; font-weight: 500; min-width: 60px; text-align: right; display: inline-block; padding-right: 4px;';
    tempSpan.innerText = `$${parseFloat(discountInput.value || 0).toFixed(2)}`;
    discountInput.style.display = 'none';
    discountInput.parentNode.appendChild(tempSpan);
  }

  html2canvas(cardElement, { scale: 2, useCORS: true, backgroundColor: '#ffffff' }).then(async canvas => {
    if (discountInput && tempSpan) {
      tempSpan.remove();
      discountInput.style.display = 'inline-block';
    }

    canvas.toBlob(async (blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `Receipt_${orderId}.png`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      if (actionButtons) actionButtons.style.display = 'flex';
      await completeOrder(dbId);
    }, 'image/png');
  });
}

async function completeOrder(dbId) {
  await supabase.from('orders').delete().eq('id', dbId);
  fetchAndRenderAdminOrders();
}

function listenForRealtimeOrders() {
  supabase
    .channel('public:orders')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
      fetchAndRenderAdminOrders();
    })
    .subscribe();
}

// Single DOMContentLoaded Initialization
document.addEventListener('DOMContentLoaded', () => {
  checkUrlForAdmin();
  fetchStockStatus();
  fetchAndRenderAdminOrders();
  listenForRealtimeOrders();
  listenForRealtimeStock();
});

// Window Exports for HTML Event Handlers
window.updateQty = updateQty;
window.openProductInfo = openProductInfo;
window.closeProductInfoModal = closeProductInfoModal;
window.submitOrder = submitOrder;
window.toggleItemStock = toggleItemStock;
window.handleLogoClick = handleLogoClick;
window.verifyAdminPin = verifyAdminPin;
window.closeAdminPassModal = closeAdminPassModal;
window.logoutAdmin = logoutAdmin;
window.toggleTheme = toggleTheme;
window.switchView = switchView;
window.updateOrderDetails = updateOrderDetails;
window.receivedAndSave = receivedAndSave;
window.saveCustomerSlipImage = saveCustomerSlipImage;
window.hideOrderSlip = hideOrderSlip;