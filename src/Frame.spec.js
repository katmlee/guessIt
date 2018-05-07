import React from 'react';
import {shallow, configure} from 'enzyme';
import {Text} from 'react-native';
import Adapter from 'enzyme-adapter-react-16';
import Frame, {Y_AXIS_VAL} from './Frame';

configure({adapter: new Adapter()});

describe('Guess It App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Frame/>);
    wrapper.setState({
      wordList: ['cat', 'dog', 'koala', 'dingo', 'horse', 'monkey'],
      wordListIndex: 0,
      prevGyroReading: 0,
    });
  });

  describe('onListen', () => {
    test('should update gyroReading in state when face is tipped upwards', () => {
      wrapper.instance().onListen({y: Y_AXIS_VAL + 1});
      expect(wrapper.state('prevGyroReading')).toEqual(Y_AXIS_VAL + 1);
    });

    test('should not update gyroReading in state when face is tipped upwards, but with insufficient speed', () => {
      wrapper.instance().onListen({y: Y_AXIS_VAL - 1});
      expect(wrapper.state('prevGyroReading')).toEqual(0);
    });

    test('should update wordListIndex and reset prevGyroReading when face is tipped upwards and then down', () => {
      wrapper.setState({
        prevGyroReading: Y_AXIS_VAL + 1,
      });
      wrapper.instance().onListen({y: -(Y_AXIS_VAL + 1)});
      expect(wrapper.state('prevGyroReading')).toEqual(0);
      expect(wrapper.state('wordListIndex')).toEqual(1);
    });
  });

  describe('render', () => {
    test('should render correct word from wordList', () => {
      wrapper.setState({
        wordList: ['cat', 'dog', 'koala'],
        wordListIndex: 2,
      });
      expect(wrapper.find(Text).props().children).toEqual('koala');
    });
  });
});
