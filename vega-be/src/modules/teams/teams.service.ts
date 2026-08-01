import { TTeams } from './teams.types';
import { prismaAppClient } from '../../lib/prisma';

const createTeams = async (teams: TTeams, avatars?: Array<Express.Multer.File>) => {
	const teamsData = teams.map((team) => {
		const { teamTitle } = team;

		const avatar = avatars?.find((avatar) => {
			const name = avatar.fieldname.split('_')[1];
			return name.toLowerCase() === teamTitle.toLowerCase();
		})?.filename;

		return {
			teamTitle,
			teamAvatar: `/public/uploads/${avatar}`,
		};
	});

	await prismaAppClient.team.createMany({
		data: teamsData,
	});
};

export const teamsService = { createTeams };
