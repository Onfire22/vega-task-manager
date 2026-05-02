import React from 'react';

interface IProps {
	children: React.ReactNode;
}

const PageContentWrapper: React.FC<IProps> = ({ children }) => (
	<main className="w-full h-[calc(100vh-55px)] flex justify-center bg-background overflow-y-auto scrollbar-custom">
		{children}
	</main>
);

export { PageContentWrapper };
