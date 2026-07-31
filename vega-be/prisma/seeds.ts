import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const makeSeed = async () => {
	await prisma.dictionary.createMany({
		data: [
			{ type: 'ROLE_TYPE', label: 'Наблюдатель', key: 'viewer' },
			{ type: 'ROLE_TYPE', label: 'Участник', key: 'member' },
			{ type: 'ROLE_TYPE', label: 'Владелец', key: 'owner' },
			{ type: 'TASK_PRIORITY', label: 'low', key: 'low' },
			{ type: 'TASK_PRIORITY', label: 'medium', key: 'medium' },
			{ type: 'TASK_PRIORITY', label: 'high', key: 'high' },
			{ type: 'TASK_PRIORITY', label: 'highest', key: 'highest' },
			{ type: 'TASK_STATUS', label: 'todo', description: 'Формирование залачи', key: 'todo' },
			{ type: 'TASK_STATUS', label: 'В работе', description: 'Активная разработка', key: 'in_progress' },
			{ type: 'TASK_STATUS', label: 'На проверке', description: 'Проверка QA', key: 'testing' },
			{ type: 'TASK_STATUS', label: 'Выполнено', description: 'Проврен и закрыт', key: 'done' },
			{ type: 'TASK_STATUS', label: 'Приостановлено', description: 'Временно приостановлен', key: 'stopped' },
			{ type: 'TASK_TYPE', label: 'FE', key: 'fe' },
			{ type: 'TASK_TYPE', label: 'BE', key: 'be' },
			{ type: 'TASK_TYPE', label: 'FS', key: 'fs' },
			{ type: 'TASK_TYPE', label: 'QA', key: 'qa' },
			{ type: 'TASK_TYPE', label: 'AN', key: 'an' },
			{ type: 'PROJECT_STATUS', label: 'Бэклог', description: 'Еще не начат', key: 'p_backlog' },
			{ type: 'PROJECT_STATUS', label: 'В работе', description: 'Активная разработка', key: 'p_in_progress' },
			{ type: 'PROJECT_STATUS', label: 'Завершен', description: 'Закрыт и сдан', key: 'p_closed' },
			{ type: 'PROJECT_STATUS', label: 'На паузе', description: 'Временно приостановлен', key: 'p_stopped' },
			{ type: 'CHAT_ROLE', label: 'Администратор', key: 'chat_admin' },
			{ type: 'CHAT_ROLE', label: 'Участник', key: 'chat_member' },
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
