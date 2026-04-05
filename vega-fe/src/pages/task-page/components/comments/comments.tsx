import { CommentsView } from './comments.view.tsx';
import {
	useCreateCommentMutation,
	useDeleteCommentMutation,
	useEditCommentMutation,
} from '../../../../api/comments/comments.api.ts';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { useComments } from '../../hooks.ts';
import { useGetCurrentUserQuery } from '../../../../api/auth/auth.api.ts';
import { toast } from 'sonner';

const Comments = () => {
	const params = useParams();

	const [value, setValue] = useState('');
	const [field, setField] = useState({
		uuid: '',
		value: '',
	});

	const [createComment] = useCreateCommentMutation();
	const [deleteComment] = useDeleteCommentMutation();
	const [editComment] = useEditCommentMutation();
	const { data } = useGetCurrentUserQuery();

	const { comments } = useComments(params.uuid!);

	const handleCreateComment = async () => {
		if (params.uuid) {
			try {
				await createComment({ taskUuid: params.uuid, text: value }).unwrap();
				setValue('');
			} catch (e) {
				const error = e as { data?: { message?: string } };
				toast.error(error.data?.message ?? 'Something went wrong');
			}
		}
	};

	const handleEditComment = async (uuid: string) => {
		if (params.uuid) {
			try {
				await editComment({ commentUuid: uuid, text: field.value });
				setField({ uuid: '', value: '' });
			} catch (e) {
				const error = e as { data?: { message?: string } };
				toast.error(error.data?.message ?? 'Something went wrong');
			}
		}
	};

	const handleSetActiveField = (uuid: string, value: string) => {
		setField({ uuid, value });
	};

	const handleSetCommentValue = (uuid: string, e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setField({ uuid, value: e.target.value });
	};

	const handleDeleteComment = (uuid: string) => {
		deleteComment(uuid);
	};

	const handleSetValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value);
	};

	return (
		<CommentsView
			value={value}
			comments={comments}
			currentUserUuid={data?.currentUser.id}
			field={field}
			onSetValue={handleSetValue}
			onCreateComment={handleCreateComment}
			onDeleteComment={handleDeleteComment}
			onSetActiveField={handleSetActiveField}
			onSetCommentValue={handleSetCommentValue}
			onEditComment={handleEditComment}
		/>
	);
};

export { Comments };
