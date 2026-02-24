import React from 'react';
import './styles.less';

interface IProps {
	text: string;
	color: string;
}

const CustomBadge: React.FC<IProps> = ({ text, color }) => {
	return (
		<div className="custom-badge" style={{ backgroundColor: color }}>
			<span className="custom-badge__text">{text}</span>
		</div>
	);
};

export { CustomBadge };
