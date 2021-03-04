import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import 'index.css';
import App from 'App';

import configureAppStore from 'redux/store/configureAppStore';

const store = configureAppStore();

const renderApp = () => {
    render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./App', renderApp);
}

renderApp();
