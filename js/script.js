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
      { id: 11, name: "Aquacress (150g)", price: 3, unit: "pkt", image: "images/vege_2.png", info: "Aquaponic  Hong Kong WaterCress with a mild taste of ginseng after cooking.", available: true },
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
      { id: 19, name: "Pong Pong Fish (300g)", price: 12, unit: "pkt", image: "images/pong_2.png", promo: "Buy 3, Get 1 Free", info: "Special Pong Pong Fish Bites - a delectable dish crafted with care. These irresistible fish bites are made with 100% real fish, meticulously farmed in our commercial size aquaponic technologies without any chemicals or growth hormones. The Star of this fish bites is the Namasu fish, a delightful white-fleshed variety known by its mild taste. Each fish bites is lovingly coated in our specially blended batter, ensuring a succulent burst of flavour when cooked to perfection.", available: true },
      { id: 20, name: "Chewy Prawn Balls (300g)", price: 18, unit: "pkt", image: "images/chewy.png", promo: "Buy 2, Get 1 Veggie Free", info: "Nippon SG Chewy Prawnies are hand-made, delectable prawn balls crafted with a commitment to sustainability. Made from 98% real prawns, they are cultivated using advanced Urban Seawater Farming and Aquaponic technologies, ensuring a fresh and flavorful product. Each prawn undergoes a thorough detoxification process and is raised without growth hormones, guaranteeing quality and safety. The unique chewy texture comes from the special batter that coats each ball, resulting in a succulent burst of flavor when cooked to perfection. Enjoy the taste of quality and responsible sourcing with every bite!", available: true },
      { id: 21, name: "Namazu Kabayaki (170g)", price: 10, unit: "pkt", image: "images/kabayaki.png", info: "Japanese style grilled fish packet.", available: true }
    ]
  }
];

// Supabase Initialization
const SUPABASE_URL = 'https://nrhtomcijqvymzbbzsid.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yaHRvbWNpanF2eW16YmJ6c2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0OTY0OTYsImV4cCI6MjEwNTA3MjQ5Nn0.Ioqg3601HHG7c0nThsusRTF5ARy9aCnhaU7jSvFF6N0';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// State
let cart = {};
let submittedOrders = [];
let currentCustomerOrder = JSON.parse(localStorage.getItem('myo_current_customer_order')) || null;
let stockStatus = {};

// Admin Auth
const ADMIN_PIN = "698946";
let clickCount = 0;
let clickTimer = null;

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

function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  document.getElementById('theme-btn').innerText = newTheme === 'light' ? '🌙' : '☀️';
}

// Supabase Stock Inventory Functions
async function fetchStockStatus() {
  try {
    const { data, error } = await supabaseClient
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
    // Always render menu after fetch completes so phone gets fresh stock data
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

  const { error } = await supabaseClient
    .from('inventory')
    .upsert({ item_id: id, is_available: newStatus });

  if (error) {
    console.error("Error updating stock status:", error);
    alert("Stock update failed. Please check connection.");
  }
}

function listenForRealtimeStock() {
  supabaseClient
    .channel('public:inventory')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'inventory' }, () => {
      fetchStockStatus();
    })
    .subscribe();
}

// Render Customer Menu
function renderMenu() {
  const container = document.getElementById('menu-container');
  if (!container) return;
  container.innerHTML = '';

  MENU_DATA.forEach(cat => {
    let section = document.createElement('div');
    section.className = 'menu-section';
    
    let itemsToDisplay = cat.items.filter(item => stockStatus[item.id] !== false);

    if (itemsToDisplay.length === 0) return;

    let html = `
      <h3 class="category-title" style="display: flex; justify-space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
        <span>${cat.category}</span>
        ${cat.promoText ? `<span style="font-size: 0.75rem; background: #fef08a; color: #854d0e; padding: 4px 8px; border-radius: 6px; font-weight: bold;">${cat.promoText}</span>` : ''}
      </h3>
    `;
    
    itemsToDisplay.forEach(item => {
      const qty = cart[item.id] || 0;
      html += `
        <div class="item-card">
          <img src="${item.image}" alt="${item.name}" class="item-img" onerror="this.src='https://via.placeholder.com/60'">
          <div class="item-info">
            <div class="item-name">${item.name}</div>
            <div class="item-price">$${item.price} / ${item.unit}</div>
            ${item.promo ? `<div class="item-promo">🏷️ ${item.promo}</div>` : ''}
          </div>
          <div class="item-actions">
            <button onclick="openProductInfo(${item.id})" class="btn-info" title="View details">ℹ️</button>
            ${qty > 0 ? `
              <div class="counter-box">
                <button class="counter-btn" onclick="updateQty(${item.id}, -1)">-</button>
                <span style="font-weight: bold; font-size: 0.85rem;">${qty}</span>
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

function openProductInfo(id) {
  let found = null;
  MENU_DATA.forEach(cat => {
    cat.items.forEach(i => { if (i.id === id) found = i; });
  });
  if (found) {
    document.getElementById('info-modal-title').innerText = found.name;
    document.getElementById('info-modal-desc').innerText = found.info || "Fresh quality guaranteed from Singa-Ponics.";
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

// Order Submission
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

  const { data, error } = await supabaseClient
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
  localStorage.setItem('myo_current_customer_order', JSON.stringify(currentCustomerOrder));

  if (customerNameInput) customerNameInput.value = '';
  cart = {};

  showCurrentOrderSlip();
}

function toggleNotificationSlip() {
  if (!currentCustomerOrder) {
    alert("No active order found.");
    return;
  }
  
  const modal = document.getElementById('order-slip-modal');
  if (modal.classList.contains('hidden')) {
    showCurrentOrderSlip();
  } else {
    hideOrderSlip();
  }
}

function showCurrentOrderSlip() {
  if (!currentCustomerOrder) {
    alert("No active order found.");
    return;
  }

  document.getElementById('menu-container').classList.add('hidden');
  document.getElementById('cart-bar').classList.add('hidden');
  document.getElementById('active-order-banner').classList.add('hidden');
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
    }, 'image/png');
  });
}

async function cancelCustomerOrder() {
  if (!currentCustomerOrder) return;

  if (confirm("Are you sure you want to cancel this order?")) {
    if (currentCustomerOrder.id) {
      await supabaseClient.from('orders').delete().eq('id', currentCustomerOrder.id);
    }
    currentCustomerOrder = null;
    localStorage.removeItem('myo_current_customer_order');
    hideOrderSlip();
  }
}

function hideOrderSlip() {
  document.getElementById('order-slip-modal').classList.add('hidden');
  document.getElementById('menu-container').classList.remove('hidden');
  checkCustomerActiveOrder();
}

function checkCustomerActiveOrder() {
  const banner = document.getElementById('active-order-banner');
  const badge = document.getElementById('notif-badge');
  if (!banner || !badge) return;

  if (currentCustomerOrder) {
    banner.classList.remove('hidden');
    badge.classList.remove('hidden');
    badge.innerText = '1';
    document.getElementById('active-order-text').innerText = `Order #${currentCustomerOrder.orderId} is being prepared...`;
  } else {
    banner.classList.add('hidden');
    badge.classList.add('hidden');
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
    renderAdminInventory();
  }
}

// Fetch & Render Admin Orders
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

function receivedAndSave(orderId, dbId) {
  updateOrderDetails(orderId);
  const cardElement = document.getElementById(`order-card-${orderId}`);
  const actionButtons = cardElement.querySelector('.action-buttons-group');

  if (actionButtons) actionButtons.style.display = 'none';

  html2canvas(cardElement, { scale: 2, useCORS: true, backgroundColor: '#ffffff' }).then(async canvas => {
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
  await supabaseClient.from('orders').delete().eq('id', dbId);
  fetchAndRenderAdminOrders();
}

function listenForRealtimeOrders() {
  supabaseClient
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