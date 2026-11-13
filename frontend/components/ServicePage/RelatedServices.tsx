import Image from "next/image";
import Link from "next/link";
import Glyph from "@/components/Icon/Glyph";
import { getService, serviceDetailPage, serviceHref, type ServiceDetail } from "@/data/services";

/**
 * Three cards linking to related services, each with a small photo.
 * The phone design leaves this section out, so it shows from tablets up:
 * stacked on tablets, three in a row on desktop.
 */
export default function RelatedServices({ slugs }: { slugs: string[] }) {
  const { related } = serviceDetailPage;
  const services = slugs
    .map(getService)
    .filter((service): service is ServiceDetail => Boolean(service));

  return (
    <section className="hidden bg-white md:block">
      <div className="mx-auto flex w-full max-w-page flex-col gap-8 page-x section-y xl:gap-12">
        <h2 className="font-heading text-popup-title-lg font-semibold text-heading">{related.title}</h2>
        <ul className="grid gap-6 xl:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={serviceHref(service.slug)}
                className="group flex items-center gap-4 rounded-card border border-border bg-white p-4 shadow-post transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-card"
              >
                <span className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </span>
                <span className="flex flex-col gap-1.5">
                  <span className="font-heading text-title-sm font-semibold text-heading">{service.title}</span>
                  <span className="flex items-center gap-1.5 text-label-sm font-semibold text-primary">
                    {related.actionLabel}
                    <Glyph
                      name="arrow-right"
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
