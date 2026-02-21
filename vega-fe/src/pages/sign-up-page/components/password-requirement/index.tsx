import { Box, Text } from '@mantine/core';
import Check from '../../../../assets/icons/check.svg?react';
import Cross from '../../../../assets/icons/cross.svg?react';
import { RED_COLOR, TEAL_COLOR } from '../../constants.ts';

const PasswordRequirement = ({
	meets,
	label,
}: {
	meets: boolean;
	label: string;
}) => {
	return (
		<Text
			component="div"
			c={meets ? TEAL_COLOR : RED_COLOR}
			style={{ display: 'flex', alignItems: 'center' }}
			mt={7}
			size="sm"
		>
			{meets ? (
				<Check width={18} height={18} />
			) : (
				<Cross width={18} height={18} />
			)}
			<Box ml={10}>{label}</Box>
		</Text>
	);
};

export { PasswordRequirement };
