import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Target modern browsers for smaller bundles
    target: 'es2015',

    // Generate sourcemaps for production debugging (optional)
    sourcemap: false,

    // Rollup options for optimization
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', 'aos'],
        },

        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },

    // Chunk size warning limit (500kb)
    chunkSizeWarningLimit: 500,

    // Minification options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
      format: {
        comments: false,
      },
    },

    // CSS code splitting
    cssCodeSplit: true,

    // Asset inline limit (4kb)
    assetsInlineLimit: 4096,
  },

  // Server configuration for development
  server: {
    port: 3000,
    open: true,
    cors: true,
  },

  // Preview server configuration
  preview: {
    port: 4173,
    open: true,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react', 'aos'],
  },
});
