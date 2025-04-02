import { defineConfig } from "vite/dist/node";
import vue from "@vitejs/plugin-vue/dist/index.d.mts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
});
