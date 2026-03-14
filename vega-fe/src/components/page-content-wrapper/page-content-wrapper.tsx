import React from 'react';
import './styles.less';

interface IProps {
	children: React.ReactNode;
}

const PageContentWrapper: React.FC<IProps> = ({ children }) => <main className="page-content-wrapper">{children}</main>;

export { PageContentWrapper };
