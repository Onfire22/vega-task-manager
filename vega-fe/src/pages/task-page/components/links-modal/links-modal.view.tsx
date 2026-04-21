import { CustomModal } from '@/components/common/ui/custom-modal.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { ILinksForm, TModalType } from '@/pages/task-page/types.ts';
import React from 'react';
import { CustomTextarea } from '@/components/common/forms/custom-textarea.tsx';

interface IProps {
	modalType: TModalType;
	form: UseFormReturn<ILinksForm>;
	onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
	onLogWorkModalShown: () => void;
}

const LinksModalView: React.FC<IProps> = ({ form, onSubmit, modalType, onLogWorkModalShown }) => {
	return (
		<CustomModal isOpen={modalType === 'links'} onOpenChange={onLogWorkModalShown} title="Прикрепить ссылки">
			<form className="flex flex-col gap-[10px]" onSubmit={onSubmit}>
				<Controller
					name="mr"
					control={form.control}
					render={({ field, fieldState }) => (
						<CustomTextarea
							id="mr"
							label="Мерж реквест"
							placeholder="Можно добавить несколько"
							value={field.value ?? ''}
							onChange={field.onChange}
							error={fieldState.error?.message}
						/>
					)}
				/>
				<Controller
					name="builds"
					control={form.control}
					render={({ field, fieldState }) => (
						<CustomTextarea
							id="builds"
							label="Сборка"
							placeholder="Можно добавить несколько"
							value={field.value ?? ''}
							onChange={field.onChange}
							error={fieldState.error?.message}
						/>
					)}
				/>
				<div className="flex items-center justify-center">
					<Button variant="primary" type="submit">
						Сохранить
					</Button>
					<Button onClick={onLogWorkModalShown}>Отмена</Button>
				</div>
			</form>
		</CustomModal>
	);
};

export { LinksModalView };
