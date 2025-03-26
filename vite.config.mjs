// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
// import { dirname, resolve } from 'node:path'
import packageJson from './package.json'

// Plugins
import Vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'

// const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		Vue(),
		// vueDevTools(),
	],
	define: {
    'process.env': {
      PACKAGE_VERSION: JSON.stringify(packageJson.version)
      // Ajoutez d'autres valeurs du package.json que vous souhaitez exposer
    }
  },
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		},
		extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
	},
	server: {
		port: 3000
	}
})
