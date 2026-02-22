import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { getIsModalShownSelector } from './selectors.ts';
import { Notification } from '@mantine/core';
import { COLOR_BY_TYPE } from './constants.ts';
import { setNotification } from './slice.ts';

interface IProps {
	children: React.ReactNode;
}

const Notifications: React.FC<IProps> = ({ children }) => {
	const dispatch = useAppDispatch();

	const notification = useAppSelector(getIsModalShownSelector());

	useEffect(() => {
		if (notification) {
			const id = setTimeout(() => {
				dispatch(setNotification(null));
			}, 5000);

			return () => {
				clearTimeout(id);
			};
		}
	}, [notification, dispatch]);

	const handleCloseNotification = () => {
		dispatch(setNotification(null));
	};

	return (
		<>
			{notification && (
				<Notification
					color={COLOR_BY_TYPE[notification.type]}
					title={notification.text}
					onClose={handleCloseNotification}
					style={{
						width: '30%',
						position: 'absolute',
						top: '10px',
						right: 0,
					}}
				>
					{notification.message || null}
				</Notification>
			)}
			{children}
		</>
	);
};

export { Notifications };
