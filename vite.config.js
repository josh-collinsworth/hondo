import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],

	resolve: {
		alias: {
			$lib: new URL('./src/lib', import.meta.url).pathname
		}
	},

	server: {
		fs: {
			allow: ['.']
		}
	},

	css: {
		preprocessorOptions: {
			scss: {
				silenceDeprecations: ['legacy-js-api']
			}
		}
	}
});
