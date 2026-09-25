// The "Proof it's real" project cards, read by app.js's renderProjects().
//
// TO ADD A NEW PROJECT: copy one of the blocks below, fill it in, and add the
// screenshot to img/ (same size as the others: 800x500, .webp works best).
// No other file needs to change. Order here is the order shown on the page.
//
// Fields:
//   name      the business's name, shown as-is in both languages
//   url       the live site it links to (omit for a placeholder card)
//   image     path to the screenshot, e.g. "img/my-project.webp" (omit for a placeholder)
//   vi / en   { type, city, alt } — alt only matters when `image` is set
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
  // Placeholders — replace `name`, add `url` and `image`, and fill in vi/en once it's a
  // real project. Bracketed text is a note to you, so it stays in English either way.
  {
    name: '[PROJECT 2 NAME]',
    vi: { type: '[Business type]', city: '[City]' },
    en: { type: '[Business type]', city: '[City]' },
  },
  {
    name: '[PROJECT 3 NAME]',
    vi: { type: '[Business type]', city: '[City]' },
    en: { type: '[Business type]', city: '[City]' },
  },
];
