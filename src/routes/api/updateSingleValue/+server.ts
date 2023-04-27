import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const item = await request.json();

	try {
		await prisma.singleValueArray.update({
			where: {
				id: 1
			},
			data: {
				title: item.title,
				value: Number(item.value)
			}
		});
	} catch (err) {
		console.error(err);
	}

	return json(item);
}

export async function GET() {
	try {
		const value = await prisma.singleValueArray.findFirst({
			where: {
				id: 1
			}
		});

		return json(value);
	} catch (err) {
		console.error(err);
	}
}
