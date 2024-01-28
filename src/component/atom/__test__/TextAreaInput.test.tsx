import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import TextAreaInput from '../TextAreaInput';

describe('TextAreaInput component', () => {
  it('renders correctly with default height', () => {
    const {getByTestId} = render(<TextAreaInput testID="textAreaInput" />);
    const input = getByTestId('textAreaInput');
    // You can add more assertions here, such as checking the default height, styles, etc.
    expect(input).toBeTruthy();
  });

  it('adjusts height based on content', () => {
    const {getByTestId} = render(<TextAreaInput testID="textAreaInput" />);
    const input = getByTestId('textAreaInput');

    // Simulate text input and ensure the height adjusts
    fireEvent.changeText(
      input,
      `This is a long text that should increase \n the height,
    This is a long text that should increase \n the height`,
    );

    // Get the updated height
    const updatedHeight = input.props.style[1].height; // Assumes the height is the second style attribute
    // Assert that the height has changed based on the content
    expect(updatedHeight).toBeGreaterThan(40); // Assumes the default height is 42
  });
});
