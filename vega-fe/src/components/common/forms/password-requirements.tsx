import { CustomProgress } from '@/components/common/ui/custom-progress.tsx';
import { PasswordRequirement } from '@/pages/sign-up-page/components/password-requirement/password-requirement.tsx';
import React from 'react';

interface IProps {
	color: string;
	strength: number;
	password: string;
	requirements: Array<{ regex: RegExp; label: string }>;
}

const PasswordRequirements: React.FC<IProps> = ({ color, strength, password, requirements }) => {
	return (
		<>
			<CustomProgress color={color} progress={strength} />
			{requirements.map((requirement, index) => {
				return (
					<PasswordRequirement
						key={index}
						label={requirement.label}
						meets={requirement.regex.test(password)}
					/>
				);
			})}
		</>
	);
};

export { PasswordRequirements };
