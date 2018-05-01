import React from 'react';
import {Text} from 'react-native';
import Frame from './Frame';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('Guess It App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Frame/>);
    wrapper.setState({
      wordListIndex: 0,
      prevMove: 0,
      score: 0,
    })
  });

  describe('onListen', () => {
    test('should update prevMove in state when face is tipped downwards', () => {
      wrapper.instance().onListen({y: -10});
      expect(wrapper.state('prevMove')).toEqual(-10);
    });

    test('should not update prevMove when gyro reading is not large enough', () => {
      wrapper.instance().onListen({y: -4});
      expect(wrapper.state('prevMove')).toEqual(0);
    });

    test('should update prevMove, index and score in state when face is tipped downwards then upwards', () => {
      wrapper.setState({
        prevMove: -10,
      });
      wrapper.instance().onListen({y: 10});
      expect(wrapper.state('prevMove')).toEqual(0);
      expect(wrapper.state('wordListIndex')).toEqual(1);
      expect(wrapper.state('score')).toEqual(1);
    });

    test('should not update state when face tipped downwards but upward tip reading is not large enough', () => {
      wrapper.setState({
        prevMove: -10,
      });
      wrapper.instance().onListen({y: 4});
      expect(wrapper.state('prevMove')).toEqual(-10);
      expect(wrapper.state('wordListIndex')).toEqual(0);
      expect(wrapper.state('score')).toEqual(0);
    });

    test('should update prevMove in state when face is tipped upwards', () => {
      wrapper.instance().onListen({y: 10});
      expect(wrapper.state('prevMove')).toEqual(10);
    });

    test('should update prevMove, index in state when face is tipped upwards then downwards', () => {
      wrapper.setState({
        prevMove: 10,
      });
      wrapper.instance().onListen({y: -10});
      expect(wrapper.state('prevMove')).toEqual(0);
      expect(wrapper.state('wordListIndex')).toEqual(1);
      expect(wrapper.state('score')).toEqual(0);
    });
  });

  describe('render', () => {
    test('should render correct word', () => {
      wrapper.setState({
        wordList: ['katrina', 'michael', 'jessie'],
        wordListIndex: 2,
      });
      expect(wrapper.find(Text).props().children).toEqual('jessie');
    });

    test('should render score when we have gone through all word values', () => {
      wrapper.setState({
        wordList: ['katrina', 'michael', 'jessie'],
        wordListIndex: 3,
        score: 2,
      });
      expect(wrapper.find(Text).props().children).toEqual('You got 2/3 correct!');
    })
  });
});
