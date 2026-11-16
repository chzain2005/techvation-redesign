/*
 * Tests (npm test):
 *
 *   tests/unit         pure logic, no database (fast)
 *   tests/integration  the real CMS on a throwaway SQLite database in
 *                      .test-data/ (never the real database)
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));
const testData = path.join(root, ".test-data");

// "server-only" throws outside a React Server Component; in tests it is just empty.
const alias = { "server-only": path.join(root, "tests/stubs/empty.ts") };

export default defineConfig({
  // The "@/..." import shortcuts from tsconfig.json.
  resolve: { tsconfigPaths: true, alias },
  test: {
    projects: [
      {
        test: {
          name: "unit",
          include: ["tests/unit/**/*.test.ts"],
          environment: "node",
        },
      },
      {
        test: {
          name: "integration",
          include: ["tests/integration/**/*.test.ts"],
          environment: "node",
          globalSetup: ["tests/integration/global-setup.ts"],
          // One test file at a time: they share the test database.
          fileParallelism: false,
          testTimeout: 60_000,
          hookTimeout: 120_000,
          env: {
            NODE_ENV: "test",
            DATABASE_URI: `file:${path.join(testData, "test.db").replace(/\\/g, "/")}`,
            PAYLOAD_SECRET: "test-secret-not-used-anywhere-else",
            MEDIA_DIR: path.join(testData, "media"),
            CV_DIR: path.join(testData, "cvs"),
            NEXT_PUBLIC_SITE_URL: "https://www.thetechvation.com",
            // Make sure the tests never reach real storage or email.
            S3_BUCKET: "",
            S3_ACCESS_KEY_ID: "",
            RESEND_API_KEY: "",
            SMTP_HOST: "",
          },
        },
      },
    ],
  },
});
