import React from 'react';
import { Grid2x2, TableOfContents } from 'lucide-react';
import './styles.less';

interface IProps {
	onTabClick: (tab: string) => void;
	activeTab: string;
	component: React.ComponentType;
}

const ProjectsView: React.FC<IProps> = ({ activeTab, onTabClick, component: Component }) => {
	return (
		<div className="projects">
			<div className="projects__info">
				<h1 className="projects__title">Проекты</h1>
				<div className="projects__controlls">
					<div className="projects__tabs">
						<button
							className={`projects__button${activeTab === 'table' ? ' projects__button_active' : ''}`}
							onClick={() => onTabClick('table')}
						>
							<TableOfContents size={12} />
							<span>Таблица</span>
						</button>
						<button
							className={`projects__button${activeTab === 'cards' ? ' projects__button_active' : ''}`}
							onClick={() => onTabClick('cards')}
						>
							<Grid2x2 size={12} />
							<span>Карточки</span>
						</button>
					</div>
				</div>
			</div>
			<Component />
		</div>
	);
};

export { ProjectsView };
