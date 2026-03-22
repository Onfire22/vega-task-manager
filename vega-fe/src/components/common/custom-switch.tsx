import { Switch } from '@/components/ui/switch.tsx';
import React from 'react';

interface IProps {
	checked: boolean;
	onChange: () => void;
}

const CustomSwitch: React.FC<IProps> = ({ checked, onChange }) => {
	return (
		<Switch
			className="data-[state=checked]:bg-teal data-[state=unchecked]:bg-violet"
			checked={checked}
			onCheckedChange={onChange}
		/>
	);
};

export { CustomSwitch };
