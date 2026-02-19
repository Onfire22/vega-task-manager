import React from 'react';
import Question from '../../assets/icons/question.svg?react';
import Tippy from '@tippyjs/react';

interface IProps {
	children: React.ReactNode;
	iconWidth?: number;
	iconHeight?: number;
}

const CustomTooltip: React.FC<IProps> = ({
	children,
	iconWidth = 20,
	iconHeight = 20,
}) => {
	return (
		<Tippy content={children} trigger="mouseenter">
			<Question width={iconWidth} height={iconHeight} />
		</Tippy>
	);
};

export { CustomTooltip };
