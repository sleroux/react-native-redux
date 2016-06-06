// @flow
'use strict';

import Firebase from 'firebase'
import type { Thunk } from 'redux-thunk'
import type { Action } from 'redux'

import type { StoryItem } from '../types'

let FIREBASE_API_URL = "https://hacker-news.firebaseio.com/v0";
let api = new Firebase(FIREBASE_API_URL);

export const INVALIDATE_STORIES = 'INVALIDATE_STORIES';
export function invalidateStories(): Action {
  return {
    type: INVALIDATE_STORIES
  }
}

export const REQUEST_STORIES = 'REQUEST_STORIES';
export function requestStories(): Action {
  return {
    type: REQUEST_STORIES
  }
}

export const RECEIVE_STORIES = 'RECEIVE_STORIES';
export function receiveStories(stories: [StoryItem]): Action {
  return {
    type: RECEIVE_STORIES,
    stories: stories,
    receivedAt: Date.now()
  }
}

async function fetchStory(storyID: number): Promise<StoryItem> {
  return (await api.child('item').child(storyID).once('value')).val();
}

async function fetchTopStoryIDs(): Promise<[number]> {
  return (await api.child('topstories').limitToFirst(60).once("value")).val();
}

function fetchStoryItemsForIDs(storyIDs: [number]): Promise<[StoryItem]> {
  return Promise.all(storyIDs.map(fetchStory));
}

function shouldFetchStories(state): boolean {
  let items = state.items;
  if (!items) {
    return true;
  } else if (state.isFetching) {
    return false;
  } else {
    return state.didInvalidate;
  }
}

function fetchTopStoryItems(): Thunk {
  return async dispatch => {
    dispatch(requestStories());
    let topStoryIDs = await fetchTopStoryIDs()
    let topStoryItems = await fetchStoryItemsForIDs(topStoryIDs);
    dispatch(receiveStories(topStoryItems));
  };
}

export function fetchTopStoryItemsIfNeeded(): Thunk {
  return (dispatch, getState) => {
    if (shouldFetchStories(getState())) {
      return dispatch(fetchTopStoryItems()); 
    } else {
      Promise.resolve()
    }
  };
}

