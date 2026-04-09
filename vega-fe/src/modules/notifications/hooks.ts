import { useEffect, useRef } from 'react';
import { socket } from '@/api/websocket.ts';
import { useAppDispatch } from '@/store/hooks.ts';
import { setNotifications } from '@/modules/notifications/slice.ts';
import { format } from 'date-fns';
import { DATE_TIME_FORMAT } from '@/modules/notifications/constants.ts';

export const useNotificationsSocket = () => {
	const audio = useRef(new Audio('/sounds/notification.wav'));
	const dispatch = useAppDispatch();

	useEffect(() => {
		socket.on('task:updated', (data) => {
			dispatch(setNotifications({ ...data, createdAt: format(data.createdAt, DATE_TIME_FORMAT) }));
			audio.current.play();
		});

		socket.on('project:updated', (data) => {
			dispatch(setNotifications({ ...data, createdAt: format(data.createdAt, DATE_TIME_FORMAT) }));
			audio.current.play();
		});
		return () => {
			socket.off('task:updated');
			socket.off('project:updated');
		};
	}, [dispatch]);
};
