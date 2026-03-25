import React, { useState } from 'react';
import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';

interface Option {
	value: string;
	label: string;
}

interface IProps {
	options: Option[];
	values: string[];
	setValues: (value: string[]) => void;
	placeholder?: string;
	label?: string;
	error?: string;
	description?: string;
	isRequired?: boolean;
}

export const CustomMultiSelect: React.FC<IProps> = ({
	options,
	values,
	setValues,
	placeholder = 'Выберите...',
	label,
	error,
	isRequired,
	description,
}) => {
	const [open, setOpen] = useState(false);

	const toggle = (optionValue: string) => {
		if (values.includes(optionValue)) {
			setValues(values.filter((v) => v !== optionValue));
		} else {
			setValues([...values, optionValue]);
		}
	};

	const selectedLabels = options.filter((o) => values.includes(o.value));

	return (
		<div className="flex flex-col gap-1">
			{label && (
				<label className="text-[14px] ml-2">
					{label}
					{isRequired && <span className="text-(--color-danger)"> *</span>}
				</label>
			)}
			{description && <span className="text-[12px] items-center text-muted-foreground">{description}</span>}
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<button
						className={cn(
							'flex min-h-8 w-full items-center justify-between rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors',
							'hover:bg-accent focus:outline-none',
							error && 'border-(--color-danger)',
						)}
					>
						<span className="flex flex-wrap gap-1">
							{selectedLabels.length > 0 ? (
								selectedLabels.map((o) => (
									<span
										key={o.value}
										className="flex items-center gap-1 rounded-md bg-secondary px-1.5 py-0.5 text-xs"
									>
										{o.label}
										<XIcon
											className="size-3 cursor-pointer"
											onClick={(e) => {
												e.stopPropagation();
												toggle(o.value);
											}}
										/>
									</span>
								))
							) : (
								<span className="text-muted-foreground">{placeholder}</span>
							)}
						</span>
						<ChevronsUpDownIcon className="size-4 shrink-0 text-muted-foreground" />
					</button>
				</PopoverTrigger>
				<PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
					<Command>
						<CommandInput placeholder="Поиск..." />
						<CommandList>
							<CommandEmpty>Ничего не найдено</CommandEmpty>
							<CommandGroup>
								{options.map((option) => (
									<CommandItem
										key={option.value}
										value={option.value}
										onSelect={() => toggle(option.value)}
									>
										<CheckIcon
											className={cn(
												'size-4 shrink-0',
												values.includes(option.value) ? 'opacity-100' : 'opacity-0',
											)}
										/>
										{option.label}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{error && <span className="text-(--color-danger) text-[12px] ml-3">{error}</span>}
		</div>
	);
};
