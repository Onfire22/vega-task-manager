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

	await prisma.priotiry.createMany({
		data: [{ name: 'low' }, { name: 'medium' }, { name: 'high' }, { name: 'highest' }],
		skipDuplicates: true,
	});

	await prisma.taskStatuses.createMany({
		data: [{ name: 'todo' }, { name: 'in_progress' }, { name: 'done' }],
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
