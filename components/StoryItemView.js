// @flow
'use strict';

import React from 'react'
import { 
  TouchableHighlight, 
  Text, 
  View,
  StyleSheet
} from 'react-native'

export class StoryItemView extends React.Component {
  pluralizedPointsText(points: string, by: string): string {
    var pointString;
    if (points == 1) {
      pointString = "point";
    } else {
      pointString = "points";
    }
    return `${points} ${pointString} by ${by}`;
  }

  pluralizedComments(count: string): string {
    var commentString
    if (count == 1) {
      commentString = "comment";
    } else {
      commentString = "comments";
    }
    return `${count} ${commentString}`;
  }

  render() {
    let item = this.props.story;

    return (
      <TouchableHighlight>
        <View style={styles.container}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.link}>{item.url}</Text>
          <Text style={styles.subtext}>{this.pluralizedPointsText(item.score, item.by)}</Text>
          <Text style={styles.subtext}>{this.pluralizedComments(item.descendants)}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  story: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  link: {
    color: 'blue',
    marginTop: 4,
    fontSize: 12,
  },
  subtext: {
    color: 'gray',
    fontSize: 12,
    marginTop: 3,
  },
});
