import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

import Main from './Main';
import App from './components/App';
import EditProduct from './components/edit';

function scrollTop () {
    window.scrollTo(0, 0);
}

const routes = (
    <Provider store={store}>
          <Router history={history} onUpdate={scrollTop}>
                <Route path="/" component={Main}>
                    <IndexRoute component={App}/>
                    <Route path="edit-product" component={EditProduct}></Route>
                </Route>
          </Router>
    </Provider>
)

export default routes;
