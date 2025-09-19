import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [tailwindcss(), react()],
  base:
    mode === "development" ? "/" : process.env.VITE_BASE_PATH || "/ptc-voting/",
}));
