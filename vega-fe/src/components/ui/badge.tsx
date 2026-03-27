import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
	'group/badge cursor-default inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border-[0.5px] rounded-sm px-2 py-0.5 text-[14px] font-light whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!',
	{
		variants: {
			variant: {
				default: 'bg-foreground/10 text-primary-foreground border-[var(--foreground)]',
				violet: 'bg-[var(--violet)]/10 text-[var(--violet)] border-[var(--violet)]',
				blue: 'bg-[var(--violet)]/10 text-[var(--violet)] border-[var(--blue)]',
				teal: 'bg-[var(--teal)]/10 text-[var(--teal)] border-[var(--teal)]',
				amber: 'bg-[var(--amber)]/10 text-[var(--amber)] border-[var(--amber)]',
				danger: 'bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]',
				red: 'bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--red)]',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

function Badge({
	className,
	variant = 'default',
	asChild = false,
	...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot.Root : 'span';

	return (
		<Comp
			data-slot="badge"
			data-variant={variant}
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants };
