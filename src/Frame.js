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
    };
    this.onListen = this.onListen.bind(this);
    Gyroscope.setUpdateInterval(GYRO_UPDATE_INTERVAL);
    Gyroscope.addListener((result) => {
      this.onListen(result)
    });
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
  }

  onListen = (result) => {
    if(this.state.prevGyroReading >= Y_AXIS_VAL && result.y <= -Y_AXIS_VAL) {
      this.setState({
        wordListIndex: this.state.wordListIndex + 1,
        prevGyroReading: 0,
      });
    } else if (Math.abs(result.y) >= Y_AXIS_VAL) {
      this.setState({prevGyroReading: result.y});
    }
  };

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
