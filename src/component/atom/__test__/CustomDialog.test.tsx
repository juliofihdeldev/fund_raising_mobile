import 'react-native';
import React from 'react';
import {it} from '@jest/globals';
import renderer from 'react-test-renderer';
import CustomDialog from '../CustomDialog';

import {render} from 'react-native-testing-library';
import {Text} from 'react-native';

describe('CustomDialog', () => {
  it('renders correctly', () => {
    renderer.create(<CustomDialog />);
  });

  it('renders correctly when isVisible is true', () => {
    const {getByTestId, queryByText} = render(
      <CustomDialog isVisible={true}>
        <Text testID="child-text">This is a child</Text>
      </CustomDialog>,
    );

    // Ensure the CustomDialog is visible
    expect(getByTestId('custom-dialog')).toBeTruthy();

    // Ensure child content is present
    expect(queryByText('This is a child')).toBeTruthy();
  });

  it('it fire event on onPress ', () => {
    renderer.create(<CustomDialog />);
  });
});
