import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Frame from './src/frame';
import GyroscopeSensor from './src/gyroscopeFun';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggledOn: true,
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({toggledOn: false});
    }, 7000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* {this.state.toggledOn? <Frame />: <Text> The End </Text>} */}
        {/* <GyroscopeSensor /> */}
      <Frame />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
