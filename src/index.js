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
    const renderApp = render;
    const renderError = (error) => {
        const RedBox = require('redbox-react').default;
        ReactDOM.render(
            <RedBox error={error} />,
            rootEl
        )
    };
    render = () => {
        try {
            renderApp();
        } catch (err) {
            renderError(err);
        }
    }
    module.hot.accept('./App', () => {
        setTimeout(render);
    })
}

render();

console.log(store.getState())