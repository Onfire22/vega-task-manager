import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { CustomSelect } from '@/components/common/forms/custom-select.tsx';
import { Button } from '@/components/ui/button.tsx';

const PersonalInfoView = () => {
	return (
		<div className="bg-card rounded-lg">
			<div className="user-profile__wrapper">
				<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end">
					<div className="px-4.5 py-3.5">
						<p className="text-white">Личные данные</p>
						<p className="text-[12px] text-muted-foreground">
							Отображается в задачах, комментариях и упоминаниях
						</p>
					</div>
				</div>
				<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75">
					<p className="text-white px-4.5 py-3.5">Имя</p>
					<CustomInput value="" onChange={() => {}} type="text" />
				</div>
				<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75">
					<p className="text-white px-4.5 py-3.5">Фамилия</p>
					<CustomInput value="" onChange={() => {}} type="text" />
				</div>
				<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75">
					<p className="text-white px-4.5 py-3.5">Должность / роль</p>
					<CustomSelect options={[]} onChange={() => {}} value="" />
				</div>
				<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75">
					<p className="text-white px-4.5 py-3.5">Команда</p>
					<CustomSelect options={[]} onChange={() => {}} value="" />
				</div>
				<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75">
					<p className="text-white px-4.5 py-3.5">Часовой пояс</p>
					<CustomSelect options={[]} onChange={() => {}} value="" />
				</div>
				<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75 py-2.5">
					<Button variant="primary">Сохранить</Button>
				</div>
			</div>
		</div>
	);
};

export { PersonalInfoView };
