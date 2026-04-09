import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { tasksHandler } from './modules/tasks/tasks.socket';
import jwt from 'jsonwebtoken';

let io: Server;

export const initSocket = (server: HttpServer) => {
	io = new Server(server, {
		cors: {
			origin: 'http://localhost:5173',
			credentials: true,
		},
	});

	io.use((socket, next) => {
		const token = socket.handshake.auth.token;

		if (!token) {
			return next(new Error('Unauthorized'));
		}

		try {
			const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as { id: string };
			socket.user = { id: (user as { id: string }).id };
			next();
		} catch (e) {
			next(new Error('Unauthorized'));
		}
	});

	io.on('connection', (socket) => {
		const userId = socket.user.id;

		socket.join(`user:${userId}`);

		// tasksHandler(socket);
	});
};

export { io };
