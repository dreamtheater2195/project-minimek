import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import logger from 'redux-logger';
export default function configureStore(preloadedState) {
    const middlewares = [thunk, logger];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const storeEnhancers = [middlewareEnhancer];
    const composedEnhancer = composeWithDevTools(...storeEnhancers);

    const store = createStore(rootReducer, preloadedState, composedEnhancer);

    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('../reducers/rootReducer', () => {
                const nextRootReducer = require('../reducers/rootReducer').default;
                store.replaceReducer(nextRootReducer);
            })
        }
    }
    return store;
}