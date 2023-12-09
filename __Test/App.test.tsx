/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Build from '../src/screens/Build';
import {act} from 'react-native-testing-library';

test('renders correctly test with act', async () => {
  act(() => {
    renderer.create(<Build />);
  });
  // ... rest of the test
});
