import config from "@payload-config";
import { generatePageMetadata, RootPage } from "@payloadcms/next/views";
import type { Metadata } from "next";
import { connection } from "next/server";
import { importMap } from "../importMap";

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> => {
  await connection();
  return generatePageMetadata({ config, params, searchParams });
};

export default async function Page({ params, searchParams }: Args) {
  // Admin screens are always rendered per request.
  await connection();
  return RootPage({ config, params, searchParams, importMap });
}
