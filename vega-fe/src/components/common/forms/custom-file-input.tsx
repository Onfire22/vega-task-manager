import { Camera, X } from 'lucide-react';
import React from 'react';

interface IProps {
	value?: File;
	onChange: (file: File | null) => void;
	onAvatarClear: () => void;
	alt?: string;
	placeholder?: string;
}

const CustomFileInput: React.FC<IProps> = ({ value, onChange, alt, placeholder, onAvatarClear }) => {
	return (
		<div className="flex flex-col">
			<p className="text-[14px]">{placeholder}</p>
			<div className="flex items-center justify-center w-[100px] h-[100px]">
				{value ? (
					<div className="relative">
						<button className="absolute cursor-pointer" type="button" onClick={onAvatarClear}>
							<X />
						</button>
						<img src={URL.createObjectURL(value)} alt={alt} className="rounded-full object-cover" />
					</div>
				) : (
					<label className="flex items-center justify-center p-2 bg-secondary rounded cursor-pointer w-full h-full">
						<Camera />
						<input
							className="hidden"
							type="file"
							accept="image/*"
							onChange={(e) => {
								const file = e.target.files?.[0] ?? null;
								onChange(file);
							}}
						/>
					</label>
				)}
			</div>
		</div>
	);
};

export { CustomFileInput };
