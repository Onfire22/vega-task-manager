import React from 'react';
import './styles.less';

interface IProps {
	offset?: number;
	children: React.ReactNode;
}

const PageContentWrapper: React.FC<IProps> = ({ children, offset }) => (
	<div
		className="page-content-wrapper"
		style={{
			height: offset ? `calc(100vh - ${offset}px)` : '100vh',
		}}
	>
		{children}
	</div>
);

export { PageContentWrapper };
