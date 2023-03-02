import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'
import autoprefixer from 'autoprefixer'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
      prependData: `@use "src/lib/scss/_vars.scss";`
    },
    postcss: {
      plugins: [autoprefixer]
    },
	}),

	kit: {
		adapter: adapter(),
	}
};

export default config;
