import React from 'react';
import { render, screen, within } from '@testing-library/react';
import configureAppStore from 'redux/store/configureAppStore';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export const getByRole   = (type, name) => screen.getByRole(type, { name });
export const queryByRole = (type, name) => screen.queryByRole(type, { name });

export const getButton     = (name) => screen.getByRole('button', { name });
export const getAllButtons = (name) => screen.getAllByRole('button', { name });
export const queryButton = (name) => screen.queryByRole('button', { name });

export const getButtonWithin   = (element, name) => within(element).getByRole('button', { name });
export const queryButtonWithin = (element, name) => within(element).queryByRole('button', { name });

export const getTabList = (name) => screen.getByRole('tablist', { name });

export const getTab = (name) => screen.getByRole('tab', { name });

export const getGridCell     = (name) => screen.getByRole('gridcell', { name });
export const getAllGridCells = (name) => screen.getAllByRole('gridcell', { name });
export const queryGridCell   = (name) => screen.queryByRole('gridcell', { name });

export const getGridCellWithin   = (element, name) => within(element).getByRole('gridcell', { name });
export const queryGridCellWithin = (element, name) => within(element).queryByRole('gridcell', { name });

export const getTextBox      = (name) => screen.getByRole('textbox', { name });
export const getAllTextBoxes = (name) => screen.getAllByRole('textbox', { name });

export const getTextBoxWithin = (element, name) => within(element).getByRole('textbox', { name });

export const getTable = (name) => screen.getByRole('table', { name });

export const getGrid = (name) => screen.getByRole('grid', { name });

export const getByTextWithin = (element, text) => within(element).getByText(text);

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
