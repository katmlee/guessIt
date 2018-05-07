import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Gyroscope, ScreenOrientation} from 'expo';

export const Y_AXIS_VAL = 6;
const GYRO_UPDATE_INTERVAL = 1000;

class Frame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gyroReading: 0,
    };
    this.onListen = this.onListen.bind(this);
    Gyroscope.setUpdateInterval(GYRO_UPDATE_INTERVAL);
    Gyroscope.addListener((result) => {
      this.onListen(result)
    });
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
  }

  onListen = (result) => {
    if (result.y >= Y_AXIS_VAL) {
      this.setState({gyroReading: result.y});
      console.log('tipped upwards');
    }
  };

  render() {
    return (
    <View>
      <Text style={styles.textStyle}>GuessIt</Text>
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
