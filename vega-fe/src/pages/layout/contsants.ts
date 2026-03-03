import { FRONT_ROUTES } from '../../constants.ts';
import { IconClipboardCopy, IconSitemap, IconUserCog } from '@tabler/icons-react';

export const HEADERLESS_PAGES = ['/sign-up', '/sign-in'];

export const LINKS = [
	{ href: FRONT_ROUTES.profile, label: 'Профиль', color: 'teal', icon: IconUserCog },
	{ href: FRONT_ROUTES.root, label: 'Задачи', color: 'teal', icon: IconClipboardCopy },
	{ href: FRONT_ROUTES.projects, label: 'Проекты', color: 'teal', icon: IconSitemap },
];
