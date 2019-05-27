import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';


const isDev = process.env.NODE_ENV === 'development';
const composeEnhancers = (isDev && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const middlewares = [thunk];  // middlewares always applies in reverse order.

export default function configureStore(initialState) {
    const store = createStore(
        reducers, initialState,
        composeEnhancers(applyMiddleware(...middlewares))
    );

    return store;
}
