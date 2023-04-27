import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	return {
        singleValueArray: await prisma.singleValueArray.findMany(),
		settings: await prisma.setting.findMany(),
	}
};