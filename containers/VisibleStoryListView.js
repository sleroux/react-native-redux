// @flow
'use strict';

import { connect } from 'react-redux'

import StoryListView from '../components/StoryListView'
import { fetchTopStoryItemsIfNeeded } from '../js/actions/stories'

const mapStateToProps = (state) => {
  return {
    stories: state.stories.items,
    isFetching: state.stories.isFetching,
    didInvalidate: state.stories.didInvalidate
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStories: () => {
      dispatch(fetchTopStoryItemsIfNeeded()) 
    }
  };
}

export const VisibleStoryListView = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryListView)

