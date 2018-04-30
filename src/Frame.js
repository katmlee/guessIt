import React, {Component} from 'react';
import {Gyroscope} from 'expo';
import {Text, View, StyleSheet} from 'react-native';

const Y_AXIS_VAL = 8;

class Frame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wordList: ['dog', 'cat', 'mouse', 'horse', 'wombat', 'koala', 'badger', 'fox', 'bunny', 'armadillo', 'elephant'],
      wordListIndex: 0,
      firstMove: 'empty',
      score: 0,
    };
    this.onNext = this.onNext.bind(this);
    this.onListen = this.onListen.bind(this);
    Gyroscope.setUpdateInterval(2000);
    Gyroscope.addListener((result) => {
      this.onListen(result, this.onNext, this.onSkip)
    });
  }

  onListen = (result) => {
    if (Math.abs(result.y) >= Y_AXIS_VAL && this.state.firstMove !== 'empty') {
      this.setState({firstMove: 'empty'});
    } else if (Math.abs(result.y) >= Y_AXIS_VAL) {
      this.setState({firstMove: result.y});
    }
  };

  onNext() {
    this.setState({wordListIndex: this.state.wordListIndex + 1});
    this.setState({score: this.state.score + 1});
  }

  onSkip() {
    this.setState({wordListIndex: this.state.wordListIndex + 1});
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
