/**
 * Structured data (JSON-LD) for search engines: tells Google what a page is
 * (the company, a service, an article, a list of FAQs…) so it can show rich
 * results. Renders nothing visible.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // "<" is escaped so the content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
