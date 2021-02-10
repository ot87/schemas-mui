import React        from 'react';
import { render }   from 'react-dom';
import { Provider } from 'react-redux';

import 'index.css';
import App from 'App';

import configureAppStore from 'redux/store/configureAppStore';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const store = configureAppStore();

const renderApp = () => {
    render(
        <React.StrictMode>
            <Provider store={store}>
                <ThemeProvider theme={createMuiTheme()}>
                    <App />
                </ThemeProvider>
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./App', renderApp);
}

renderApp();
