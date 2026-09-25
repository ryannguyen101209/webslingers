// Vietnamese is written in index.html (the default). English lives here.
// Each key matches a data-i18n / data-i18n-<attr> attribute in the page.
const EN = {
  'meta.title': 'Webslingers.inc | From idea to live in record time',
  'meta.desc': 'Webslingers builds professional-looking websites for small businesses in Vietnam. Live in 7–14 days, from 200,000 ₫.',
  'skip': 'Skip to content',
  'nav.home': 'Webslingers.inc home',
  'nav.label': 'Main',
  'nav.how': 'How it works',
  'nav.work': 'Work',
  'nav.pricing': 'Pricing',
  'lang.label': 'Chuyển sang tiếng Việt',
  'lang.other': 'VI',
  'nav.quote': 'Get a quote',
  'cta.quote': 'Get a quote',
  'hero.eyebrow': 'Websites for small businesses in Vietnam',
  'hero.title': 'From idea to <mark>live</mark> in record time.',
  'hero.lede': 'A professional website for your shop, café or studio. Built in 7–14 days, from 200,000&nbsp;₫.',
  'hero.start': 'Start my website',
  'hero.try': 'Try a design now',
  'hero.hint': 'Tap to sling a web!',
  'try.title': 'Try your website',
  'try.lede': 'Type a name, pick your business and a colour. The preview changes as you go.',
  'try.name': 'Business name',
  'try.namePh': 'e.g. Pho Co Ba',
  'try.type': 'What do you do?',
  'type.cafe': 'Café',
  'type.food': 'Restaurant',
  'type.shop': 'Shop',
  'type.salon': 'Salon &amp; spa',
  'try.color': 'Main colour',
  'color.coral': 'Coral red',
  'color.gold': 'Yellow',
  'color.green': 'Green',
  'color.blue': 'Blue',
  'try.cta': 'Price this design',
  'how.title': 'How we sling it',
  'how.s1.title': 'Share the idea',
  'how.s1.text': 'DM us on Instagram. Tell us about your business, what you sell and a site you like.',
  'how.s2.title': 'We build fast',
  'how.s2.text': 'We design and build your site, then send you a preview link to check and tweak.',
  'how.s3.title': 'Go live',
  'how.s3.text': 'Your site is online in 7–14 days, working great on every phone.',
  'work.title': "Proof it's real",
  'work.p1.alt': 'Stellar Boutique Hotel homepage: dark green hero with the headline in Vietnamese and booking buttons',
  'work.p1.meta': 'Boutique hotel · Phú Mỹ Hưng, HCMC',
  'work.p2.alt': 'Vòng homepage: cream-and-green hero reading "Good finds. A fresh start.", a search bar and secondhand category chips',
  'work.p2.meta': 'Secondhand marketplace · Ho Chi Minh City',
  'work.view': 'View live site ↗',
  'work.demoBadge': 'EXAMPLE',
  'work.demo2.name': 'Sample shop website',
  'work.demo2.tag': 'A style example, not a real client.',
  'pricing.title': 'Cheap. Not cheap-looking.',
  'plan1.name': 'Starter',
  'plan1.price': '200,000&nbsp;₫',
  'plan1.note': 'One-page site',
  'plan1.f1': 'Mobile-first design',
  'plan1.f2': 'Instagram &amp; contact links',
  'plan1.f3': 'Live in 7–14 days',
  'plan1.cta': 'Pick 1 page',
  'plan2.badge': 'Price it yourself',
  'plan2.cta': 'Price 5 pages',
  'plan2.name': 'Multi-page',
  'plan2.price': '+100,000&nbsp;₫',
  'plan2.note': 'per extra page',
  'plan2.f1': 'Everything in Starter',
  'plan2.f2': 'Menu, services, gallery, about…',
  'plan2.f3': 'Example: 5 pages = 600,000&nbsp;₫',
  'plan3.name': 'Custom',
  'plan3.price': "Let's talk",
  'plan3.note': 'Bigger ideas',
  'plan3.f1': 'Booking or ordering flows',
  'plan3.f2': 'Special features',
  'plan3.f3': 'Quoted for your project',
  'plan3.cta': 'Ask us',
  'contact.title': "Got an idea? Let's sling it.",
  'calc.title': 'Quote calculator',
  'calc.pages': 'Number of pages',
  'calc.minus': 'One page fewer',
  'calc.plus': 'One more page',
  'calc.pagesUnit': 'pages',
  'calc.total': 'Estimate',
  'calc.lead': 'Send quote request',
  'calc.ig': 'Copy message &amp; open Instagram',
  'calc.mail': 'Send by email',
  'calc.msgLabel': 'Quote message',
  'contact.text': "Send us a DM with what your business does. We'll reply with a quote.",
  'contact.ig': 'Get a quote on Instagram',
  'footer.tag': 'Websites for small businesses in Vietnam.',
  'footer.legal': 'Legal',
  'footer.privacy': 'Privacy policy',
  'footer.terms': 'Terms of use',
  'legal.back': '← Back to home',
  'privacy.title': 'Privacy policy | Webslingers.inc',
  'privacy.desc': 'How Webslingers.inc collects, uses and protects your information.',
  'terms.title': 'Terms of use | Webslingers.inc',
  'terms.desc': 'Terms for using the Webslingers.inc website and web design services.',
};

(function () {
  const ATTRS = ['alt', 'content', 'aria-label', 'placeholder'];
  const nodes = [];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    nodes.push({ el, key: el.dataset.i18n, vi: el.innerHTML, set: v => { el.innerHTML = v; } });
  });
  ATTRS.forEach(attr => {
    document.querySelectorAll(`[data-i18n-${attr}]`).forEach(el => {
      const key = el.getAttribute(`data-i18n-${attr}`);
      nodes.push({ el, key, vi: el.getAttribute(attr), set: v => el.setAttribute(attr, v.replace(/&nbsp;/g, ' ')) });
    });
  });

  const toggle = document.getElementById('langToggle');
  const otherLabel = toggle.querySelector('span');

  function apply(lang) {
    nodes.forEach(n => n.set(lang === 'en' ? (EN[n.key] ?? n.vi) : n.vi));
    document.documentElement.lang = lang;
    otherLabel.lang = lang === 'en' ? 'vi' : 'en';
    toggle.lang = otherLabel.lang;
    // app.js re-renders its dynamic text (preview, quote, dates) on this event.
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  let lang = 'vi';
  try { lang = localStorage.getItem('lang') || lang; } catch (e) {}
  const param = new URLSearchParams(location.search).get('lang');
  if (param === 'en' || param === 'vi') lang = param;
  if (lang === 'en') apply('en');

  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    lang = document.documentElement.lang === 'en' ? 'vi' : 'en';
    apply(lang);
    try { localStorage.setItem('lang', lang); } catch (e) {}
  });
})();
