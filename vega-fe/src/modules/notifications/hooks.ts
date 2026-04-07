import { useEffect, useRef } from 'react';
import { socket } from '@/api/websocket.ts';
import { useAppDispatch } from '@/store/hooks.ts';
import { setNotifications } from '@/modules/notifications/slice.ts';

export const useNotificationsSocket = () => {
	const audio = useRef(new Audio('/sounds/notification.wav'));
	const dispatch = useAppDispatch();

	useEffect(() => {
		socket.on('task:updated', (data) => {
			dispatch(setNotifications(data));
			console.log(data, 'ws data');
			audio.current.play();
		});
		return () => {
			socket.off('task:updated');
		};
	}, [dispatch]);
};
