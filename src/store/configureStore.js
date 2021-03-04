import { createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk';

import appState from '../reducers/index'

export default function configureStore() {
    const store = createStore(appState, applyMiddleware(thunk));

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
};