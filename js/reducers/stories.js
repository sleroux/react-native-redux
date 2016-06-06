// @flow
'use strict';

import type { State, Action } from 'react-native'

import {
  INVALIDATE_STORIES,
  REQUEST_STORIES,
  RECEIVE_STORIES,
} from '../actions/stories'

export default function stories(state: State = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action: Action): State {
  switch (action.type) {
    case INVALIDATE_STORIES:
      return {...state, 
        isFetching: true, 
        didInvalidate: true
      };
    case REQUEST_STORIES:
      return {...state, 
        isFetching: true, 
        didInvalidate: false
      };
    case RECEIVE_STORIES:
      return {...state, 
        isFetching: false,
        didInvalidate: false,
        items: action.stories,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}
