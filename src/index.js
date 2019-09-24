import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'custom-event-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './components/layout';
import './static/styles/main.scss';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">hello</div>
      {/* test for main layout */}
      <Main />
      {/* end test for main layout */}
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
