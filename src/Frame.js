import React, {Component} from 'react';
import {Gyroscope} from 'expo';
import {Text, View} from 'react-native';

const Y_AXIS_VAL = 8;

class Frame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      word: 'rat',
      help: 'blah',
      array: ['dog', 'cat', 'mouse', 'horse', 'wombat', 'koala', 'badger', 'fox', 'bunny', 'armadillo', 'elephant'],
      gyroscopeData: {},
      firstMove: 'empty'
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
    console.log('I am here');
    this.setState({help: 'im herreeeee'});
    newArray = this.state.array;
    newArray.shift();
    this.setState({
      word: this.state.array[0],
      array: newArray,
    })
  }

  round(n) {
    if (!n) {
      return 0;
    }

    return Math.floor(n * 100) / 100;
  }

  render() {
    return (
    <View>
      <Text>{this.state.word}</Text>
    </View>
    )
  }
}

export default Frame;
