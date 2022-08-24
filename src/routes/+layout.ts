import type { PageServerLoad } from './$types'

export const load = async ({ url }: { url: any}): PageServerLoad => ({ path: <string>url.pathname })
