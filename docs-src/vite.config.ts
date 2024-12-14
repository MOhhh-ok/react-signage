import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { BASE_PATH } from './config';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: BASE_PATH,
    build: {
        outDir: '../docs',
    },
});
