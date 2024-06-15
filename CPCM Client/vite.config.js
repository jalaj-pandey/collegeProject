import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss';
import postcssNesting from 'postcss-nesting';



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    postcssNesting(), // Add PostCSS nesting plugin here
    tailwindcss(),
    react(),
  ],
});



