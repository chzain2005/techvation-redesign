import Image from "next/image";
import Link from "next/link";
import ActionButton from "@/components/Button/ActionButton";
import Eyebrow from "@/components/Eyebrow/Eyebrow";
import Glyph from "@/components/Icon/Glyph";
import { cta } from "@/data/homepage";
import { getCategory, serviceHref, servicesIn, type ServiceCategory } from "@/data/services";
import { useSiteContent } from "@/components/SiteContent/SiteContent";
import { cn } from "@/lib/cn";

type ServicesMegaMenuProps = {
  /** The page we are on, so its service is highlighted. */
  pathname: string;
  /** Called after a link is chosen, so the menu closes. */
  onNavigate: () => void;
};

/** One practice area: small grey title, then its services. */
function CategoryList({
  category,
  pathname,
  onNavigate,
}: { category: ServiceCategory } & ServicesMegaMenuProps) {
  const { services } = useSiteContent();
  return (
    <div className="flex flex-col gap-3">
      <p className="text-eyebrow-sm font-semibold text-subtle uppercase">{category.name}</p>
      <ul className="flex flex-col gap-3">
        {servicesIn(category, services).map((service) => {
          const href = serviceHref(service.slug);
          const isCurrent = pathname === href;
          return (
            <li key={service.slug}>
              {/* Hover (or the current page): lavender row and a gradient icon tile. */}
              <Link
                href={href}
                onClick={onNavigate}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "group flex items-start gap-3 rounded-xl px-2.5 py-2 transition-colors duration-200 hover:bg-surface focus-visible:bg-surface",
                  isCurrent && "bg-surface",
                )}
              >
                <span
                  className={cn(
                    "shrink-0 rounded-cell p-2.25 transition-colors duration-200 group-hover:bg-brand group-hover:text-white",
                    isCurrent ? "bg-brand text-white" : "bg-surface-tint text-primary",
                  )}
                >
                  <Glyph name={service.icon} size={18} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-label font-semibold text-heading">{service.title}</span>
                  <span className="text-caption font-medium text-body">{service.menuDescription}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * The white panel that drops down when you hover "Services" in the desktop
 * navbar (Figma "00 · Overlay · Services Mega Menu"):
 *
 *   ┌──────────────────────────────────────────────┬──────────┐
 *   │ MICROSOFT        DEVELOPMENT    AI & ML      │  photo   │
 *   │ ERP                             MANAGED      │  promo   │
 *   ├──────────────────────────────────────────────┴──────────┤
 *   │ Explore all 12 services →         Prefer to talk? +1 …   │
 *   └─────────────────────────────────────────────────────────┘
 *
 * Opening and closing is handled by the Navbar.
 */
export default function ServicesMegaMenu({ pathname, onNavigate }: ServicesMegaMenuProps) {
  const { megaMenu, serviceCategories } = useSiteContent();
  const { promo } = megaMenu;

  return (
    <div className="overflow-hidden rounded-card bg-white shadow-[0_40px_100px_0_rgb(0_0_0/0.45)]">
      <div className="flex">
        {/* Three columns of services */}
        <div className="flex flex-1 gap-9 px-10 py-9">
          {megaMenu.columns.map((ids) => (
            <div key={ids.join()} className="flex min-w-0 flex-1 flex-col gap-7">
              {ids.map((id) => {
                const category = getCategory(id, serviceCategories);
                return category ? (
                  <CategoryList
                    key={id}
                    category={category}
                    pathname={pathname}
                    onNavigate={onNavigate}
                  />
                ) : null;
              })}
            </div>
          ))}
        </div>

        {/* Promo on the right: photo with a purple fade and a call button */}
        <div className="relative isolate flex w-75 shrink-0 flex-col items-start justify-end gap-3.5 p-7">
          <Image src={promo.image} alt="" fill sizes="300px" className="-z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-linear-to-b from-ink-soft/30 to-primary-dark/95" />
          <Eyebrow theme="dark">{promo.eyebrow}</Eyebrow>
          <p className="font-heading text-stat font-semibold text-white">{promo.title}</p>
          <p className="text-small text-white/85">{promo.text}</p>
          <ActionButton href={cta.scheduleCall.href} size="md" onClick={onNavigate}>
            {promo.actionLabel}
          </ActionButton>
        </div>
      </div>

      {/* Footer strip */}
      <div className="flex items-center justify-between bg-surface px-10 py-4">
        <Link
          href={megaMenu.allServices.href}
          onClick={onNavigate}
          className="group flex items-center gap-2 text-label font-semibold text-primary"
        >
          {megaMenu.allServices.label}
          <Glyph
            name="arrow-right"
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
        <a
          href={megaMenu.phone.href}
          className="flex items-center gap-2 text-small text-body transition-colors hover:text-primary"
        >
          <Glyph name="phone" size={16} className="text-primary" />
          {megaMenu.phone.label}
        </a>
      </div>
    </div>
  );
}
