import React from 'react';
import Frame from './Frame';
import { shallow } from 'enzyme';
import { Gyroscope } from 'expo';

describe('Guess It App', () => {
  let wrapper;

  describe('#downwardMovement', () => {
    test('should have been called when device is tipped down', () => {
      jest.mock('expo', () => ({
        Gyroscope: jest.fn(),
      }))
      // Gyroscope.mockReturnValueOnce(true);
      // jest.mock('Gyroscope', () => ({
      //   addListener: jest.fn(() => {return 1})
      // }));
      // wrapper = shallow(<Frame />);
      // expect(wrapper.find(Text).toContain('Word'));
    });
  });
});
