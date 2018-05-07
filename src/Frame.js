import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Gyroscope, ScreenOrientation} from 'expo';

export const Y_AXIS_VAL = 6;
const GYRO_UPDATE_INTERVAL = 1000;

class Frame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wordList: ['cat', 'dog', 'koala', 'dingo', 'horse', 'monkey'],
      wordListIndex: 0,
      prevGyroReading: 0,
      score: 0,
    };
    this.onListen = this.onListen.bind(this);
    Gyroscope.setUpdateInterval(GYRO_UPDATE_INTERVAL);
    Gyroscope.addListener((result) => {
      this.onListen(result)
    });
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
  }

  onListen = (result) => {
    if (this.state.prevGyroReading >= Y_AXIS_VAL && result.y <= -Y_AXIS_VAL) {
      console.log('skip');
      this.onSkip();
    } else if (this.state.prevGyroReading <= -Y_AXIS_VAL && result.y >= Y_AXIS_VAL) {
      console.log('next, score = ' + this.state.score);
      this.onNext();
    } else if (Math.abs(result.y) >= Y_AXIS_VAL) {
      console.log('update');
      this.setState({prevGyroReading: result.y});
    }
  };

  onSkip() {
    this.setState({
      wordListIndex: this.state.wordListIndex + 1,
      prevGyroReading: 0,
    });
  }

  onNext() {
    this.setState({
      wordListIndex: this.state.wordListIndex + 1,
      prevGyroReading: 0,
      score: this.state.score + 1,
    });
  }

  render() {
    const {wordList, wordListIndex} = this.state;
    return (
    <View>
      <Text style={styles.textStyle}>{wordList[wordListIndex]}</Text>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 60,
  }
});

export default Frame;
