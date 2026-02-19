import './styles.less';
import React from 'react';

interface IProps {
	width?: number;
	height?: number;
}

const CustomLoader: React.FC<IProps> = ({ width = 50, height = 50 }) => {
	return <span className="loader" style={{ width, height }} />;
};

export { CustomLoader };
