import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    {
      name: 'vis-network-resolver',
      resolveId(source) {
        if (source === 'vis-data/peer/esm/vis-data.js') {
          return 'vis-data';
        }
        if (source === 'vis-network/peer/esm/vis-network.js') {
          return 'vis-network';
        }
      }
    }
  ],
  build: {
    outDir: "build",
  },
  resolve: {
    mainFields: ['module', 'jsnext:main', 'jsnext', 'main']
  },
  optimizeDeps: {
    include: ['vis-network', 'vis-data']
  }
});
