import type { TNewChatModal } from '@/pages/chat/types.ts';
import React from 'react';
import { CustomModal } from '@/components/common/ui/custom-modal.tsx';
import { CHANNEL_MODAL_HEADER } from '@/pages/chat/constants.ts';

interface IProps {
	modalType: TNewChatModal;
	onCloseModal: () => void;
	modalContent: React.ComponentType | null;
}

const NewChatModalView: React.FC<IProps> = ({ modalType, onCloseModal, modalContent: ModalContent }) => {
	return (
		<CustomModal
			size="sm"
			isOpen={Boolean(modalType)}
			onOpenChange={onCloseModal}
			title={CHANNEL_MODAL_HEADER[modalType!]}
		>
			{ModalContent && <ModalContent />}
		</CustomModal>
	);
};

export { NewChatModalView };
