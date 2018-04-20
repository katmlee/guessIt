import React, { Component } from 'react';
import {
  Gyroscope,
} from 'expo';
import { Text, View, Button } from 'react-native';

class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: 'rat',
      help: 'blah',
      array: ['dog', 'cat', 'mouse', 'horse', 'wombat', 'koala', 'badger', 'fox','bunny', 'armadillo', 'elephant'],
      gyroscopeData: {},
    }
    this.onNext = this.onNext.bind(this);
    this.round = this.round.bind(this);
    Gyroscope.setUpdateInterval(2000);
    Gyroscope.addListener((result) => {
      this.setState({gyroscopeData: result});
      if(result.y >=6){
        this.onNext();
      }
    });
  }

  onNext() {
    console.log('I am here');
    this.setState({help: 'im herreeeee'});
    newArray= this.state.array;
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
    let { x, y, z } = this.state.gyroscopeData;
    return (
      <View>
      <Text>X:{this.round(x)} </Text>
      <Text>Y:{this.round(y)} </Text>
      <Text>Z:{this.round(z)} </Text>
        <Text>{this.state.word}</Text>
      </View>
    )}
}


export default Frame;
