import React from 'react';
import {Text} from 'react-native';
import Frame, {ROTATION_STATE} from './Frame';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('Guess It App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Frame/>);
    wrapper.setState({
      wordListIndex: 0,
      prevGyroReading: 0,
      score: 0,
      prevMove: ROTATION_STATE.INITIAL,
    })
  });

  describe('onListen', () => {
    test('should update prevGyroReading and prevMove in state when face is tipped downwards', () => {
      wrapper.instance().onListen({y: -10});
      expect(wrapper.state('prevGyroReading')).toEqual(-10);
      expect(wrapper.state('prevMove')).toEqual(ROTATION_STATE.UPDATE);
    });

    test('should not update prevGyroReading, prevMove when gyro reading is not large enough', () => {
      wrapper.instance().onListen({y: -4});
      expect(wrapper.state('prevGyroReading')).toEqual(0);
      expect(wrapper.state('prevMove')).toEqual(ROTATION_STATE.INITIAL);
    });

    test('should not update when prevMove is update and face tipped downwards', () => {
      wrapper.setState({
        prevMove: ROTATION_STATE.UPDATE,
        prevGyroReading: -10,
      });
      wrapper.instance().onListen({y: -12});
      expect(wrapper.state('prevGyroReading')).toEqual(-10);
      expect(wrapper.state('prevMove')).toEqual(ROTATION_STATE.UPDATE);
    });

    test('should update prevGyroReading, index and score in state when face is tipped downwards then upwards', () => {
      wrapper.setState({
        prevGyroReading: -10,
        prevMove: ROTATION_STATE.UPDATE,
      });
      wrapper.instance().onListen({y: 10});
      expect(wrapper.state('prevGyroReading')).toEqual(0);
      expect(wrapper.state('wordListIndex')).toEqual(1);
      expect(wrapper.state('score')).toEqual(1);
      expect(wrapper.state('prevMove')).toEqual(ROTATION_STATE.NEXT);
    });

    test('should not update state when prevMove is not update when face is tipped downwards then upwards', () => {
      wrapper.setState({
        prevGyroReading: -10,
        prevMove: ROTATION_STATE.INITIAL,
      });
      wrapper.instance().onListen({y: 10});
      expect(wrapper.state('prevGyroReading')).toEqual(10);
      expect(wrapper.state('wordListIndex')).toEqual(0);
      expect(wrapper.state('score')).toEqual(0);
      expect(wrapper.state('prevMove')).toEqual(ROTATION_STATE.UPDATE);
    });

    test('should not update state when face tipped downwards but upward tip reading is not large enough', () => {
      wrapper.setState({
        prevGyroReading: -10,
        prevMove: ROTATION_STATE.INITIAL,
      });
      wrapper.instance().onListen({y: 4});
      expect(wrapper.state('prevGyroReading')).toEqual(-10);
      expect(wrapper.state('wordListIndex')).toEqual(0);
      expect(wrapper.state('score')).toEqual(0);
      expect(wrapper.state('prevMove')).toEqual(ROTATION_STATE.INITIAL);
    });

    test('should update prevGyroReading in state when face is tipped upwards', () => {
      wrapper.instance().onListen({y: 10});
      expect(wrapper.state('prevGyroReading')).toEqual(10);
      expect(wrapper.state('prevMove')).toEqual(ROTATION_STATE.UPDATE);
    });

    test('should update prevGyroReading, index in state when face is tipped upwards then downwards', () => {
      wrapper.setState({
        prevGyroReading: 10,
        prevMove: ROTATION_STATE.UPDATE,
      });
      wrapper.instance().onListen({y: -10});
      expect(wrapper.state('prevGyroReading')).toEqual(0);
      expect(wrapper.state('wordListIndex')).toEqual(1);
      expect(wrapper.state('score')).toEqual(0);
      expect(wrapper.state('prevMove')).toEqual(ROTATION_STATE.SKIP);
    });

    test('should not update state when prevMove is not update when face is tipped downwards then upwards', () => {
      wrapper.setState({
        prevGyroReading: 10,
        prevMove: ROTATION_STATE.INITIAL,
      });
      wrapper.instance().onListen({y: -10});
      expect(wrapper.state('prevGyroReading')).toEqual(-10);
      expect(wrapper.state('wordListIndex')).toEqual(0);
      expect(wrapper.state('score')).toEqual(0);
      expect(wrapper.state('prevMove')).toEqual(ROTATION_STATE.UPDATE);
    });

    test('should not state when gyro registers 2 consecutive positive movements', () => {
      wrapper.setState({
        prevGyroReading: 10,
      });
      wrapper.instance().onListen({y: 12});
      expect(wrapper.state('prevGyroReading')).toEqual(12);
      expect(wrapper.state('wordListIndex')).toEqual(0);
      expect(wrapper.state('score')).toEqual(0);
    });

    test('should not state when gyro registers 2 consecutive negative movements', () => {
      wrapper.setState({
        prevGyroReading: -10,
      });
      wrapper.instance().onListen({y: -12});
      expect(wrapper.state('prevGyroReading')).toEqual(-12);
      expect(wrapper.state('wordListIndex')).toEqual(0);
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
