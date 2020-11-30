/**
 * @format
 */
import React from "react"
import {AppRegistry} from 'react-native';
import App from './src/App.js';
import {name as appName} from './app.json';
import reducers from "./src/reducers"
import {Provider} from "react-redux"

import {createStore} from "redux"

const store = createStore(reducers)
const Application = () => <Provider store={store}>
    <App />
</Provider>

AppRegistry.registerComponent(appName, () => Application);
