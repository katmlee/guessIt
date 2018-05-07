import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Frame, {Y_AXIS_VAL} from './Frame';

configure({adapter: new Adapter()});

describe('Guess It App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Frame/>);
    wrapper.setState({
      gyroReading: 0
    });
  });

  describe('Frame', () => {
    test('should update gyroReading in state when face is tipped upwards', () => {
      wrapper.instance().onListen({y: Y_AXIS_VAL + 1});
      expect(wrapper.state('gyroReading')).toEqual(Y_AXIS_VAL + 1);
    });

    test('should not update gyroReading in state when face is tipped upwards, but with insufficient speed',  () => {
      wrapper.instance().onListen({y: Y_AXIS_VAL - 1});
      expect(wrapper.state('gyroReading')).toEqual(0);
    });
  })
});
