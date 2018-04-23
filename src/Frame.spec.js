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
    test('should have been called when device is tipped down', () => {
      wrapper = shallow(<Frame/>);
      wrapper.instance().onListen({y: 42});
      wrapper.update();
      expect(wrapper.find(Text).props().children).toContain('Word');
    });
  });
});
