import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import '@mantine/core/styles.css';
import './app/index.less';
import App from './app/App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/reducer';

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
);
