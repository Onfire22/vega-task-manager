import type { IChannelListItem } from '@/pages/chat/types.ts';
import React from 'react';
import { Button } from '@/components/ui/button.tsx';
import { CirclePlus, Lock, MessageCircleMore } from 'lucide-react';
import { pluralValue } from '@/app/utils.ts';
import { PLURAL_OPTIONS } from '@/pages/chat/constants.ts';
import { CustomTooltip } from '@/components/common/ui/custom-tooltip.tsx';
import { Link } from 'react-router-dom';

interface IProps {
	channels: Array<IChannelListItem>;
	onJoinChannel: (channelUuid: string) => void;
}

const ChannelJoinView: React.FC<IProps> = ({ channels, onJoinChannel }) => {
	return (
		<ul className="max-h-[60vh] overflow-auto scrollbar-custom">
			{channels.length > 0 ? (
				channels.map((channel) => {
					return (
						<li
							key={channel.id}
							className="p-1 rounded-[5px] hover:bg-accent flex items-center justify-between"
						>
							<div className="flex items-center gap-2.5">
								{channel.channelVisibility === 'private' ? (
									<Lock size={19} />
								) : (
									<CirclePlus size={19} />
								)}
								<div className="flex flex-col text-[12px]">
									<p className="text-white">{channel.title}</p>
									<span>{`${channel.usersLength} ${pluralValue(channel.usersLength, PLURAL_OPTIONS)}`}</span>
									{channel.channelVisibility === 'private' && (
										<div className="flex items-center gap-0.75">
											<span>Администратор</span>
											<CustomTooltip
												position="top"
												trigger={
													<Link className="flex items-center gap-0.75" to="#">
														<span className="text-(--color-green) underline cursor-pointer">
															{channel?.channelAdmin?.name}
														</span>
														<MessageCircleMore
															size={14}
															className="inline"
															color="var(--color-green)"
														/>
													</Link>
												}
												content="Связаться с администратором"
											/>
										</div>
									)}
								</div>
							</div>
							<Button
								size="xs"
								variant="primary"
								disabled={channel.channelVisibility === 'private'}
								onClick={() => onJoinChannel(channel.id)}
							>
								Вступить
							</Button>
						</li>
					);
				})
			) : (
				<div className="w-full text-center">Тут ничего нет</div>
			)}
		</ul>
	);
};

export { ChannelJoinView };
