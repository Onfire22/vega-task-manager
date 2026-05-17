import { TaskEstimateView } from '@/pages/task-page/components/task-estimate/task-estimate.view.tsx';
import { useChartData } from '@/pages/task-page/hooks.ts';
import type { TModalType } from '@/pages/task-page/types.ts';
import { setModalType } from '@/pages/task-page/slice.ts';
import { useAppDispatch } from '@/store/hooks.ts';

const TaskEstimate = () => {
	const dispatch = useAppDispatch();

	const { chartData } = useChartData();

	const handleModalShown = (modalType: TModalType) => {
		dispatch(setModalType(modalType));
	};

	return <TaskEstimateView chartData={chartData} onModalShown={handleModalShown} />;
};

export { TaskEstimate };
