import { Textarea } from '@/components/ui/textarea.tsx';
import React, { type ChangeEvent } from 'react';
import { cn } from '@/lib/utils.ts';

interface IProps {
	id?: string;
	placeholder?: string;
	label?: string;
	value: string;
	name?: string;
	error?: string;
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	isRequired?: boolean;
}

const CustomTextarea: React.FC<IProps> = ({ id, placeholder, label, value, name, error, onChange, isRequired }) => {
	return (
		<div className="w-full">
			{label && (
				<label htmlFor={id} className="text-[14px] mb-1.25 block">
					{label}
					{isRequired && <span className="text-(--color-danger)"> *</span>}
				</label>
			)}
			<Textarea
				className={cn(error && 'border-(--color-danger)')}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				name={name}
				id={id}
			/>
			{error && <span className="text-(--color-danger) text-[12px] ml-3">{error}</span>}
		</div>
	);
};

export { CustomTextarea };
