import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@components": "/src/components",
            "@hooks": "/src/hooks",
            "@scheduler": "/src/scheduler",
        },
    },
    plugins: [react()],
    base: "/process-scheduling-simulator/",
});
