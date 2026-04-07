import { Socket } from 'socket.io';

export const tasksHandler = (socket: Socket) => {
	socket.on('join_tasks', async (projectId: string) => {
		socket.join(`tasks:${projectId}`);
		socket.emit('task:updated', { test: 'привет из комнаты' });
	});

	socket.on('leave_tasks', (projectId: string) => {
		socket.leave(`tasks:${projectId}`);
	});
};
