import React from 'react';
import './styles.less';

interface IProps {
	menu: React.ReactNode;
}

const Header: React.FC<IProps> = ({ menu }) => {
	return <header className="header">{menu}</header>;
};

export { Header };
