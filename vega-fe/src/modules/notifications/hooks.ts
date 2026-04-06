import { useEffect } from 'react';
import { socket } from '@/api/websocket.ts';
import { useAppDispatch } from '@/store/hooks.ts';
import { setNotifications } from '@/modules/notifications/slice.ts';

export const useNotificationsSocket = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		socket.on('task:updated', (data) => {
			dispatch(setNotifications(data));
			console.log(data);
		});
		return () => {
			socket.off('task:updated');
		};
	}, [dispatch]);
};
