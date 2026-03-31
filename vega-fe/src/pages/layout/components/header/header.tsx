import React from 'react';

interface IProps {
	menu: React.ReactNode;
}

const Header: React.FC<IProps> = ({ menu }) => {
	return <header className="p-[7px_10px_7px_7px] bg-sidebar border-b">{menu}</header>;
};

export { Header };
