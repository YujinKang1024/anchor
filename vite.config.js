import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  resolve: {
    alias: {
      '@react-three/cannon': fileURLToPath(
        new URL('./src/__mocks__/react-three-cannon.js', import.meta.url),
      ),
      three: fileURLToPath(new URL('./node_modules/three/build/three.module.js', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: fileURLToPath(new URL('./setupTests.js', import.meta.url)),
    deps: {
      inline: ['vitest-canvas-mock'],
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: ['src/__mocks__/**', 'src/**/*.test.{js,jsx,ts,tsx}'],
    },
    moduleNameMapper: {
      '^@react-three/drei$': fileURLToPath(
        new URL('./src/__mocks__/react-three-drei.js', import.meta.url),
      ),
      '^@react-three/cannon$': fileURLToPath(
        new URL('./src/__mocks__/react-three-cannon.js', import.meta.url),
      ),
      '^@react-three/fiber$': fileURLToPath(
        new URL('./src/__mocks__/react-three-fiber.js', import.meta.url),
      ),
    },
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
