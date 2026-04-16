import type { IChannelListItem } from '@/pages/chat/types.ts';
import React from 'react';
import { Button } from '@/components/ui/button.tsx';
import { CirclePlus, Lock } from 'lucide-react';
import { pluralValue } from '@/app/utils.ts';
import { PLURAL_OPTIONS } from '@/pages/chat/constants.ts';

interface IProps {
	channels: Array<IChannelListItem>;
}

const ChannelJoinView: React.FC<IProps> = ({ channels }) => {
	return (
		<div>
			<ul>
				{channels.map((channel) => {
					return (
						<li
							key={channel.id}
							className="p-1 rounded-[5px] hover:bg-accent p-1.25 rounded-[5px] flex items-center justify-between"
						>
							<div className="flex items-center gap-[10px]">
								{channel.channelVisibility === 'private' ? (
									<Lock size={19} />
								) : (
									<CirclePlus size={19} />
								)}
								<div className="flex flex-col text-[12px]">
									<p className="text-white">{channel.title}</p>
									<span>{`${channel.usersLength} ${pluralValue(channel.usersLength, PLURAL_OPTIONS)}`}</span>
									<div>
										<span>Администратор </span>
										<span className="text-[var(--color-green)] underline cursor-pointer">
											{channel?.channelAdmin?.name}
										</span>
									</div>
								</div>
							</div>
							<Button size="xs" variant="primary" disabled={channel.channelVisibility === 'private'}>
								Вступить
							</Button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export { ChannelJoinView };
