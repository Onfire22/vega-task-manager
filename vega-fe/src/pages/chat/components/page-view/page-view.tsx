import { Header } from '@/pages/chat/components/header/header.tsx';
import { Sidebar } from '@/pages/chat/components/sidebar/sidebar.tsx';
import { Chat } from '@/pages/chat/components/chat/chat.tsx';
import { UsersControls } from '@/pages/chat/components/users-controls/users-controls.tsx';
import { NewChatModal } from '@/pages/chat/components/new-chat-modal/new-chat-modal.tsx';

const PageView = () => {
	return (
		<>
			<div className="w-full flex">
				<Sidebar />
				<div className="w-full border-l">
					<Header />
					<Chat />
				</div>
				<UsersControls />
			</div>
			<NewChatModal />
		</>
	);
};

export { PageView };
