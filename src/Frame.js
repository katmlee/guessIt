import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Gyroscope, ScreenOrientation} from 'expo';

const Y_AXIS_VAL = 6;
const GYRO_UPDATE_INTERVAL = 1000;
export const ROTATION_STATE = {
  INITIAL: '',
  UPDATE: 'update',
  SKIP: 'skip',
  NEXT: 'next',
};
Object.freeze(ROTATION_STATE);

class Frame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wordList: ['dog', 'cat', 'mouse', 'horse', 'wombat', 'dingo'],
      wordListIndex: 0,
      prevGyroReading: 0,
      prevMove: ROTATION_STATE.INITIAL,
      score: 0,
    };
    this.onListen = this.onListen.bind(this);
    Gyroscope.setUpdateInterval(GYRO_UPDATE_INTERVAL);
    Gyroscope.addListener((result) => {
      this.onListen(result, this.onNext, this.onSkip)
    });
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
  }

  onListen = (result) => {
    const {prevMove, prevGyroReading} = this.state;
    if (result.y >= Y_AXIS_VAL && prevGyroReading < 0 && prevMove === ROTATION_STATE.UPDATE) {
      console.log('next; ' + ' prevGyroReading=' + prevGyroReading + ' result=' + result.y);
      this.onNext();
    } else if (result.y <= -Y_AXIS_VAL && prevGyroReading > 0 && prevMove === ROTATION_STATE.UPDATE) {
      console.log('skip; ' + ' prevGyroReading=' + this.state.prevGyroReading + ' result=' + result.y);
      this.onSkip();
    } else if (Math.abs(result.y) >= Y_AXIS_VAL && prevMove !== ROTATION_STATE.UPDATE) {
      console.log('update; ' + ' prevGyroReading=' + prevGyroReading + ' result=' + result.y);
      this.setState({
        prevGyroReading: result.y,
        prevMove: ROTATION_STATE.UPDATE,
      });
    }
  };

  onSkip() {
    if(this.state.wordListIndex < this.state.wordList.length) {
      this.setState({
        prevGyroReading: 0,
        wordListIndex: this.state.wordListIndex + 1,
        prevMove: ROTATION_STATE.SKIP,
      });
    }
  }

  onNext() {
    if(this.state.wordListIndex < this.state.wordList.length) {
      this.setState({
        prevGyroReading: 0,
        wordListIndex: this.state.wordListIndex + 1,
        score: this.state.score + 1,
        prevMove: ROTATION_STATE.NEXT,
      });
    }
  }

  render() {
    const {wordList, wordListIndex} = this.state;

    let textVal = wordList[wordListIndex];
    if (wordListIndex >= wordList.length) {
      textVal = "You got " + this.state.score + "/" + this.state.wordList.length + " correct!";
    }

    return (
    <View>
      <Text style={styles.textStyle}>{textVal}</Text>
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
