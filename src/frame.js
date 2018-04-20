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
      // this.setState({gyroscopeData: result});
      // if(result.y >=6){
      //   this.onNext();
      // }
      if (Math.abs(result.y) >= Y_AXIS_VAL) {
        console.log('detected >8 movement ' + this.state.firstMove)
        if (result.y < 0) {
          this.setState({ firstMove: result.y });
          console.log(this.state.firstMove);
        } else if (this.state.firstMove < 0 && result.y > 0) {
          console.log('correct');
          console.log('Y going up ' + result.y)
          this.setState({ firstMove: 0 });
          console.log('should have reset ' + this.state.firstMove)
        }
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
