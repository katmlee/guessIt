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
      firstMove: 'empty',
      score: 0,
    })
  });

  describe('onListen', () => {
    test('should update state when face is tipped downwards', () => {
      wrapper.instance().onListen({y: -10});
      expect(wrapper.state('firstMove')).toEqual(-10);
    });

    test('should update state when face is tipped upwards', () => {
      wrapper.instance().onListen({y: 10});
      expect(wrapper.state('firstMove')).toEqual(10);
    });

    test('should reset the state when face is tipped down then up', () => {
      wrapper.setState({firstMove: -10});
      wrapper.instance().onListen({y: 10});
      expect(wrapper.state('firstMove')).toEqual('empty');
    });

    test('should reset the state when face is tipped up then down', () => {
      wrapper.setState({firstMove: 10});
      wrapper.instance().onListen({y: 10});
      expect(wrapper.state('firstMove')).toEqual('empty');
    })
  });

  describe('onNext', () => {
    test('should update word and score', () => {
      wrapper.instance().onNext();
      expect(wrapper.state('wordListIndex')).toEqual(1);
      expect(wrapper.state('score')).toEqual(1);
    });
  });

  describe('onSkip', () => {
    test('should update word but not the score', () => {
      wrapper.instance().onSkip();
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
