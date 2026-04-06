import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '@/api/constants.ts';

let socket: Socket;

export const initSocket = (accessToken: string) => {
	socket = io(BASE_URL, {
		withCredentials: true,
		auth: {
			token: accessToken,
		},
	});
};

export { socket };
