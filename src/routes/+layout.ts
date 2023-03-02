import type { PageServerLoad } from './$types'

export const prerender = true

export const load = async ({ url }: { url: any}): PageServerLoad => ({ path: <string>url.pathname })
