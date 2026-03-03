import React from 'react';
import './styles.less';

interface IProps {
	children: React.ReactNode;
}

const PageContentWrapper: React.FC<IProps> = ({ children }) => <div className="page-content-wrapper">{children}</div>;

export { PageContentWrapper };
