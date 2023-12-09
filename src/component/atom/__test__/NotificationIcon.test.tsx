import React from 'react';
import {render} from '@testing-library/react-native';
import NotificationIcon from '../NotificationIcon';

describe('NotificationIcon Component', () => {
  it('renders without crashing', () => {
    const {getByTestId} = render(<NotificationIcon />);
    const iconContainer = getByTestId('notification-icon-container');
    expect(iconContainer).toBeTruthy();
  });

  it('renders the default icon', () => {
    const {getByTestId} = render(<NotificationIcon />);
    const defaultIcon = getByTestId('default-icon');
    expect(defaultIcon).toBeTruthy();
  });

  it('renders the count badge when count is greater than 0', () => {
    const {getByTestId} = render(<NotificationIcon count={5} />);
    const badgeContainer = getByTestId('badge-container');
    const badgeText = getByTestId('badge-text');

    expect(badgeContainer).toBeTruthy();
    expect(badgeText).toHaveTextContent('5');
  });

  it('does not render the count badge when count is 0', () => {
    const {queryByTestId} = render(<NotificationIcon count={0} />);
    const badgeContainer = queryByTestId('badge-container');
    const badgeText = queryByTestId('badge-text');

    expect(badgeContainer).toBeNull();
    expect(badgeText).toBeNull();
  });

  it('applies custom styles', () => {
    const {getByTestId} = render(
      <NotificationIcon style={{backgroundColor: 'blue'}} />,
    );
    const iconContainer = getByTestId('notification-icon-container');

    expect(iconContainer).toHaveStyle({
      backgroundColor: 'blue',
    });
  });
});
