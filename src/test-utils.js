import React from 'react';
import { render } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import reducer from './redux/reducers';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export const mockUseMediaQuery = (width) => {
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
  }

const customRender = (
    ui,
    {
        initialState = {},
        store = createStore(
            reducer,
            initialState,
            applyMiddleware(thunk)
        ),
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