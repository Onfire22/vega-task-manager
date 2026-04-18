import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { SendHorizontal } from 'lucide-react';
import React from 'react';
import type { IUserOption } from '@/pages/chat/types.ts';

interface IProps {
	value: string;
	usersOptions: Array<IUserOption>;
	onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onPmChatStart: (user: IUserOption) => void;
}

const NewPmContentView: React.FC<IProps> = ({ value, onSearchChange, usersOptions, onPmChatStart }) => {
	return (
		<div>
			<CustomInput value={value} onChange={onSearchChange} placeholder="Поиск пользователя" />
			<ul className="p-3 flex flex-col gap-2 max-h-125 overflow-auto scrollbar-custom">
				{usersOptions.length > 0 ? (
					usersOptions.map((item) => {
						return (
							<li className="py-2 flex items-center justify-between" key={item.value}>
								<span>{item.label}</span>
								<Button variant="primary" type="button" onClick={() => onPmChatStart(item)}>
									<SendHorizontal />
								</Button>
							</li>
						);
					})
				) : (
					<div className="text-center py-2">Ничего не найдено</div>
				)}
			</ul>
		</div>
	);
};

export { NewPmContentView };
