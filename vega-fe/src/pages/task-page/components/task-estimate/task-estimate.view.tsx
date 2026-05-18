import React from 'react';
import { CustomProgress } from '@/components/common/ui/custom-progress.tsx';
import { BLUE_COLOR, RED_COLOR, TEAL_COLOR } from '@/pages/task-page/constants.ts';
import { Button } from '@/components/ui/button.tsx';
import { Plus } from 'lucide-react';
import { CustomChart } from '@/components/common/ui/custom-chart.tsx';
import type { IChartData, TModalType } from '@/pages/task-page/types.ts';

interface IProps {
	chartData: IChartData | null;
	onModalShown: (modalType: TModalType) => void;
}

const TaskEstimateView: React.FC<IProps> = ({ chartData, onModalShown }) => {
	return (
		<>
			<div className="border-b">
				<div className="p-3.75">
					<div className="text-muted-foreground uppercase text-[11px] mb-2.5">Учёт времени</div>
					{(chartData?.estimateTime || chartData?.totalLoggedTime) && (
						<div className="flex flex-col gap-2.5 mb-3.75">
							<CustomProgress
								progress={chartData.estimateTimePercents || 0}
								label="Оценка"
								percents={chartData.estimateTime}
								color={BLUE_COLOR}
								size="h-2"
							/>
							<CustomProgress
								progress={chartData.totalLoggedTimePercents || 0}
								label="Потрачено"
								percents={chartData.totalLoggedTime}
								size="h-2"
							/>
							<CustomProgress
								progress={chartData.remainingTimePercents || 0}
								label="Осталось"
								percents={chartData.remainingTime}
								color={(chartData?.remainingTimePercents ?? 0) >= 50 ? TEAL_COLOR : RED_COLOR}
								size="h-2"
							/>
						</div>
					)}
					<div className="w-full flex justify-center">
						<Button onClick={() => onModalShown('estimate')}>
							<Plus size={18} />
							{chartData?.estimateTime ? <span>Записать время</span> : <span>Оценить задачу</span>}
						</Button>
					</div>
				</div>
			</div>
			{chartData?.logData && (
				<div className="border-b">
					<div className="p-3.75">
						<div className="text-muted-foreground uppercase text-[11px] mb-2.5">Вклад в задачу</div>
						<div className="flex items-center justify-center">
							<CustomChart data={chartData.logData} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export { TaskEstimateView };
