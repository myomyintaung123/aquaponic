const MENU_DATA = [
  {
    category: "Fish Products",
    items: [
      { id: 1, name: "Dory Patin (500g-600g)", price: 12, unit: "pc", image: "images/patin.jpg" },
      { id: 2, name: "Dory Patin (700g-800g)", price: 18, unit: "pc", image: "images/patin.jpg" },
      { id: 3, name: "Jade Perch (200g-300g)", price: 12, unit: "pc", image: "images/jade_perch.jpg" },
      { id: 4, name: "Jade Perch (400g-480g)", price: 20, unit: "pc", image: "images/jade_perch.jpg" },
      { id: 5, name: "Empurau (500g-700g)", price: 150, unit: "pc", image: "images/empurau.jpg" },
      { id: 6, name: "Tilapia (400g-500g)", price: 10, unit: "pc", image: "images/tilapia.jpg" },
      { id: 7, name: "Tilapia (Above 500g)", price: 12, unit: "pc", image: "images/tilapia.jpg" },
      { id: 8, name: "Live Seawater Prawns (1kg)", price: 25, unit: "kg", image: "images/fresh_prawn.png" },
      { id: 9, name: "Live Seawater Prawns (500g)", price: 15, unit: "kg", image: "images/fresh_prawn.png" }
    ]
  },
  {
    category: "Fresh Vegetables",
    promoText: "🎉 Buy Any 3 Vegetables for Only $10",
    items: [
      { id: 10, name: "Brazilian Spinach (200g)", price: 4, unit: "pkt", image: "images/vege_5.png" },
      { id: 11, name: "Aquacress (150g)", price: 3, unit: "pkt", image: "images/vege_2.png" },
      { id: 12, name: "Nai Bai (250g)", price: 4, unit: "pkt", image: "images/vege_6.png" },
      { id: 13, name: "Javanese Ginseng", price: 4, unit: "box", image: "images/ginseng.png" },
      { id: 14, name: "Malabar Spinach", price: 3, unit: "pkt", image: "images/vege_3.png" },
      { id: 15, name: "Sweet Potato Leaves (200g)", price: 2, unit: "bundle", image: "images/vege_1.png" },
      { id: 16, name: "Sweet Potato Leaves (600g)", price: 5, unit: "bundle", image: "images/vege_1.png" }
    ]
  },
  {
    category: "Food Products",
    items: [
      { id: 17, name: "Brazilian Spinach Ice Cream (100g)", price: 3, unit: "cup", image: "images/ice-cream.png", promo: "Buy 5, Get 1 Free" },
      { id: 18, name: "Farm Fresh Pandan Juice (350ml)", price: 3, unit: "bot", image: "images/pandan-juice.png", promo: "Buy 5, Get 1 Free" },
      { id: 19, name: "Pong Pong Fish (300g)", price: 12, unit: "pkt", image: "images/pong_2.png", promo: "Buy 3, Get 1 Free" },
      { id: 20, name: "Chewy Prawn Balls (300g)", price: 18, unit: "pkt", image: "images/chewy.png", promo: "Buy 2, Get 1 Veggie Free" },
      { id: 21, name: "Namazu Kabayaki (170g)", price: 10, unit: "pkt", image: "images/kabayaki.png" }
    ]
  }
];

// ================= SUPABASE INITIALIZATION =================
const SUPABASE_URL = 'https://nrhtomcijqvymzbbzsid.supabase.co';
const SUPABASE_KEY = 'sb_publishable_EF5Y5lyow2T2qeriQYNxGw_LXzKE...'; // Publishable Key ထည့်ပါ

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Local State
let cart = {};
let submittedOrders = [];
let currentCustomerOrder = JSON.parse(localStorage.getItem('myo_current_customer_order')) || null;

// Admin Lock Auth
const ADMIN_PIN = "698946";
let clickCount = 0;
let clickTimer = null;

function checkUrlForAdmin() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('admin') === 'true') {
    enableAdminMode();
  }
}

function handleLogoClick() {
  clickCount++;
  clearTimeout(clickTimer);
  clickTimer = setTimeout(() => { clickCount = 0; }, 1000);

  if (clickCount >= 3) {
    clickCount = 0;
    document.getElementById('admin-pass-modal').classList.remove('hidden');
  }
}

function verifyAdminPin() {
  const inputPin = document.getElementById('admin-pin-input').value;
  if (inputPin === ADMIN_PIN) {
    closeAdminPassModal();
    enableAdminMode();
    switchView('admin');
  } else {
    alert("Incorrect PIN Code");
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

// Theme Switcher
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  document.getElementById('theme-btn').innerText = newTheme === 'light' ? '🌙' : '☀️';
}

// Render Menu
function renderMenu() {
  const container = document.getElementById('menu-container');
  container.innerHTML = '';

  MENU_DATA.forEach(cat => {
    let section = document.createElement('div');
    section.className = 'menu-section';
    
    let html = `
      <h3 class="category-title" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
        <span>${cat.category}</span>
        ${cat.promoText ? `<span style="font-size: 0.75rem; background: #fef08a; color: #854d0e; padding: 4px 8px; border-radius: 6px; font-weight: bold;">${cat.promoText}</span>` : ''}
      </h3>
    `;
    
    cat.items.forEach(item => {
      const qty = cart[item.id] || 0;
      html += `
        <div class="item-card" style="display: flex; align-items: center; gap: 12px; padding: 10px; position: relative;">
          <img src="${item.image}" alt="${item.name}" style="width: 65px; height: 65px; object-fit: cover; border-radius: 8px; flex-shrink: 0;" onerror="this.src='https://via.placeholder.com/65'">
          <div style="flex: 1;">
            <div class="item-name" style="font-weight: bold; font-size: 0.95rem;">${item.name}</div>
            <div class="item-price" style="color: var(--primary-color); font-weight: 600; margin-top: 2px;">$${item.price} / ${item.unit}</div>
            ${item.promo ? `<div style="display: inline-block; font-size: 0.7rem; background: #fef08a; color: #854d0e; padding: 2px 6px; border-radius: 4px; font-weight: bold; margin-top: 4px;">🏷️ ${item.promo}</div>` : ''}
          </div>
          <div>
            ${qty > 0 ? `
              <div class="counter-box">
                <button class="counter-btn" onclick="updateQty(${item.id}, -1)">-</button>
                <span style="font-weight: bold; font-size: 0.9rem;">${qty}</span>
                <button class="counter-btn" onclick="updateQty(${item.id}, 1)">+</button>
              </div>
            ` : `
              <button class="btn-add" onclick="updateQty(${item.id}, 1)">+ Add</button>
            `}
          </div>
        </div>
      `;
    });

    section.innerHTML = html;
    container.appendChild(section);
  });

  updateCartBar();
  checkCustomerActiveOrder();
}

function updateQty(id, delta) {
  const current = cart[id] || 0;
  const updated = current + delta;
  if (updated <= 0) {
    delete cart[id];
  } else {
    cart[id] = updated;
  }
  renderMenu();
}

function getCartItems() {
  let list = [];
  MENU_DATA.forEach(cat => {
    cat.items.forEach(item => {
      if (cart[item.id]) {
        list.push({ ...item, qty: cart[item.id] });
      }
    });
  });
  return list;
}

function updateCartBar() {
  const cartBar = document.getElementById('cart-bar');
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

// Order Submission to Supabase
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

  // Push to Supabase Database
  const { error } = await supabaseClient
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
    }]);

  if (error) {
    console.error('Supabase Error:', error);
    alert('Order ပို့မရပါ။ အင်တာနက် လိုင်းစစ်ပေးပါ။');
    return;
  }

  currentCustomerOrder = newOrder;
  localStorage.setItem('myo_current_customer_order', JSON.stringify(currentCustomerOrder));

  cart = {};
  showCurrentOrderSlip();
}

function showCurrentOrderSlip() {
  if (!currentCustomerOrder) return;

  document.getElementById('menu-container').classList.add('hidden');
  document.getElementById('cart-bar').classList.add('hidden');
  document.getElementById('active-order-banner').classList.add('hidden');
  document.getElementById('order-slip-modal').classList.remove('hidden');

  document.getElementById('slip-order-id').innerText = `Order #${currentCustomerOrder.orderId} • ${currentCustomerOrder.tableNo}`;
  const slipCustomer = document.getElementById('slip-customer-name');
  if (slipCustomer) slipCustomer.innerText = `Customer: ${currentCustomerOrder.customerName}`;
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

function hideOrderSlip() {
  document.getElementById('order-slip-modal').classList.add('hidden');
  document.getElementById('menu-container').classList.remove('hidden');
  checkCustomerActiveOrder();
}

function checkCustomerActiveOrder() {
  const banner = document.getElementById('active-order-banner');
  if (currentCustomerOrder) {
    const isStillActive = submittedOrders.some(o => o.orderId === currentCustomerOrder.orderId);
    if (isStillActive) {
      banner.classList.remove('hidden');
      document.getElementById('active-order-text').innerText = `Order #${currentCustomerOrder.orderId} is being prepared...`;
    } else {
      currentCustomerOrder = null;
      localStorage.removeItem('myo_current_customer_order');
      banner.classList.add('hidden');
    }
  } else {
    banner.classList.add('hidden');
  }
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
  }
}

// Supabase မှ Order များကို ရယူပြီး Admin UI တွင် ဖော်ပြခြင်း
async function fetchAndRenderAdminOrders() {
  const { data, error } = await supabaseClient
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
  checkCustomerActiveOrder();
}

// Render Admin Orders
function renderAdminOrders() {
  const container = document.getElementById('admin-orders-container');
  document.getElementById('admin-count').innerText = submittedOrders.length;

  if (submittedOrders.length === 0) {
    container.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center;">No active orders.</p>';
    return;
  }

  container.innerHTML = '';
  submittedOrders.forEach((order, idx) => {
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
            <input type="number" id="discount-${order.orderId}" value="${order.discount || 0}" min="0" onchange="updateOrderDetails('${order.orderId}')" style="width: 70px; padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border-color); text-align: right;">
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

// Dynamic updates
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

    // Update in Supabase
    await supabaseClient
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

// Receipt Image Download & Remove from Supabase
function receivedAndSave(orderId, dbId) {
  updateOrderDetails(orderId);
  const cardElement = document.getElementById(`order-card-${orderId}`);
  const actionButtons = cardElement.querySelector('.action-buttons-group');

  if (actionButtons) actionButtons.style.display = 'none';

  html2canvas(cardElement, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff'
  }).then(async canvas => {
    const link = document.createElement('a');
    link.download = `Receipt_${orderId}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    if (actionButtons) actionButtons.style.display = 'flex';
    await completeOrder(dbId);
  });
}

async function completeOrder(dbId) {
  await supabaseClient.from('orders').delete().eq('id', dbId);
  fetchAndRenderAdminOrders();
}

// Supabase Realtime Listener setup
function listenForRealtimeOrders() {
  supabaseClient
    .channel('public:orders')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
      fetchAndRenderAdminOrders();
    })
    .subscribe();
}

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  checkUrlForAdmin();
  renderMenu();
  fetchAndRenderAdminOrders();
  listenForRealtimeOrders();
});