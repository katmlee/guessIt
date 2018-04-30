import React from 'react';
import {Text} from 'react-native';
import Frame from './Frame';
import {shallow, configure} from 'enzyme';
import {Gyroscope} from 'expo';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// jest.mock('expo', () => ({
//   Gyroscope: {
//     addListener: jest.fn(),
//     setUpdateInterval: jest.fn(),
//   }
// }));

describe('Guess It App', () => {
  let wrapper;

  describe('#onListen', () => {
    test('should update state when face is tipped downwards', () => {
      wrapper = shallow(<Frame/>);
      wrapper.instance().onListen({y: -10});
      wrapper.update();
      expect(wrapper.state('firstMove')).toEqual(-10);
    });

    test('should update state when face is tipped upwards', () => {
      wrapper = shallow(<Frame/>);
      wrapper.instance().onListen({y: 10});
      wrapper.update();
      expect(wrapper.state('firstMove')).toEqual(10);
    });

    test('should reset the state when face is tipped down then up', () => {
      wrapper = shallow(<Frame/>);
      wrapper.setState({firstMove: -10});
      wrapper.instance().onListen({y: 10});
      wrapper.update();
      expect(wrapper.state('firstMove')).toEqual('empty');
    });

    test('should reset the state when face is tipped up then down', () => {
      wrapper = shallow(<Frame/>);
      wrapper.setState({firstMove: 10});
      wrapper.instance().onListen({y: 10});
      wrapper.update();
      expect(wrapper.state('firstMove')).toEqual('empty');
    })
  });
});
