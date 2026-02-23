import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const makeSeed = async () => {
	await prisma.roles.createMany({
		data: [{ name: 'viewer' }, { name: 'member' }, { name: 'owner' }],
		skipDuplicates: true,
	});

	await prisma.taskPriotiry.createMany({
		data: [
			{ name: 'low', color: '#33FF8D' },
			{ name: 'medium', color: '#FFD333' },
			{ name: 'high', color: '#FF5C33' },
			{ name: 'highest', color: '#FF1212' },
		],
		skipDuplicates: true,
	});

	await prisma.taskStatuses.createMany({
		data: [
			{ name: 'todo', color: '#437FFA' },
			{ name: 'in_progress', color: '#FAAB43' },
			{ name: 'done', color: '#43FA80' },
			{ name: 'stopped', color: '#FA4343' },
		],
		skipDuplicates: true,
	});

	await prisma.stack.createMany({
		data: [
			{ name: 'FE', fullName: 'frontend', color: '#91F5FF' },
			{ name: 'BE', fullName: 'backend', color: '#ADFFD6' },
			{ name: 'FS', fullName: 'fullStack', color: '#D4B1FA' },
			{ name: 'QA', fullName: 'qualityAssurance', color: '#FDFFB5' },
			{ name: 'AN', fullName: 'analytics', color: '#FFBCB0' },
		],
		skipDuplicates: true,
	});
};

makeSeed()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
