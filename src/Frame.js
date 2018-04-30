import React, {Component} from 'react';
import {Gyroscope} from 'expo';
import {Text, View} from 'react-native';

const Y_AXIS_VAL = 8;
const WORD_LIST = ['dog', 'cat', 'mouse', 'horse', 'wombat', 'koala', 'badger', 'fox', 'bunny', 'armadillo', 'elephant'];

class Frame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wordListIndex: 0,
      firstMove: 'empty',
      score: 0,
    };
    this.onNext = this.onNext.bind(this);
    this.round = this.round.bind(this);
    this.onListen = this.onListen.bind(this);
    Gyroscope.setUpdateInterval(2000);
    Gyroscope.addListener((result) => {
      this.onListen(result)
    });
  }

  onListen = (result) => {
    if(Math.abs(result.y) >= Y_AXIS_VAL && this.state.firstMove !== 'empty') {
      this.setState({firstMove: 'empty'});
    } else if(Math.abs(result.y) >= Y_AXIS_VAL) {
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
    return (
    <View>
      <Text>{WORD_LIST[this.state.wordListIndex]}</Text>
    </View>
    )
  }
}

export default Frame;
