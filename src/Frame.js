import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Gyroscope, ScreenOrientation} from 'expo';

const Y_AXIS_VAL = 6;
const GYRO_UPDATE_INTERVAL = 1000;

class Frame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gyroState: {x: 0, y: 0, z: 0},
    };
    this.onListen = this.onListen.bind(this);
    Gyroscope.setUpdateInterval(GYRO_UPDATE_INTERVAL);
    Gyroscope.addListener((result) => {
      this.onListen(result)
    });
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
  }

  onListen = (result) => {
    this.setState({gyroState: result});
  };

  round = (n) => {
    if (!n) {
      return 0;
    }
    return Math.floor(n * 100) / 100;
  };

  render() {
    const {x, y, z} = this.state.gyroState;
    return (
    <View>
      <Text style={styles.textStyle}>x: {this.round(x)}</Text>
      <Text style={styles.textStyle}>y: {this.round(y)}</Text>
      <Text style={styles.textStyle}>z: {this.round(z)}</Text>
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
