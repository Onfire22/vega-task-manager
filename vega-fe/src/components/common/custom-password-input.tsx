import React, { type ReactNode, useState } from 'react';
import { CustomInput } from '@/components/common/custom-input.tsx';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface IProps {
	type: string;
	id: string;
	placeholder: string;
	label: string;
	value: string;
	name: string;
	error?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isRequired?: boolean;
	rightIcon?: ReactNode;
	leftIcon?: ReactNode;
	ref?: React.RefObject<HTMLInputElement | null>;
}

const CustomPasswordInput: React.FC<IProps> = ({ ...props }) => {
	const [show, setShow] = useState(false);

	return (
		<CustomInput
			{...props}
			type={show ? 'text' : 'password'}
			rightIcon={
				<button type="button" onClick={() => setShow(!show)}>
					{show ? (
						<EyeOffIcon className="cursor-pointer" size={20} />
					) : (
						<EyeIcon className="cursor-pointer" size={20} />
					)}
				</button>
			}
		/>
	);
};

export { CustomPasswordInput };
