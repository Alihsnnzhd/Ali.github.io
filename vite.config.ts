import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');

    return {
        // --- مهم‌ترین بخش برای GitHub Pages ---
        // این خط آدرس‌دهی فایل‌ها را برای سایت آنلاین درست می‌کند
        base: './',

        // --- سرور توسعه (برای تست محلی) ---
        server: {
            port: 3000,
            // 'host' را حذف می‌کنیم تا از مشکلات فایروال جلوگیری شود
        },

        // --- پلاگین‌ها و متغیرهای شما (بدون تغییر) ---
        plugins: [react()],
        define: {
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },
        resolve: {
            alias: {
                '@': path.resolve(new URL(import.meta.url).pathname, '.'),
            }
        }
    };
});
