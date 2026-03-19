export interface ICommentCreateBody {
	taskUuid: string;
	text: string;
}

export interface ICommentUpdateBody {
	text: string;
}
