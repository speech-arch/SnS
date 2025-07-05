import { fileURLToPath, URL } from 'node:url'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import tailwindcss from '@tailwindcss/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import Icons from 'unplugin-icons/vite';
import IconResolver from 'unplugin-icons/resolver';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    vueDevTools(),
      AutoImport({
      imports: ['vue', 'vue-router','pinia'],
      dts: 'src/auto-imports.d.ts',
    }),
     Icons({ autoInstall: true }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true,
      dts: 'src/components.d.ts',
      resolvers: [
        PrimeVueResolver(),
        IconResolver({ prefix: false })
    ]
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: true
  }
})
