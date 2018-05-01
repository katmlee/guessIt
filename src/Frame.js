import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Gyroscope, ScreenOrientation} from 'expo';

const Y_AXIS_VAL = 9;
const GYRO_UPDATE_INTERVAL = 2000;

class Frame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wordList: ['dog', 'cat', 'mouse', 'horse', 'wombat', 'dingo'],
      wordListIndex: 0,
      prevMove: 0,
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
    if (result.y >= Y_AXIS_VAL && this.state.prevMove !== 0) {
      console.log('next');
      this.onNext();
    } else if(result.y <= -Y_AXIS_VAL && this.state.prevMove !== 0) {
      console.log('skip');
      this.onSkip();
    } else if (Math.abs(result.y) >= Y_AXIS_VAL) {
      this.setState({prevMove: result.y});
    }
  };

  onSkip() {
    this.setState({
      prevMove: 0,
      wordListIndex: this.state.wordListIndex + 1,
    });
  }

  onNext() {
    this.setState({
      prevMove: 0,
      wordListIndex: this.state.wordListIndex + 1,
      score: this.state.score + 1,
    });
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
