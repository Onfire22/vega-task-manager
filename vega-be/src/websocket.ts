import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import jwt from 'jsonwebtoken';
import { createChannel, editChannel, joinChannelByUser, joinChannels } from './modules/channels/channels.websocket';
import { createMessage, editMessage } from './modules/messages/messages.websocket';

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

	io.on('connection', async (socket) => {
		const userId = socket.user.id;

		socket.join(`user:${userId}`);

		await createChannel(socket);
		await editChannel(socket);
		await createMessage(socket);
		editMessage(socket);
		joinChannelByUser(socket);
		joinChannels(socket);
	});
};

export { io };
