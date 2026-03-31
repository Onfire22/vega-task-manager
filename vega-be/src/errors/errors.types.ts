export interface IError {
	formErrors: Array<string>;
	fieldErrors: Record<string, Array<string>>;
}
