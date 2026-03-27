import * as React from 'react';
import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				'h-8 w-full min-w-0 bg-transparent px-2.5 py-1 text-base transition-colors outline-none border-none ring-0 shadow-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				'[&:-webkit-autofill]:[box-shadow:inset_0_0_0_1000px_var(--background)]',
				'[&:-webkit-autofill]:[-webkit-text-fill-color:var(--foreground)]',
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
