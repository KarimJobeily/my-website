/** @type {import('next-sitemap').IConfig} */

async function getLatestUpdateDate() {
  return new Date().toISOString();
}

module.exports = {
  siteUrl: 'https://lebanesearc.org',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // 🔥 important: we're generating single sitemap

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        crawlDelay: 1,
      },
    ],
  },

  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.5,

  additionalPaths: async () => {
    const latestEventUpdate = await getLatestUpdateDate();

    return [
      {
        loc: '/',
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/events',
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: latestEventUpdate,
      },
      {
        loc: '/membership',
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/founder',
        changefreq: 'yearly',
        priority: 0.4,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/about',
        changefreq: 'yearly',
        priority: 0.4,
        lastmod: new Date().toISOString(),
      },
    ];
  },
};
