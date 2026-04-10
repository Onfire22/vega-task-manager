import { Header } from '@/pages/chat/components/header/header.tsx';
import { Sidebar } from '@/pages/chat/components/sidebar/sidebar.tsx';
import { Chat } from '@/pages/chat/components/chat/chat.tsx';

const PageView = () => {
	return (
		<div className="w-full flex">
			<Sidebar />
			<div className="w-full border-l">
				<Header />
				<Chat />
			</div>
		</div>
	);
};

export { PageView };
