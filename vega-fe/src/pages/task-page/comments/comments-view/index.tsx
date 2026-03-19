import type { IComment } from '../../types.ts';
import React from 'react';
import { Button, Textarea } from '@mantine/core';
import { CornerRightUp, Pencil, Trash2 } from 'lucide-react';
import './styles.less';

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
		<div className="comments">
			<ul className="comments__list">
				{comments.map((item) => {
					return field.uuid === item.id ? (
						<div className="comments__field" key={item.id}>
							<Textarea
								value={field.value}
								className="comments__input"
								resize="vertical"
								placeholder="Изменить комментарий..."
								onChange={(e) => {
									onSetCommentValue(item.id, e);
								}}
							/>
							<Button onClick={() => onEditComment(item.id)}>
								<CornerRightUp />
							</Button>
						</div>
					) : (
						<li className="comments__comment" key={item.id}>
							<div className="comments__header">
								<div className="comments__user">{item.user.name}</div>
								<div className="comments__date">{item.commentDate}</div>
								{currentUserUuid === item.user.userUuid && (
									<div className="comments__controls">
										<Pencil
											className="comments__control"
											size={15}
											onClick={() => onSetActiveField(item.id, item.text)}
										/>
										<Trash2
											className="comments__control"
											size={15}
											onClick={() => onDeleteComment(item.id)}
										/>
									</div>
								)}
							</div>
							<div className="comments__text">{item.text}</div>
						</li>
					);
				})}
			</ul>
			<div className="comments__field">
				<Textarea
					value={value}
					className="comments__input"
					resize="vertical"
					placeholder="Написать комментарий..."
					onChange={onSetValue}
				/>
				<Button onClick={onCreateComment}>
					<CornerRightUp />
				</Button>
			</div>
		</div>
	);
};

export { CommentsView };
