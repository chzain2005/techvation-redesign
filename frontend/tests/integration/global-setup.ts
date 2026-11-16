/* Starts every integration run with an empty test database and upload folders. */
import { mkdirSync, rmSync } from "node:fs";
import path from "node:path";

export default function setup() {
  const dir = path.join(process.cwd(), ".test-data");
  rmSync(dir, { recursive: true, force: true });
  for (const sub of ["", "media", "cvs"]) mkdirSync(path.join(dir, sub), { recursive: true });
}
