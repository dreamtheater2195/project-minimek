import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import "semantic-ui-css/semantic.css";
const store = configureStore();
const rootEl = document.getElementById('root');

let render = () => {
    const App = require('./App').default;
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        rootEl
    );
}
if (module.hot) {
    module.hot.accept('./App', () => {
        setTimeout(render);
    })
}

render();