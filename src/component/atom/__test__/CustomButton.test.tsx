import 'react-native';
import React from 'react';
import {it} from '@jest/globals';

import {render, fireEvent} from 'react-native-testing-library';
import CustomButton from '../CustomButton';

describe('CustomButton', () => {
  it('renders correctly with default props', () => {
    const {getByText} = render(<CustomButton title="Default Button" />);
    const button = getByText('Default Button');
    expect(button).toBeTruthy();
  });

  it('calls onPress function when clicked', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <CustomButton title="Click Me" onPress={onPress} />,
    );
    const button = getByText('Click Me');
    fireEvent.press(button);
    expect(onPress).toHaveBeenCalled();
  });

  it('renders correctly with different size', () => {
    const {getByText} = render(
      <CustomButton title="Small Button" size="small" />,
    );

    const button = getByText('Small Button');

    expect(button).toBeTruthy();
  });
});
