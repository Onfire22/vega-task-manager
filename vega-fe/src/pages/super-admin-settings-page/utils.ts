import type { TeamsSettingsFormValues } from '@/pages/super-admin-settings-page/types.ts';

export const transformAvatarPathRoFile = async (path: string | File, fileName: string) => {
	if (path instanceof File) return path;

	const response = await fetch(path);
	const blob = await response.blob();
	return new File([blob], fileName, { type: blob.type || 'image/svg+xml' });
};

export const normalizeTeamsValues = (values: TeamsSettingsFormValues) => {
	return values.items.reduce<Record<string, File | null>>((acc, item) => {
		const teamName = item.teamTitle.toLowerCase();
		acc[teamName] = item.teamAvatar ?? null;

		return acc;
	}, {});
};
