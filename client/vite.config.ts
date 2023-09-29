import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/",
  server: {
    port: 8080, // Здесь вы можете установить желаемый порт
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
