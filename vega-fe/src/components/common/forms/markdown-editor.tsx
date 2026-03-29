import React, { type ChangeEvent, useState } from 'react';
import { CustomTabs } from '@/components/common/ui/custom-tabs.tsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Textarea } from '@/components/ui/textarea.tsx';

interface IProps {
	value: string;
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const MarkdownEditor: React.FC<IProps> = ({ value, onChange }) => {
	const [activeTab, setActiveTab] = useState('editor');

	return (
		<div>
			<div className="w-full border rounded-sm">
				<div className="p-2 border-b flex items-center justify-start">
					<CustomTabs
						triggers={[
							{ text: 'Редактор', value: 'editor' },
							{ text: 'Split', value: 'split' },
							{ text: 'Превью', value: 'preview' },
						]}
						activeTab={activeTab}
						onChange={setActiveTab}
					/>
				</div>
				{activeTab === 'editor' && (
					<Textarea
						className="border-none resize-y"
						style={{ fieldSizing: 'fixed', minHeight: '150px' }}
						value={value}
						onChange={onChange}
					/>
				)}
				{activeTab === 'split' && (
					<div className="flex flex-row overflow-hidden w-full">
						<Textarea
							className="border-none min-w-0 resize-y"
							style={{ width: 0, flexGrow: 1 }}
							placeholder="Ввести текст в формате markdown"
							value={value}
							onChange={onChange}
						/>
						<div className="prose prose-invert w-1/2 min-w-0 overflow-hidden [&_*]:break-words p-2 border-l">
							<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
								{value}
							</ReactMarkdown>
						</div>
					</div>
				)}
				{activeTab === 'preview' && (
					<div
						className="prose prose-invert max-w-none p-2"
						style={{
							overflowWrap: 'break-word',
							wordBreak: 'break-word',
							overflow: 'hidden',
						}}
					>
						<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
							{value}
						</ReactMarkdown>
					</div>
				)}
			</div>
		</div>
	);
};

export { MarkdownEditor };
