// import '@testing-library/jest-native/extend-expect'; // Import the matchers

import React from 'react';
import {render} from 'react-native-testing-library';
import CustomProgressBar from '../CustomProgressBar';

describe('CustomProgressBar', () => {
  it('renders the progress bar with the correct value', () => {
    const {getByTestId} = render(<CustomProgressBar value={50} />);

    // Find the container for the progress bar and its value
    const containerValue = getByTestId('container-value');

    // Check if the width of the value container is correct
    expect(containerValue).toHaveStyle({width: '50%'});
  });

  it('limits the progress bar to 100%', () => {
    const {getByTestId} = render(<CustomProgressBar value={120} />);

    // Find the container for the progress bar and its value
    const containerValue = getByTestId('container-value');

    // Check if the width of the value container is limited to 100%
    expect(containerValue).toHaveStyle({width: '100%'});
  });
});
