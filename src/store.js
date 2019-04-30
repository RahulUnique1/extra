import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
// import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export const history = syncHistoryWithStore(browserHistory, store);

if(module.hot) {
    module.hot.accept('./reducer', () => {
        const nextRootReducer = require('./reducer').default;
        store.replaceReducer(nextRootReducer);
    });
}

export default store;
