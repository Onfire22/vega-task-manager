import { CustomPasswordInput } from '@/components/common/forms/custom-password-input.tsx';
import { Button } from '@/components/ui/button.tsx';

const PasswordInfoView = () => {
	return (
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
	);
};

export { PasswordInfoView };
