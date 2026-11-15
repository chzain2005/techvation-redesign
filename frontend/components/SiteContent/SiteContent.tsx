"use client";

/*
 * The CMS content that interactive parts on every page need (navbar, mobile
 * menu, services mega menu, consultation forms). The root layout loads it
 * once on the server and hands it down here, so client components read it
 * with useSiteContent() instead of importing the /data files.
 */
import { createContext, useContext, type ReactNode } from "react";
import type { SiteContent } from "@/lib/cms/types";

const SiteContentContext = createContext<SiteContent | null>(null);

export function SiteContentProvider({ content, children }: { content: SiteContent; children: ReactNode }) {
  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const content = useContext(SiteContentContext);
  if (!content) throw new Error("useSiteContent() must be used inside <SiteContentProvider>.");
  return content;
}
