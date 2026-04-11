import type { TNewChatModal } from '@/pages/chat/types.ts';
import React from 'react';
import { CustomModal } from '@/components/common/ui/custom-modal.tsx';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { Button } from '@/components/ui/button.tsx';

interface IProps {
	value: string;
	modalType: TNewChatModal;
	onCloseModal: () => void;
	onCreateChannel: () => void;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NewChatModalView: React.FC<IProps> = ({ modalType, value, onCloseModal, onCreateChannel, onInputChange }) => {
	return (
		<CustomModal
			isOpen={Boolean(modalType)}
			onOpenChange={() => {}}
			title={modalType === 'CHANNEL' ? 'Создать канал' : ''}
		>
			{modalType === 'CHANNEL' && (
				<div className="flex flex-col gap-3">
					<CustomInput value={value} onChange={onInputChange} placeholder="Наимеование канала" />
					<div className="flex items-center justify-center gap-3">
						<Button onClick={onCreateChannel} variant="primary">
							Создать
						</Button>
						<Button onClick={onCloseModal}>Отмена</Button>
					</div>
				</div>
			)}
		</CustomModal>
	);
};

export { NewChatModalView };
