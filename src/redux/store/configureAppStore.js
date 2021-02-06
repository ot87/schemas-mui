import { configureStore } from '@reduxjs/toolkit';

import reducer from 'redux/reducers';

export default function configureAppStore(preloadedState) {
    const store = configureStore({
        reducer,
        preloadedState
    });

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('../reducers', () => store.replaceReducer(reducer));
    }

    return store;
}
