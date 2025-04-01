// Plugins
import Vue from '@vitejs/plugin-vue'
import {transformAssetUrls} from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import packageJson from './package.json'

export default defineConfig({
	plugins: [
		Vue({
			template: {
				transformAssetUrls: {
					base: null,
					includeAbsolute: false,
				},
			},
		}),
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
