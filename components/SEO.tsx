import Head from 'next/head';

interface Hreflang {
  href: string;
  hrefLang: string;
}

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  hreflangs?: Hreflang[];
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  twitterSite?: string;
  additionalMeta?: React.ReactNode;
}

export default function SEO({
  title,
  description,
  canonical,
  hreflangs,
  ogType = 'website',
  ogImage,
  twitterCard = 'summary_large_image',
  twitterSite,
  additionalMeta,
}: SEOProps) {
  return (
    <Head>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* hreflangs (optional multilingual support) */}
      {hreflangs?.map(({ href, hrefLang }) => (
        <link key={hrefLang} rel="alternate" href={href} hrefLang={hrefLang} />
      ))}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:type" content={ogType} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter Cards (optional) */}
      {twitterCard && <meta name="twitter:card" content={twitterCard} />}
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Additional Meta / JSON-LD */}
      {additionalMeta}
    </Head>
  );
}
