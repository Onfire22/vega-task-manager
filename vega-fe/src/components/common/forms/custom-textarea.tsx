import { Textarea } from '@/components/ui/textarea.tsx';
import React, { type ChangeEvent, type ReactNode, type KeyboardEvent } from 'react';
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
	onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
	isRequired?: boolean;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	resize?: 'none' | 'horizontal' | 'vertical';
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
	leftIcon,
	rightIcon,
	resize,
	onKeyDown,
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
			<div
				className={cn(
					'border border-input rounded-lg flex items-start justify-between focus-within:border-primary min-w-full overflow-hidden',
					error && 'border-(--color-danger)',
				)}
			>
				{leftIcon && <div className="p-2 flex items-center">{leftIcon}</div>}
				<Textarea
					style={{ resize }}
					className="border-none shadow-none focus-visible:ring-0"
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					onKeyDown={onKeyDown}
					name={name}
					id={id}
				/>
				{rightIcon && <div className="p-2 flex items-center">{rightIcon}</div>}
			</div>
			{error && <span className="text-(--color-danger) text-[12px]">{error}</span>}
		</div>
	);
};

export { CustomTextarea };
