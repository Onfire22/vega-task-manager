import { Button } from '@/components/ui/button.tsx';
import { Plus, Search } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.tsx';

const SidebarView = () => {
	return (
		<div className="w-[23%]">
			<div className="max-h-[calc(100vh-75px)] overflow-auto scrollbar-custom p-3">
				<div className="flex items-center gap-2">
					<Button className="flex-1" size="lg">
						<Plus />
						<span>Новый чат</span>
					</Button>
					<Button size="lg">
						<Search />
					</Button>
				</div>
				<div>
					<Accordion type="multiple" className="max-w-lg" defaultValue={['notifications']}>
						<AccordionItem value="1">
							<AccordionTrigger>Проекты</AccordionTrigger>
							<AccordionContent>
								<div className="py-[10px] px-[5px] flex items-center justify-between rounded-[5px] hover:bg-accent cursor-default">
									<div className="flex items-center gap-2">
										<div className="bg-white w-[30px] h-[30px] rounded-full" />
										<div>Проект 2</div>
									</div>
									<div className="px-[6px] text-white bg-violet rounded-full">10</div>
								</div>
								<div className="py-[10px] px-[5px] flex items-center justify-between rounded-[5px] hover:bg-accent">
									<div className="flex items-center gap-2">
										<div className="bg-white w-[30px] h-[30px] rounded-full" />
										<div>Проект 1</div>
									</div>
									<div>1</div>
								</div>
								<div className="py-[10px] px-[5px] flex items-center justify-between rounded-[5px] hover:bg-accent">
									<div className="flex items-center gap-2">
										<div className="bg-white w-[30px] h-[30px] rounded-full" />
										<div>Проект 1</div>
									</div>
									<div>1</div>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion type="multiple" className="max-w-lg" defaultValue={['notifications']}>
						<AccordionItem value="1">
							<AccordionTrigger>Каналы</AccordionTrigger>
							<AccordionContent>
								<div className="py-[10px] px-[5px] flex items-center justify-between rounded-[5px] hover:bg-accent">
									<div className="flex items-center gap-2">
										<div className="bg-white w-[30px] h-[30px] rounded-full" />
										<div>Проект 1</div>
									</div>
									<div>1</div>
								</div>
								<div className="py-[10px] px-[5px] flex items-center justify-between rounded-[5px] hover:bg-accent">
									<div className="flex items-center gap-2">
										<div className="bg-white w-[30px] h-[30px] rounded-full" />
										<div>Проект 1</div>
									</div>
									<div>1</div>
								</div>
								<div className="py-[10px] px-[5px] flex items-center justify-between rounded-[5px] hover:bg-accent">
									<div className="flex items-center gap-2">
										<div className="bg-white w-[30px] h-[30px] rounded-full" />
										<div>Проект 1</div>
									</div>
									<div>1</div>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion type="multiple" className="max-w-lg" defaultValue={['notifications']}>
						<AccordionItem value="1">
							<AccordionTrigger>Личные сообщения</AccordionTrigger>
							<AccordionContent>
								<div className="py-[10px] px-[5px] flex items-center justify-between rounded-[5px] hover:bg-accent">
									<div className="flex items-center gap-2">
										<div className="bg-white w-[30px] h-[30px] rounded-full" />
										<div>Проект 1</div>
									</div>
									<div>1</div>
								</div>
								<div className="py-[10px] px-[5px] flex items-center justify-between rounded-[5px] hover:bg-accent">
									<div className="flex items-center gap-2">
										<div className="bg-white w-[30px] h-[30px] rounded-full" />
										<div>Проект 1</div>
									</div>
									<div>1</div>
								</div>
								<div className="py-[10px] px-[5px] flex items-center justify-between rounded-[5px] hover:bg-accent">
									<div className="flex items-center gap-2">
										<div className="bg-white w-[30px] h-[30px] rounded-full" />
										<div>Проект 1</div>
									</div>
									<div>1</div>
								</div>
								<div className="py-[10px] px-[5px] flex items-center justify-between rounded-[5px] hover:bg-accent">
									<div className="flex items-center gap-2">
										<div className="bg-white w-[30px] h-[30px] rounded-full" />
										<div>Проект 1</div>
									</div>
									<div>1</div>
								</div>
								<div className="py-[10px] px-[5px] flex items-center justify-between rounded-[5px] hover:bg-accent">
									<div className="flex items-center gap-2">
										<div className="bg-white w-[30px] h-[30px] rounded-full" />
										<div>Проект 1</div>
									</div>
									<div>1</div>
								</div>
								<div className="py-[10px] px-[5px] flex items-center justify-between rounded-[5px] hover:bg-accent">
									<div className="flex items-center gap-2">
										<div className="bg-white w-[30px] h-[30px] rounded-full" />
										<div>Проект 1</div>
									</div>
									<div>1</div>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</div>
	);
};

export { SidebarView };
