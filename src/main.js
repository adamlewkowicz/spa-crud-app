import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { App, AppWithHMR } from './App';
import firebase from 'firebase';
import firebaseConfig from './config/firebase';
import { Provider } from 'react-redux';
import { configureStore } from './store/store';
import axios from 'axios';
import { HOST } from './common/consts';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pl';

const store = configureStore();

axios.defaults.baseURL = HOST;
axios.defaults.withCredentials = true;

firebase.initializeApp(firebaseConfig);

dayjs.locale('pl');
dayjs.extend(relativeTime);

ReactDOM.render((
  <Provider store={store}>
    <AppWithHMR />
  </Provider>
), document.getElementById('app'));