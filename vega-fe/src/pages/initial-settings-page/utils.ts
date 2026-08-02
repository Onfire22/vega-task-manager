import type { TeamsSettingsFormValues } from '@/pages/initial-settings-page/types.ts';

export const transformAvatarPathRoFile = async (path: string | File, fileName: string) => {
	if (path instanceof File) return path;

	const response = await fetch(path);
	const blob = await response.blob();
	return new File([blob], fileName, { type: blob.type || 'image/svg+xml' });
};

export const normalizeTeamsValues = (values: TeamsSettingsFormValues) => {
	const formData = new FormData();

	formData.append(
		'items',
		JSON.stringify(
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			values.items.map(({ teamAvatar, ...rest }) => ({
				...rest,
				entity: 'teams',
				id: rest.id || rest.teamTitle,
			})),
		),
	);

	values.items.forEach((item) => {
		if (item.teamAvatar) {
			formData.append(`avatar_${item.id || item.teamTitle}`, item.teamAvatar);
		}
	});

	return formData;
};
