import ReactDOM from 'react-dom/client';
import { createBrowserHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import App from './App.tsx';
import { Provider } from './provider.tsx';
import '@/styles/globals.css';

export let history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById('root')!).render(
  // @ts-expect-error
  <HistoryRouter history={history}>
    <Provider>
      <App />
    </Provider>
  </HistoryRouter>,
);
