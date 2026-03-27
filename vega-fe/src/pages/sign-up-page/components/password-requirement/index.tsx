import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils.ts';

const PasswordRequirement = ({ meets, label }: { meets: boolean; label: string }) => {
	return (
		<div className={cn('flex items-center mt-1.75', meets ? 'text-teal' : 'text-danger')}>
			{meets ? <Check size={18} /> : <X size={18} />}
			<div className="text-[14px]">{label}</div>
		</div>
	);
};

export { PasswordRequirement };
