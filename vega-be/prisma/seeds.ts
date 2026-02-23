import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const makeSeed = async () => {
	await prisma.dictionaries.createMany({
		data: [
			{ type: 'ROLE_TYPE', name: 'viewer' },
			{ type: 'ROLE_TYPE', name: 'member' },
			{ type: 'ROLE_TYPE', name: 'owner' },
			{ type: 'TASK_PRIORITY', name: 'low', color: '#33FF8D' },
			{ type: 'TASK_PRIORITY', name: 'medium', color: '#FFD333' },
			{ type: 'TASK_PRIORITY', name: 'high', color: '#FF5C33' },
			{ type: 'TASK_PRIORITY', name: 'highest', color: '#FF1212' },
			{ type: 'TASK_STATUS', name: 'todo', color: '#437FFA' },
			{ type: 'TASK_STATUS', name: 'in_progress', color: '#FAAB43' },
			{ type: 'TASK_STATUS', name: 'done', color: '#43FA80' },
			{ type: 'TASK_STATUS', name: 'stopped', color: '#FA4343' },
			{ type: 'STACK_TYPE', name: 'FE', fullName: 'Frontend', color: '#91F5FF' },
			{ type: 'STACK_TYPE', name: 'BE', fullName: 'Backend', color: '#ADFFD6' },
			{ type: 'STACK_TYPE', name: 'FS', fullName: 'FullStack', color: '#D4B1FA' },
			{ type: 'STACK_TYPE', name: 'QA', fullName: 'QualityAssurance', color: '#FDFFB5' },
			{ type: 'STACK_TYPE', name: 'AN', fullName: 'Analytics', color: '#FFBCB0' },
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
