// @flow
'use strict';

import React from 'react'
import {
  AppRegistry,
} from 'react-native';
import { 
  Provider,
} from 'react-redux'

import type { State } from 'react-native'

import HackerNewsApp  from './HackerNewsApp'
import configureStore from './store/configureStore'

const store = configureStore();

class Root extends React.Component {
  state: State;

  render() {
    return (
      <Provider store={store}>
        <HackerNewsApp />
      </Provider>
    );
  }
}

export function setup() {
  return Root;
}
