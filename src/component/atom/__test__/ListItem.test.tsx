import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import ListItem from '../ListItem';

describe('ListItem Component', () => {
  it('renders without crashing', () => {
    render(<ListItem text="List Item" icon="test-icon" />);
    const listItemContainer = screen.getByTestId('list-item-container');
    expect(listItemContainer).toBeTruthy();
  });

  it('renders text and icon correctly', () => {
    render(<ListItem text="List Item" icon="chevron-forward-outline" />);
    const textElement = screen.getByText('List Item');
    const iconElement = screen.getByTestId('list-item-icon');

    expect(textElement).toBeTruthy();
    expect(iconElement).toBeTruthy();
  });

  it('invokes onPress callback when pressed', () => {
    const onPressMock = jest.fn();
    render(
      <ListItem
        text="List Item"
        icon="chevron-forward-outline"
        onPress={onPressMock}
      />,
    );
    const listItemContainer = screen.getByTestId('list-item-container');

    fireEvent.press(listItemContainer);

    expect(onPressMock).toHaveBeenCalled();
  });

  it('applies custom styles', () => {
    render(
      <ListItem
        text="Styled List Item"
        icon="chevron-forward-outline"
        fontSize={20}
        color="blue"
        containerStyle={{backgroundColor: 'red'}}
        iconStyle={{marginRight: 10}}
      />,
    );
    const listItemContainer = screen.getByTestId('list-item-container');

    expect(listItemContainer).toHaveStyle({
      backgroundColor: 'red',
    });

    const textElement = screen.getByText('Styled List Item');
    const iconElement = screen.getByTestId('list-item-icon');
    expect(textElement).toHaveStyle({
      fontSize: 20,
      color: 'blue',
    });
    expect(iconElement).toHaveStyle({
      marginRight: 10,
    });
  });
});
