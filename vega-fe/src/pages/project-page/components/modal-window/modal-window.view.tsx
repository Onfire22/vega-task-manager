import { CustomModal } from '@/components/common/ui/custom-modal.tsx';
import { Button } from '@/components/ui/button.tsx';
import type { IUserModalInfo } from '@/pages/project-page/types.ts';
import React from 'react';
import { CircleAlert } from 'lucide-react';

interface IProps {
	userData: IUserModalInfo | null;
	onModalClose: () => void;
	onUpdateUserRole: () => void;
}

const ModalWindowView: React.FC<IProps> = ({ userData, onModalClose, onUpdateUserRole }) => {
	return (
		<CustomModal size="sm" title="Подтвердите дейтсвие" isOpen={Boolean(userData)} onOpenChange={onModalClose}>
			<div className="flex flex-col items-center gap-5">
				<CircleAlert size={150} strokeWidth={1} className="text-danger" />
				<div className="text-center">
					<span>
						Вы уверены, что хотите передать управление проектом пользователю{' '}
						<span className="text-white font-bold">{userData?.userName}</span>?
					</span>
				</div>
				<div className="flex items-center gap-5">
					<Button onClick={onUpdateUserRole} variant="primary">
						Подтвердить
					</Button>
					<Button onClick={onModalClose}>Отмена</Button>
				</div>
			</div>
		</CustomModal>
	);
};

export { ModalWindowView };
