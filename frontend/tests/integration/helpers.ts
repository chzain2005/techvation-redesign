/*
 * Shared helpers for the integration tests: the CMS on the test database
 * (see vitest.config.ts), test accounts, a test image and a valid PDF.
 */
import path from "node:path";
import config from "@payload-config";
import { getPayload, type Payload } from "payload";

export const getTestPayload = () => getPayload({ config });

let counter = 0;
export const unique = (prefix: string) => `${prefix}-${Date.now()}-${++counter}`;

/** A test account with the given access level (created with full rights). */
export async function createUser(payload: Payload, role: "admin" | "editor") {
  return payload.create({
    collection: "users",
    data: { email: `${unique(role)}@example.com`, password: "Test-password-123", roles: [role] },
    overrideAccess: true,
  });
}

/** Uploads one of the site's real photos to the test media library. */
export async function createImage(payload: Payload) {
  return payload.create({
    collection: "media",
    data: { alt: "Test image" },
    filePath: path.join(process.cwd(), "public/assets/images/clients/sts.png"),
    overrideAccess: true,
  });
}

/** A small but structurally valid PDF (Payload checks uploads are real PDFs). */
export function validPdf() {
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] /Contents 4 0 R /Resources << >> >>",
    "<< /Length 0 >>\nstream\n\nendstream",
  ];
  let out = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((body, i) => {
    offsets.push(out.length);
    out += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xref = out.length;
  out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  out += offsets.map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("");
  out += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(out);
}
