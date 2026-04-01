import type { IComment } from '../../types.ts';
import React from 'react';
import { CornerRightUp, Pencil, Trash2, XIcon } from 'lucide-react';
import { CustomTextarea } from '@/components/common/forms/custom-textarea.tsx';
import { Button } from '@/components/ui/button.tsx';

interface IProps {
	value: string;
	currentUserUuid?: string;
	field: { uuid: string; value: string };
	comments: Array<IComment>;
	onSetValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onCreateComment: () => void;
	onEditComment: (uuid: string) => void;
	onDeleteComment: (uuid: string) => void;
	onSetActiveField: (uuid: string, value: string) => void;
	onSetCommentValue: (uuid: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CommentsView: React.FC<IProps> = ({
	comments,
	onSetValue,
	onCreateComment,
	value,
	field,
	currentUserUuid,
	onDeleteComment,
	onSetActiveField,
	onSetCommentValue,
	onEditComment,
}) => {
	return (
		<div>
			<ul className="flex flex-col gap-2.5 mb-2.5">
				{comments.map((item) => {
					return field.uuid === item.id ? (
						<div className="flex gap-2.5 mb-2.5" key={item.id}>
							<CustomTextarea
								value={field.value}
								placeholder="Изменить комментарий..."
								onChange={(e) => {
									onSetCommentValue(item.id, e);
								}}
							/>
							<div>
								<Button onClick={() => onEditComment(item.id)}>
									<CornerRightUp />
								</Button>
								<Button onClick={() => onSetActiveField('', '')}>
									<XIcon />
								</Button>
							</div>
						</div>
					) : (
						<li className="p-1.25 rounded-[5px] flex items-start gap-2.5 hover:bg-secondary" key={item.id}>
							<div
								className="w-7.5 h-7.5 rounded-full flex items-center justify-center"
								style={{ backgroundColor: item.user.avatar.color }}
							>
								{item.user.avatar.initials}
							</div>
							<div>
								<div className="flex items-center gap-2.5">
									<div>{item.user.name}</div>
									<div className="text-[12px] flex items-center gap-1.25">
										<div className="text-muted-foreground">{item.commentDate}</div>
										<div className="text-danger">{item.commentEditedTime}</div>
									</div>
									{currentUserUuid === item.user.userUuid && (
										<div className="flex items-center gap-1.25">
											<Pencil
												className="cursor-pointer hover:text-muted-foreground"
												size={15}
												onClick={() => onSetActiveField(item.id, item.text)}
											/>
											<Trash2
												className="cursor-pointer hover:text-muted-foreground"
												size={15}
												onClick={() => onDeleteComment(item.id)}
											/>
										</div>
									)}
								</div>
								<div>{item.text}</div>
							</div>
						</li>
					);
				})}
			</ul>
			<div className="flex gap-2.5 mb-2.5">
				<CustomTextarea value={value} placeholder="Написать комментарий..." onChange={onSetValue} />
				<Button onClick={onCreateComment} disabled={!value.length}>
					<CornerRightUp />
				</Button>
			</div>
		</div>
	);
};

export { CommentsView };
