import { ModalWindowView } from '@/pages/project-page/components/modal-window/modal-window.view.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { setModalInfo } from '@/pages/project-page/slice.ts';
import { useUpdateUserRoleMutation } from '@/api/projects/projects.api.ts';
import { useParams } from 'react-router-dom';

const ModalWindow = () => {
	const dispatch = useAppDispatch();
	const params = useParams();

	const [updateUserRole] = useUpdateUserRoleMutation();

	const userData = useAppSelector((state) => state.projectReducer.modalInfo);

	const handleModalClose = () => {
		dispatch(setModalInfo(null));
	};

	const handleUpdateUserRole = () => {
		if (userData) {
			updateUserRole({ uuid: params.uuid!, userRoleUuid: userData.userRoleUuid, userUuid: userData.userUuid });
		}
		handleModalClose();
	};

	return (
		<ModalWindowView userData={userData} onModalClose={handleModalClose} onUpdateUserRole={handleUpdateUserRole} />
	);
};

export { ModalWindow };
