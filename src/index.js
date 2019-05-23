import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

//Routes
import AppRoutes from './routes';

import rootReducer from './reducers';
import { fetchAllPosts } from './actions/index';
import { initAppLogin } from './actions/loginActions';



const store = createStore(rootReducer, applyMiddleware(thunk));

store.dispatch(fetchAllPosts());
store.dispatch(initAppLogin())


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <AppRoutes />
        </Router>
    </Provider>, document.getElementById('root'));
