/* The Payload admin dashboard (/admin) has its own root layout. */
import config from "@payload-config";
import "@payloadcms/next/css";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import { connection } from "next/server";
import type { ServerFunctionClient } from "payload";
import type { ReactNode } from "react";
import { importMap } from "./admin/importMap";

// The admin is never prerendered, so skip Next.js's instant-navigation checks.
export const instant = false;

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

export default async function Layout({ children }: { children: ReactNode }) {
  // The admin is rendered per request (it reads the signed-in user and the time).
  await connection();
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
