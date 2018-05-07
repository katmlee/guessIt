import React from 'react';
import {shallow, configure} from 'enzyme';
import {Text} from 'react-native';
import Adapter from 'enzyme-adapter-react-16';
import Frame, {Y_AXIS_VAL, ROTATION_STATE} from './Frame';

configure({adapter: new Adapter()});

describe('Guess It App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Frame/>);
    wrapper.setState({
      wordList: ['cat', 'dog', 'koala', 'dingo', 'horse', 'monkey'],
      wordListIndex: 0,
      prevGyroReading: 0,
      score: 0,
      prevRotation: ROTATION_STATE.INITIAL,
    });
  });

  describe('onListen', () => {
    test('should update gyroReading in state when face is tipped upwards', () => {
      wrapper.instance().onListen({y: Y_AXIS_VAL + 1});
      expect(wrapper.state('prevGyroReading')).toEqual(Y_AXIS_VAL + 1);
      expect(wrapper.state('prevRotation')).toEqual(ROTATION_STATE.UPDATE);
    });

    test('should not update gyroReading in state when face is tipped upwards, but with insufficient speed', () => {
      wrapper.instance().onListen({y: Y_AXIS_VAL - 1});
      expect(wrapper.state('prevGyroReading')).toEqual(0);
      expect(wrapper.state('prevRotation')).toEqual(ROTATION_STATE.INITIAL);
    });

    test('should not update gyroReading in state when face is tipped upwards and prevRotation is update', () => {
      wrapper.setState({
        prevRotation: ROTATION_STATE.UPDATE,
      });
      wrapper.instance().onListen({y: Y_AXIS_VAL - 1});
      expect(wrapper.state('prevGyroReading')).toEqual(0);
      expect(wrapper.state('prevRotation')).toEqual(ROTATION_STATE.UPDATE);
    });

    test('should onSkip when face is tipped upwards and then down and prevRotation is UPDATE', () => {
      wrapper.setState({
        prevGyroReading: Y_AXIS_VAL + 1,
        prevRotation: ROTATION_STATE.UPDATE,
      });
      wrapper.instance().onListen({y: -(Y_AXIS_VAL + 1)});
      expect(wrapper.state('prevGyroReading')).toEqual(0);
      expect(wrapper.state('wordListIndex')).toEqual(1);
      expect(wrapper.state('score')).toEqual(0);
      expect(wrapper.state('prevRotation')).toEqual(ROTATION_STATE.SKIP);
    });

    test('should not onSkip when face is tipped upwards and then down and prevRotation is not UPDATE', () => {
      wrapper.setState({
        prevGyroReading: Y_AXIS_VAL + 1,
        prevRotation: ROTATION_STATE.SKIP,
      });
      wrapper.instance().onListen({y: -(Y_AXIS_VAL + 1)});
      expect(wrapper.state('prevRotation')).toEqual(ROTATION_STATE.UPDATE);
    });

    test('should onNext when face is tipped downwards then up', () => {
      wrapper.setState({
        prevGyroReading: -(Y_AXIS_VAL + 1),
        prevRotation: ROTATION_STATE.UPDATE,
      });
      wrapper.instance().onListen({y: Y_AXIS_VAL + 1});
      expect(wrapper.state('prevGyroReading')).toEqual(0);
      expect(wrapper.state('wordListIndex')).toEqual(1);
      expect(wrapper.state('score')).toEqual(1);
      expect(wrapper.state('prevRotation')).toEqual(ROTATION_STATE.NEXT);
    });

    test('should not onNext when face is tipped downwards then up and prevRotation is not UPDATE', () => {
      wrapper.setState({
        prevGyroReading: -(Y_AXIS_VAL + 1),
        prevRotation: ROTATION_STATE.NEXT,
      });
      wrapper.instance().onListen({y: Y_AXIS_VAL + 1});
      expect(wrapper.state('prevRotation')).toEqual(ROTATION_STATE.UPDATE);
    });

    test('should not update score if we have reached the end of the word list', () => {
      wrapper.setState({
        prevGyroReading: -(Y_AXIS_VAL + 1),
        wordList: ['cat', 'dog', 'koala', 'dingo', 'horse', 'monkey'],
        wordListIndex: 6,
        score: 2,
      });
      wrapper.instance().onListen({y: Y_AXIS_VAL + 1});
      expect(wrapper.state('score')).toEqual(2);
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

    test('should render score when reach the end of the word list', () => {
      wrapper.setState({
        wordList: ['cat', 'dog', 'koala', 'monkey'],
        wordListIndex: 4,
        score: 2,
      });
      expect(wrapper.find(Text).props().children).toEqual('You got 2/4 correct!');
    });
  });
});
