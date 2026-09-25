// The "Proof it's real" project cards, read by app.js's renderProjects().
//
// TO ADD A REAL PROJECT: copy the Stellar Boutique Hotel block below, fill it in, and add
// the screenshot to img/ (800x500, .webp works best). Put it before the demo entries so
// real work always leads. No other file needs to change.
//
// Real project fields:
//   name      the business's name, shown as-is in both languages
//   url       the live site it links to
//   image     path to the screenshot, e.g. "img/my-project.webp"
//   vi / en   { type, city, alt } — alt only matters when `image` is set
//
// `demo: true` entries are clearly-labeled concept cards, not real clients — see below.
// Delete a demo entry (or just stop editing it) once you replace it with a real project;
// having fewer, all-real cards looks better than padding the count with concepts.
window.PROJECTS = [
  {
    name: 'Stellar Boutique Hotel',
    url: 'https://stellar-boutique-hotel.vercel.app',
    image: 'img/stellar-boutique-hotel.webp',
    vi: {
      type: 'Khách sạn boutique', city: 'Phú Mỹ Hưng, TP.HCM',
      alt: 'Trang chủ Stellar Boutique Hotel: phần đầu trang màu xanh lá đậm với tiêu đề tiếng Việt và nút đặt phòng',
    },
    en: {
      type: 'Boutique hotel', city: 'Phú Mỹ Hưng, HCMC',
      alt: 'Stellar Boutique Hotel homepage: dark green hero with the headline in Vietnamese and booking buttons',
    },
  },
  // Demo cards: styled mockups showing what a site in that style could look like. They are
  // never given a `name` that reads as a real business, never given a `url`, and always
  // carry the "Ví dụ / Example" badge in app.js — so nobody mistakes them for finished
  // client work. Swap `shotClass` between 'shot-2' and 'shot-3' for different colours.
  {
    demo: true,
    shotClass: 'shot-2',
    vi: { name: 'Mẫu website quán cà phê', tagline: 'Ví dụ phong cách — không phải khách hàng thật.' },
    en: { name: 'Sample café website', tagline: 'A style example, not a real client.' },
  },
  {
    demo: true,
    shotClass: 'shot-3',
    vi: { name: 'Mẫu website cửa hàng', tagline: 'Ví dụ phong cách — không phải khách hàng thật.' },
    en: { name: 'Sample shop website', tagline: 'A style example, not a real client.' },
  },
];
