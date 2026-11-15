import type { footer, navbar } from "@/data/homepage";
import type { megaMenu, ServiceCategory, ServiceDetail } from "@/data/services";

/** The few fields of a service that menus and dropdowns need. */
export type ServiceSummary = Pick<ServiceDetail, "slug" | "title" | "icon" | "menuDescription" | "categoryId">;

/** Content shared by every page (see components/SiteContent). */
export type SiteContent = {
  navbar: typeof navbar;
  footer: typeof footer;
  megaMenu: typeof megaMenu;
  serviceCategories: ServiceCategory[];
  services: ServiceSummary[];
  /** Service names offered in the "Service" dropdowns of the consultation forms. */
  serviceOptions: string[];
};
