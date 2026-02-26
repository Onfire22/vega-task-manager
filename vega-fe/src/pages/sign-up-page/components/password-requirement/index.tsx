import { Box, Text } from '@mantine/core';
import { RED_COLOR, TEAL_COLOR } from '../../constants.ts';
import { IconCircleCheck, IconX } from '@tabler/icons-react';

const PasswordRequirement = ({ meets, label }: { meets: boolean; label: string }) => {
	return (
		<Text
			component="div"
			c={meets ? TEAL_COLOR : RED_COLOR}
			style={{ display: 'flex', alignItems: 'center' }}
			mt={7}
			size="sm"
		>
			{meets ? <IconCircleCheck size={18} /> : <IconX size={18} />}
			<Box ml={10}>{label}</Box>
		</Text>
	);
};

export { PasswordRequirement };
