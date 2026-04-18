import { FRONT_ROUTES } from '@/app/constants.ts';
import { Briefcase, FolderKanban, LogOut, MessageCircleCheck, TrendingUp, User } from 'lucide-react';

export const TOP_LINKS = [
	{ href: FRONT_ROUTES.projects, label: 'Проекты', icon: FolderKanban, activeRoutes: ['project', 'projects'] },
	{ href: FRONT_ROUTES.dashboard, label: 'Задачи', icon: Briefcase, activeRoutes: ['task', 'dashboard'] },
	{ href: FRONT_ROUTES.chat, label: 'Чат', icon: MessageCircleCheck, activeRoutes: ['chat'] },
	{ href: '#', label: 'Статистика', icon: TrendingUp, activeRoutes: ['#'] },
];

export const BOTTOM_LINKS = [
	{ href: FRONT_ROUTES.profile, label: 'Профиль', icon: User, activeRoutes: ['profile'] },
	{ href: 'logout', label: 'Выход', icon: LogOut, activeRoutes: [] },
];
