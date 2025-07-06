/** @type {import('next-sitemap').IConfig} */

// Placeholder function to fetch latest update date for dynamic content
// Replace this with real data fetching logic from your CMS or DB
async function getLatestUpdateDate() {
  // Example static date; replace with your logic
  return new Date().toISOString();
}

module.exports = {
  siteUrl: 'https://lebanesearc.org',
  generateRobotsTxt: true,

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        crawlDelay: 1, // 1 second delay between requests to reduce server load
      },
    ],
    additionalSitemaps: ['https://lebanesearc.org/sitemap.xml'],
  },

  sitemapSize: 7000,
  changefreq: 'weekly', // Default frequency for all pages unless overridden
  priority: 0.5,        // Default priority for pages unless overridden

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
