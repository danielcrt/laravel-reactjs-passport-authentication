import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from '../helpers';
import Application from './Application';

render(
    <Provider store={store}>
        <Application />
    </Provider>,
    document.getElementById('app')
);