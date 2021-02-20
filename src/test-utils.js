import React from 'react';
import { render } from '@testing-library/react';
import configureAppStore from 'redux/store/configureAppStore';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import configureMockStore from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

export const mockUseMediaQuery = width => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: query.match(/\d+.\d+/)?.[0] > width,
            addListener: jest.fn(),
            removeListener: jest.fn()
        }))
    });
};

export function mockStyleInjection() {
    const defaultInsertRule = window.CSSStyleSheet.prototype.insertRule;
    window.CSSStyleSheet.prototype.insertRule = function (rule, index) {
        const styleElement = document.createElement('style');
        const textNode = document.createTextNode(rule);
        styleElement.appendChild(textNode);
        document.head.appendChild(styleElement);
        return defaultInsertRule.bind(this)(rule, index);
    };
    // cleanup function, which reinserts the head and cleans up method overwrite
    return function applyJSSRules() {
      window.CSSStyleSheet.prototype.insertRule = defaultInsertRule;
      document.head.innerHTML = document.head.innerHTML;
    };
};

export const configureMockAppStore = (async = false) => {
    const middlewares = async ? [getDefaultMiddleware()[1]] : [];
    return configureMockStore(middlewares);
};

const customRender = (
    ui,
    {
        initialState = {},
        store = configureAppStore(initialState),
        ...renderOptions
    } = {}
) => {
    const Wrapper = ({ children }) => (
        <Provider store={store}>
            <ThemeProvider theme={createMuiTheme()}>
                {children}
            </ThemeProvider>
        </Provider>
    );
    return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
