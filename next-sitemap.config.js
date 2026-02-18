/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.slavo.io",
  generateRobotsTxt: false, // you already have a custom robots.txt
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,

  // exclude pages you don't want in sitemap
  exclude: ["/dashboard", "/login", "/success", "/cancel"],
};
