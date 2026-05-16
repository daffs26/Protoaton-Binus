import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `open` ke executable Brave pernah memicu crash Node (ERR_UNESCAPED_CHARACTERS)
// di beberapa setup Windows. Biarkan server stabil; buka Brave manual: http://localhost:5173
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },
});
