import { FRONT_ROUTES } from '../../constants.ts';
import { IconClipboardCopy, IconSitemap, IconUserCog } from '@tabler/icons-react';

export const LINKS = [
	{ href: FRONT_ROUTES.profile, label: 'Профиль', icon: IconUserCog },
	{ href: FRONT_ROUTES.root, label: 'Задачи', icon: IconClipboardCopy },
	{ href: FRONT_ROUTES.projects, label: 'Проекты', icon: IconSitemap },
];
