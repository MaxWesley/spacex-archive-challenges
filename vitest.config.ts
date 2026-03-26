import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@test": path.resolve(__dirname, "./test"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts", "./test/mocks/setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      reporter: ["text", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.d.ts",
        "src/main.tsx",
        "src/App.tsx",
        "src/router/**",
        "src/components/ui/color-mode.tsx",
        "src/components/ui/provider.tsx",
        "src/components/ui/toaster.tsx",
        "src/components/ui/tooltip.tsx",
        "src/components/layouts/**",
        "src/lib/react-query.ts",
        "src/features/**/types/**",
        "src/features/**/pages/index.ts",
      ],
    },
  },
});
