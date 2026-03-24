import React from 'react';

interface IProps {
	children: React.ReactNode;
}

const PageContentWrapper: React.FC<IProps> = ({ children }) => (
	<main className="w-full h-[calc(100vh-53px)] flex justify-center bg-background">{children}</main>
);

export { PageContentWrapper };
