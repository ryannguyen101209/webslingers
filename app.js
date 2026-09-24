// Interactive bits: live preview builder, quote calculator, hero web-sling, scroll reveal.
// Static text is translated by i18n.js; the text built here lives in COPY below.
(function () {
  const IG_URL = 'https://instagram.com/webslingers.sg';
  const EMAIL = 'ryannguyen101209@gmail.com';
  const BASE = 200000;
  const PER_PAGE = 100000;
  const MAX_PAGES = 20;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = id => document.getElementById(id);
  const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'vi');

  const TYPES = {
    cafe: {
      vi: { name: 'quán cà phê', title: 'Cà phê ngon, ghé là mê', btn: 'Xem thực đơn',
            items: ['Cà phê sữa', 'Bạc xỉu', 'Trà đào', 'Bánh ngọt'],
            pages: ['Trang chủ', 'Thực đơn', 'Giới thiệu', 'Thư viện ảnh', 'Liên hệ', 'Khuyến mãi', 'Tuyển dụng'] },
      en: { name: 'café', title: 'Good coffee, every morning', btn: 'See the menu',
            items: ['Iced milk coffee', 'Bạc xỉu', 'Peach tea', 'Pastries'],
            pages: ['Home', 'Menu', 'About', 'Gallery', 'Contact', 'Offers', 'Jobs'] },
    },
    food: {
      vi: { name: 'nhà hàng', title: 'Món ngon như nhà nấu', btn: 'Xem thực đơn',
            items: ['Phở bò', 'Cơm tấm', 'Gỏi cuốn', 'Chè'],
            pages: ['Trang chủ', 'Thực đơn', 'Giới thiệu', 'Thư viện ảnh', 'Liên hệ', 'Khuyến mãi', 'Sự kiện'] },
      en: { name: 'restaurant', title: 'Tastes like home', btn: 'See the menu',
            items: ['Beef phở', 'Broken rice', 'Spring rolls', 'Chè'],
            pages: ['Home', 'Menu', 'About', 'Gallery', 'Contact', 'Offers', 'Events'] },
    },
    shop: {
      vi: { name: 'cửa hàng', title: 'Hàng xinh, giá mềm', btn: 'Xem sản phẩm',
            items: ['Hàng mới', 'Bán chạy', 'Quà tặng', 'Giảm giá'],
            pages: ['Trang chủ', 'Sản phẩm', 'Giới thiệu', 'Đổi trả', 'Liên hệ', 'Blog', 'Câu hỏi'] },
      en: { name: 'shop', title: 'Nice things, fair prices', btn: 'See products',
            items: ['New in', 'Best sellers', 'Gifts', 'Sale'],
            pages: ['Home', 'Products', 'About', 'Returns', 'Contact', 'Blog', 'Questions'] },
    },
    salon: {
      vi: { name: 'salon & spa', title: 'Đẹp hơn mỗi lần ghé', btn: 'Xem dịch vụ',
            items: ['Cắt tóc', 'Nhuộm', 'Làm nail', 'Massage'],
            pages: ['Trang chủ', 'Dịch vụ', 'Bảng giá', 'Giới thiệu', 'Liên hệ', 'Thư viện ảnh', 'Đội ngũ'] },
      en: { name: 'salon & spa', title: 'Look better every visit', btn: 'See services',
            items: ['Haircut', 'Colour', 'Nails', 'Massage'],
            pages: ['Home', 'Services', 'Prices', 'About', 'Contact', 'Gallery', 'Team'] },
    },
  };

  const COPY = {
    vi: {
      emptyName: 'Tên của bạn',
      myBiz: 'doanh nghiệp của mình',
      summary: (n, t) => `Xem trước: website ${t} tên ${n}.`,
      pageN: k => `Trang ${k}`,
      forType: t => `Cho ${t}`,
      forName: (n, t) => `Cho ${n} · ${t}`,
      onePage: 'Website 1 trang',
      formula: (x, per) => `${fmt(BASE)} + ${x} trang × ${per}`,
      date: (a, b) => `Nhắn hôm nay, dự kiến lên sóng từ ${a} đến ${b}.`,
      live: (n, total) => `${n} trang, tạm tính ${total}`,
      msg: (name, type, n, total) =>
        `Chào Webslingers! Mình muốn làm website cho ${name} (${type}), khoảng ${n} trang. Tạm tính ${total}. Tư vấn giúp mình nhé!`,
      subject: who => `Báo giá website: ${who}`,
      copied: 'Đã copy tin nhắn! Dán vào tin nhắn Instagram là xong.',
      copyFail: 'Không copy tự động được. Bạn copy tin nhắn bên dưới rồi gửi qua Instagram nhé.',
    },
    en: {
      emptyName: 'Your business',
      myBiz: 'my business',
      summary: (n, t) => `Preview: a ${t} website called ${n}.`,
      pageN: k => `Page ${k}`,
      forType: t => `For a ${t}`,
      forName: (n, t) => `For ${n} · ${t}`,
      onePage: 'One-page site',
      formula: (x, per) => `${fmt(BASE)} + ${x} extra page${x > 1 ? 's' : ''} × ${per}`,
      date: (a, b) => `Message today, expect to be live between ${a} and ${b}.`,
      live: (n, total) => `${n} pages, estimate ${total}`,
      msg: (name, type, n, total) =>
        `Hi Webslingers! I'd like a website for ${name} (${type}), about ${n} pages. Estimate: ${total}. Can you help?`,
      subject: who => `Website quote: ${who}`,
      copied: 'Message copied! Paste it into an Instagram DM.',
      copyFail: "Couldn't copy automatically. Copy the message below and send it on Instagram.",
    },
  };

  function fmt(n) {
    return new Intl.NumberFormat(lang() === 'en' ? 'en-US' : 'vi-VN').format(n) + ' ₫';
  }
  function t() { return COPY[lang()]; }

  /* ---------- Live preview builder ---------- */
  const nameInput = $('bizName');
  const mini = document.querySelector('.mini');
  const phone = $('preview');
  const state = { name: '', type: 'cafe', color: 'coral', pages: 1 };

  function typeCopy() { return TYPES[state.type][lang()]; }

  function renderPreview() {
    const c = typeCopy();
    const name = state.name.trim();
    const pvName = $('pvName');
    pvName.textContent = name || t().emptyName;
    pvName.classList.toggle('is-empty', !name);
    $('pvTitle').textContent = c.title;
    $('pvBtn').textContent = c.btn;
    const items = $('pvItems');
    items.replaceChildren(...c.items.map(label => {
      const el = document.createElement('span');
      el.textContent = label;
      return el;
    }));
    mini.dataset.color = state.color;
    $('pvSummary').textContent = t().summary(name || t().emptyName, c.name);
  }

  function bump() {
    if (reduceMotion) return;
    phone.classList.remove('bump');
    void phone.offsetWidth; // restart the animation
    phone.classList.add('bump');
  }

  nameInput.addEventListener('input', () => { state.name = nameInput.value; renderPreview(); renderCalc(false); });
  document.querySelectorAll('input[name="bizType"]').forEach(r => r.addEventListener('change', () => {
    state.type = r.value; renderPreview(); renderCalc(false); bump();
  }));
  document.querySelectorAll('input[name="bizColor"]').forEach(r => r.addEventListener('change', () => {
    state.color = r.value; renderPreview(); bump();
  }));

  /* ---------- Quote calculator ---------- */
  const pagesInput = $('pages');
  const totalEl = $('calcTotal');
  const tagsEl = $('pageTags');
  const statusEl = $('calcStatus');
  const fallback = $('calcFallback');
  const igLink = $('sendIg');
  const mailLink = $('sendMail');
  let shownTotal = BASE;
  let liveTimer;

  const priceFor = n => BASE + (n - 1) * PER_PAGE;
  const clampPages = n => Math.min(MAX_PAGES, Math.max(1, Math.round(n) || 1));

  function tweenTotal(to) {
    if (reduceMotion || to === shownTotal) { shownTotal = to; totalEl.textContent = fmt(to); return; }
    const from = shownTotal, start = performance.now(), dur = 320;
    shownTotal = to;
    (function frame(now) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      totalEl.textContent = fmt(Math.round((from + (to - from) * eased) / 1000) * 1000);
      if (p < 1 && shownTotal === to) requestAnimationFrame(frame);
    })(start);
  }

  function renderTags(n, animate) {
    const names = typeCopy().pages;
    const want = Array.from({ length: n }, (_, i) => names[i] || t().pageN(i + 1));
    const existing = tagsEl.children;
    while (existing.length > n) tagsEl.lastElementChild.remove();
    want.forEach((label, i) => {
      if (existing[i]) { existing[i].textContent = label; return; }
      const li = document.createElement('li');
      li.textContent = label;
      if (animate && !reduceMotion) li.classList.add('pop');
      tagsEl.appendChild(li);
    });
  }

  function message() {
    const c = typeCopy();
    const n = state.pages;
    return t().msg(state.name.trim() || t().myBiz, c.name, n, fmt(priceFor(n)));
  }

  function renderCalc(animate = true) {
    const n = state.pages;
    const c = typeCopy();
    pagesInput.value = n;
    $('pagesMinus').disabled = n <= 1;
    $('pagesPlus').disabled = n >= MAX_PAGES;
    tweenTotal(priceFor(n));
    $('calcFormula').textContent = n === 1 ? t().onePage : t().formula(n - 1, fmt(PER_PAGE));
    const name = state.name.trim();
    $('calcFor').textContent = name ? t().forName(name, c.name) : t().forType(c.name);
    renderTags(n, animate);

    const day = 864e5, now = Date.now();
    const df = new Intl.DateTimeFormat(lang() === 'en' ? 'en-GB' : 'vi-VN', { day: 'numeric', month: 'long' });
    $('calcDate').textContent = t().date(df.format(now + 7 * day), df.format(now + 14 * day));

    const who = name || c.name;
    mailLink.href = `mailto:${EMAIL}?subject=${encodeURIComponent(t().subject(who))}&body=${encodeURIComponent(message())}`;
    if (!fallback.hidden) fallback.value = message();

    clearTimeout(liveTimer);
    liveTimer = setTimeout(() => { $('calcLive').textContent = t().live(n, fmt(priceFor(n))); }, 500);
  }

  function setPages(n) { state.pages = clampPages(n); renderCalc(true); }

  $('pagesMinus').addEventListener('click', () => setPages(state.pages - 1));
  $('pagesPlus').addEventListener('click', () => setPages(state.pages + 1));
  pagesInput.addEventListener('change', () => setPages(Number(pagesInput.value)));
  pagesInput.addEventListener('input', () => {
    const n = Number(pagesInput.value);
    if (n >= 1 && n <= MAX_PAGES) { state.pages = Math.round(n); renderCalc(true); }
  });

  // Plan buttons pre-fill the calculator, then move focus there for keyboard users.
  function goToCalc(pages) {
    if (pages) setPages(pages);
    const calc = $('calc');
    calc.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    calc.focus({ preventScroll: true });
  }
  // Without JS these links fall back to their href (#contact or #calc).
  document.querySelectorAll('a[data-calc]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    goToCalc(Number(a.dataset.pages) || 0);
  }));

  function copyText(text) {
    // Synchronous copy keeps the user gesture, so it works even as Instagram opens in a new tab.
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    ta.remove();
    if (!ok && navigator.clipboard) { navigator.clipboard.writeText(text).then(showCopied, showCopyFail); return; }
    ok ? showCopied() : showCopyFail();
  }
  function showCopied() { statusEl.textContent = t().copied; fallback.hidden = true; }
  function showCopyFail() {
    statusEl.textContent = t().copyFail;
    fallback.value = message();
    fallback.hidden = false;
  }
  igLink.addEventListener('click', () => copyText(message()));

  /* ---------- Hero web-sling ---------- */
  const hero = document.querySelector('.hero');
  const layer = $('slingLayer');
  const hint = $('slingHint');
  const NS = 'http://www.w3.org/2000/svg';

  function sling(x, y) {
    const w = hero.clientWidth;
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'sling');
    const line = document.createElementNS(NS, 'line');
    line.setAttribute('x1', w); line.setAttribute('y1', 0);
    line.setAttribute('x2', x); line.setAttribute('y2', y);
    const len = Math.hypot(w - x, y);
    line.style.strokeDasharray = len;
    line.style.strokeDashoffset = reduceMotion ? 0 : len;
    const splat = document.createElementNS(NS, 'g');
    splat.setAttribute('class', 'splat');
    splat.setAttribute('transform', `translate(${x} ${y})`);
    let d = '';
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + 0.3;
      d += `M0 0L${(Math.cos(a) * 22).toFixed(1)} ${(Math.sin(a) * 22).toFixed(1)}`;
    }
    const spokes = document.createElementNS(NS, 'path');
    spokes.setAttribute('d', d);
    const ring = document.createElementNS(NS, 'circle');
    ring.setAttribute('r', 12);
    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('r', 5); dot.setAttribute('class', 'splat-dot');
    splat.append(spokes, ring, dot);
    g.append(line, splat);
    layer.appendChild(g);
    while (layer.childNodes.length > 6) layer.firstChild.remove();
    requestAnimationFrame(() => { line.style.strokeDashoffset = 0; g.classList.add('shot'); });
    setTimeout(() => g.classList.add('fade'), 1500);
    setTimeout(() => g.remove(), 2000);
  }

  hero.addEventListener('pointerdown', e => {
    if (e.button !== 0 || e.target.closest('a, button, input, label')) return;
    const r = hero.getBoundingClientRect();
    sling(e.clientX - r.left, e.clientY - r.top);
    hint.classList.add('done');
  });
  hint.hidden = false;

  /* ---------- Scroll reveal ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('motion');
    // Cards land with a small "slap" as they scroll in, staggered by position in their row.
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      io.unobserve(el);
      const delay = [...el.parentElement.children].indexOf(el) * 90;
      setTimeout(() => {
        el.classList.add('in');
        // Once landed, hand transitions back to the normal hover styles.
        setTimeout(() => el.classList.add('landed'), 600);
      }, delay);
    }), { rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  document.addEventListener('langchange', () => { renderPreview(); renderCalc(false); });
  renderPreview();
  renderCalc(false);
})();
