import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    // The TechStack scene (r3f + Rapier wasm + postprocessing) is a single
    // large chunk by nature; it is lazy-loaded below the fold so the warning
    // isn't actionable here.
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Only split react into its own long-cache vendor chunk. three.js is
          // left to Rollup's automatic splitting: the hero Character needs only
          // a subset of three, so a shared three-vendor chunk would drag
          // TechStack's extra three usage onto the critical path.
          if (
            id.includes("/node_modules/react/") ||
            id.includes("/node_modules/react-dom/") ||
            id.includes("/node_modules/scheduler/")
          ) {
            return "react-vendor";
          }
        },
      },
    },
  },
});
