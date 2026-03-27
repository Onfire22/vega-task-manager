import { Input } from '@/components/ui/input.tsx';
import React, { type ChangeEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils.ts';

interface IProps {
	type?: string;
	id?: string;
	placeholder?: string;
	label?: string;
	value: string;
	name?: string;
	error?: string;
	description?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	isRequired?: boolean;
	disabled?: boolean;
	ref?: React.RefObject<HTMLInputElement | null>;
	rightIcon?: ReactNode;
	leftIcon?: ReactNode;
}

const CustomInput: React.FC<IProps> = ({
	type,
	id,
	placeholder,
	label,
	value,
	onChange,
	error,
	rightIcon,
	leftIcon,
	name,
	ref,
	disabled,
	description,
	isRequired = false,
}) => {
	return (
		<div>
			<div className="flex flex-col ml-1 mb-1">
				{label && (
					<label htmlFor={id} className="text-[14px] block">
						{label}
						{isRequired && <span className="text-(--color-danger)"> *</span>}
					</label>
				)}
				{description && <span className="text-[12px] items-center text-muted-foreground">{description}</span>}
			</div>
			<div
				className={cn(
					'border border-input rounded-lg flex items-center justify-between focus-within:border-primary min-w-full overflow-hidden',
					error && 'border-(--color-danger)',
				)}
			>
				{leftIcon && <div className="pl-2 flex items-center">{leftIcon}</div>}
				<Input
					className="border-none shadow-none focus-visible:ring-0"
					type={type}
					id={id}
					placeholder={placeholder}
					value={value}
					name={name}
					onChange={onChange}
					ref={ref}
					disabled={disabled}
				/>
				{rightIcon && <div className="pr-2 flex items-center">{rightIcon}</div>}
			</div>
			{error && <span className="text-(--color-danger) text-[12px] ml-3">{error}</span>}
		</div>
	);
};

export { CustomInput };
