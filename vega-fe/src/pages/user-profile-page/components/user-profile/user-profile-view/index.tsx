import { Button } from '@/components/ui/button.tsx';
import { CustomInput } from '@/components/common/forms/custom-input.tsx';
import { CustomSelect } from '@/components/common/forms/custom-select.tsx';
import { CustomPasswordInput } from '@/components/common/forms/custom-password-input.tsx';

const UserProfileView = () => {
	return (
		<div className="w-full p-6 flex flex-col gap-5">
			<div className="bg-card rounded-lg">
				<div className="flex items-center gap-5 px-4.5 py-5">
					<div className="w-15 h-15 rounded-full bg-[blueviolet]" />
					<div>
						<div className="text-white">Алексей Смирнов</div>
						<div className="text-[12px] text-muted-foreground">@a.smirnov · Platform team</div>
						<div className="-ml-1.25">
							<Button size="xs" variant="default">
								Загрузить фото
							</Button>
							<Button size="xs" variant="default">
								Удалить фото
							</Button>
						</div>
					</div>
				</div>
			</div>
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
			<div className="bg-card rounded-lg">
				<div className="user-profile__wrapper">
					<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75">
						<div className="px-4.5 py-3.5">
							<p className="text-white">Настройки пароля</p>
							<p className="text-[12px] text-muted-foreground">Изменить пароль</p>
						</div>
					</div>
					<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75">
						<p className="text-white px-4.5 py-3.5">Старый пароль</p>
						<CustomPasswordInput value="" onChange={() => {}} />
					</div>
					<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75">
						<p className="text-white px-4.5 py-3.5">Новый пароль</p>
						<CustomPasswordInput value="" onChange={() => {}} />
					</div>
					<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75">
						<p className="text-white px-4.5 py-3.5">Повторите пароль</p>
						<CustomPasswordInput value="" onChange={() => {}} />
					</div>
					<div className="flex items-center justify-between border-b last:border-b-0 last:justify-end pr-3.75 py-2.5">
						<Button variant="primary">Изменить пароль</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export { UserProfileView };
