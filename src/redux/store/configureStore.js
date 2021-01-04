import { createStore, applyMiddleware, compose } from 'redux';
import thunk  from 'redux-thunk';
import logger from 'redux-logger';

import reducer from 'redux/reducers';

export default function configureStore(preloadedState) {
    const middlewares = [thunk, logger];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const storeEnhancers = [middlewareEnhancer];
    const composeEnhancers = (
        typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ) || compose;
    const composedEnhancer = composeEnhancers(...storeEnhancers);

    const store = createStore(
        reducer,
        preloadedState,
        composedEnhancer
    );

    return store;
}
