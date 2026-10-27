import {defineConfig} from 'vite';
export default defineConfig({base:'./',server:{proxy:{'/api':'http://127.0.0.1:8000'}},build:{rollupOptions:{input:{main:'index.html',gallery:'gallery.html'}}}});
