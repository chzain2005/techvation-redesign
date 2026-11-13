import Link from "next/link";
import { Fragment } from "react";

type BreadcrumbProps = {
  /** The pages above this one, as links. */
  trail: Array<{ label: string; href: string }>;
  /** The name of this page (not a link). */
  current: string;
};

/** "Home / Services / Power BI" on the dark hero of an inner page. */
export default function Breadcrumb({ trail, current }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-small">
        {trail.map((item) => (
          <Fragment key={item.href}>
            <li>
              <Link href={item.href} className="text-white/60 transition-colors hover:text-white">
                {item.label}
              </Link>
            </li>
            <li aria-hidden className="text-white/40">
              /
            </li>
          </Fragment>
        ))}
        <li aria-current="page" className="text-white">
          {current}
        </li>
      </ol>
    </nav>
  );
}
