import React from 'react';
import { render } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import reducer from './redux/reducers';

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
    const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
    return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };