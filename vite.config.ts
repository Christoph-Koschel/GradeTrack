import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
// @ts-ignore
import {resolve} from "path";

declare const __dirname: string;

// @ts-ignore
declare module "path" {
    export function resolve(...args: string[]): string;
}

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
    plugins: [vue(), tailwindcss()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
            "@icons": resolve(__dirname, "./src/components/icons"),
            "@views": resolve(__dirname, "./src/views"),
            "@services": resolve(__dirname, "./src/services"),
            "@models": resolve(__dirname, "./src/models"),
        }
    },

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
        port: 1420,
        strictPort: true,
        host: host || false,
        hmr: host
            ? {
                protocol: "ws",
                host,
                port: 1421,
            }
            : undefined,
        watch: {
            // 3. tell vite to ignore watching `src-tauri`
            ignored: ["**/src-tauri/**"],
        },
    },
}));
