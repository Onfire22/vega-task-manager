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
	description?: string;
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	isRequired?: boolean;
}

const CustomTextarea: React.FC<IProps> = ({
	id,
	placeholder,
	label,
	value,
	name,
	error,
	onChange,
	isRequired,
	description,
}) => {
	return (
		<div className="w-full">
			<div className="ml-1 mb-1">
				{label && (
					<label htmlFor={id} className="text-[14px] block">
						{label}
						{isRequired && <span className="text-(--color-danger)"> *</span>}
					</label>
				)}
				<span className="text-[12px] items-center text-muted-foreground">{description}</span>
			</div>
			<Textarea
				className={cn(error && 'border-(--color-danger)')}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				name={name}
				id={id}
			/>
			{error && <span className="text-(--color-danger) text-[12px]">{error}</span>}
		</div>
	);
};

export { CustomTextarea };
