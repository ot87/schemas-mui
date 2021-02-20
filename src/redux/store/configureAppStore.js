import { configureStore } from '@reduxjs/toolkit';
import API from 'api';

import reducer from 'redux/reducers';

export default function configureAppStore(preloadedState) {
    const store = configureStore({
        reducer,
        preloadedState,
        middleware: getDefaultMiddleware => (
            getDefaultMiddleware({
                thunk: {
                    extraArgument: API,
                }
            })
        )
    });

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('../reducers', () => store.replaceReducer(reducer));
    }

    return store;
}
