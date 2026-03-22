import * as React from 'react';
import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
	useComboboxAnchor,
} from '@/components/ui/combobox';
import { XIcon } from 'lucide-react';

interface IProps {
	options: Array<{ value: string; label: string }>;
	values: Array<string>;
	setValues: (values: Array<string>) => void;
	label?: string;
	placeholder?: string;
}

const CustomMultiSelect: React.FC<IProps> = ({ options, label, placeholder, values, setValues }) => {
	const anchor = useComboboxAnchor();

	return (
		<div>
			{label && <span className="text-[14px] ml-2">{label}</span>}
			<div className="relative">
				<Combobox multiple autoHighlight items={options} value={values} onValueChange={setValues}>
					<ComboboxChips ref={anchor} className="w-full focus-within:ring-0 focus-within:border-input">
						<ComboboxValue>
							{(vals) => (
								<React.Fragment>
									{vals.map((v: string) => (
										<ComboboxChip key={v}>
											{options.find((o) => o.value === v)?.label ?? v}
										</ComboboxChip>
									))}
									<ComboboxChipsInput placeholder={placeholder ?? 'Выберите...'} />
								</React.Fragment>
							)}
						</ComboboxValue>
					</ComboboxChips>
					{values.length > 0 && (
						<button
							className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
							onClick={() => setValues([])}
						>
							<XIcon className="size-4" />
						</button>
					)}
					<ComboboxContent anchor={anchor}>
						<ComboboxEmpty>Ничего не найдено</ComboboxEmpty>
						<ComboboxList>
							{(item: { value: string; label: string }) => (
								<ComboboxItem key={item.value} value={item.value}>
									{item.label}
								</ComboboxItem>
							)}
						</ComboboxList>
					</ComboboxContent>
				</Combobox>
			</div>
		</div>
	);
};

export { CustomMultiSelect };
