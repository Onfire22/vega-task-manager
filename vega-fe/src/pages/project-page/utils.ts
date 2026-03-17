export const parseDate = (date: string | null) => {
	if (!date) return null;

	const [day, month, year] = date.split('.');
	return new Date(Number(year), Number(month) - 1, Number(day));
};
