import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
  }
};

export default config