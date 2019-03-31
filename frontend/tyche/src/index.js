import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './components/Dashboard';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Dashboard></Dashboard>, document.getElementById('root'));

serviceWorker.unregister();
