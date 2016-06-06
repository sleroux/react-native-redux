// @flow
'use strict';

import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native'

import { StoryItemView } from './StoryItemView'
import type { StoryItem } from '../js/types'

type StoryListProps = {
  stories: [StoryItem],
  isFetching: boolean,
  didInvalidate: boolean
};

export default class StoryListView extends React.Component {
  state: {
    dataSource: ListView.DataSource
  };

  constructor(props: StoryListProps) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentDidMount() {
    this.props.fetchStories();
  }

  componentWillReceiveProps(nextProps: StoryListProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.stories)
    });
  }

  renderStory(story: StoryItem) {
    return (
      <StoryItemView story={story} navigator={this.props.navigator} />
    );
  }

  render() {
    return (
      <ListView 
        dataSource={this.state.dataSource}
        renderRow={this.renderStory.bind(this)}
        enableEmptySections={true}
        style={styles.listView} />
    );
  }
}

const styles = StyleSheet.create({
  listView: {
    flex: 1,
  }
});

