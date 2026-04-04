export const transformSecondsToTime = (seconds: number) => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);

	let result = '';

	if (hours) {
		result += `${hours}h`;
	}

	if (minutes) {
		result += ` ${minutes}m`;
	}

	return result;
};
