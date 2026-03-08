import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const makeSeed = async () => {
	await prisma.dictionary.createMany({
		data: [
			{ type: 'ROLE_TYPE', name: 'viewer' },
			{ type: 'ROLE_TYPE', name: 'member' },
			{ type: 'ROLE_TYPE', name: 'owner' },
			{ type: 'TASK_PRIORITY', name: 'low', color: '#33FF8D' },
			{ type: 'TASK_PRIORITY', name: 'medium', color: '#C8962A' },
			{ type: 'TASK_PRIORITY', name: 'high', color: '#FF5C33' },
			{ type: 'TASK_PRIORITY', name: 'highest', color: '#FF1212' },
			{ type: 'TASK_STATUS', name: 'todo', color: '#437FFA' },
			{ type: 'TASK_STATUS', name: 'in_progress', color: '#FAAB43' },
			{ type: 'TASK_STATUS', name: 'done', color: '#4A9B6F' },
			{ type: 'TASK_STATUS', name: 'stopped', color: '#FA4343' },
			{ type: 'STACK_TYPE', name: 'FE', fullName: 'Frontend', color: '#3A8FB5' },
			{ type: 'STACK_TYPE', name: 'BE', fullName: 'Backend', color: '#4A9B6F' },
			{ type: 'STACK_TYPE', name: 'FS', fullName: 'FullStack', color: '#7B5EA7' },
			{ type: 'STACK_TYPE', name: 'QA', fullName: 'QualityAssurance', color: '#C8962A' },
			{ type: 'STACK_TYPE', name: 'AN', fullName: 'Analytics', color: '#C96A2E' },
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
