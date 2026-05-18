import React from 'react';

interface IProps {
	children: React.ReactNode;
}

const CustomSidebar: React.FC<IProps> = ({ children }) => {
	return <aside className="w-[40%] min-h-[calc(100vh-55px)] border-l">{children}</aside>;
};

export { CustomSidebar };
