// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    console.log('start seeding...');

	const singleValueArray = await prisma.singleValueArray.create({
		data: {
			title: 'Some title',
			value: 21
		}
	})

    // Seeding settings
	for (let i = 0; i < 10; i++) {
		const setting = await prisma.setting.create({
			data: {
				title: `Some setting - ${i}`,
				value: `${i}`
			}
		});
		console.log(`Created setting: ${setting.id}`);
	}

    console.log('Seeding complete');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
