/**
 * Whether a navbar link belongs to the page we are on, so it gets the
 * underline. "/services" is also active on "/services/power-bi".
 * Links to a part of the homepage ("/#industries") are never underlined.
 */
export function isActiveLink(href: string, pathname: string) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
