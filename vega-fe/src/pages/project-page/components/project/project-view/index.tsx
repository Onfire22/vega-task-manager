import './styles.less';
import { Accordion, Button } from '@mantine/core';
import { IconUserDown } from '@tabler/icons-react';

const ProjectView = () => {
	return (
		<div className="project">
			<div className="project__header">
				<img className="project__avatar" />
				<div className="project__info">
					<div className="project__code">TI:</div>
					<h1 className="project__title">Title</h1>
				</div>
			</div>
			<div className="project__content">
				<div className="project__description">
					Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem
					ipsumLorem ipsum
				</div>
				<aside className="project__sidebar">
					<div className="project__date">
						<span>Дата проекта</span>
						<span>10.02.2026</span>
					</div>
					<div className="project__users">
						<Accordion chevronPosition="left" variant="contained" defaultValue="users">
							<Accordion.Item value="users">
								<Accordion.Control icon={<IconUserDown size={22} stroke={1.5} />}>
									Участники проекта
								</Accordion.Control>
								<Accordion.Panel>
									<div className="project__users-data">
										<Button className="project__user" variant="default">
											Ивнаов Иван
										</Button>
										<Button className="project__user" variant="default">
											Ивнаов Иван
										</Button>
										<Button className="project__user" variant="default">
											Ивнаов Иван
										</Button>
										<Button className="project__user" variant="default">
											Ивнаов Иван
										</Button>
										<Button className="project__user" variant="default">
											Ивнаов Иван
										</Button>
										<Button className="project__user" variant="default">
											Ивнаов Иван
										</Button>
										<Button className="project__user" variant="default">
											Ивнаов Иван
										</Button>
										<Button className="project__user" variant="default">
											Ивнаов Иван
										</Button>
										<Button className="project__user" variant="default">
											Ивнаов Иван
										</Button>
										<Button className="project__user" variant="default">
											Ивнаов Иван
										</Button>
										<Button className="project__user" variant="default">
											Ивнаов Иван
										</Button>
										<Button className="project__user" variant="default">
											Ивнаов Иван
										</Button>
										<Button className="project__user" variant="default">
											Ивнаов Иван
										</Button>
										<Button className="project__user" variant="default">
											Ивнаов Иван
										</Button>
									</div>
								</Accordion.Panel>
							</Accordion.Item>
						</Accordion>
					</div>
				</aside>
			</div>
		</div>
	);
};

export { ProjectView };
