import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Login from '../Login';
import {AuthContext, AuthContextProvider} from '../../../context/AuthContext';
import {NavigationContainer} from '@react-navigation/native';

describe('Login Component', () => {
  it('renders without crashing', () => {
    render(<Login navigation={{navigate: jest.fn()}} />);
  });

  it('renders correctly', () => {
    const {getByText} = render(<Login />);
    // Check if the text elements are rendered
    expect(
      getByText('Fè byen jodi a la nati ap remet ou sa demen'),
    ).toBeTruthy();
    expect(
      getByText(
        'Ann mete dekote yon 100 Goud pou moun yo ki ka nan plus bezwen pase n.',
      ),
    ).toBeTruthy();
    expect(getByText('Sign Up with Phone Number')).toBeTruthy();
    expect(getByText('Continue without an account')).toBeTruthy();
  });

  it('renders correctly with default props', () => {
    const {getByText} = render(<Login />);
    const button = getByText('Sign Up with Phone Number');
    expect(button).toBeTruthy();
  });

  it('navigates on button press', () => {
    const {getByText} = render(<Login navigation={{navigate: jest.fn()}} />);

    const phoneButton = getByText('Sign Up with Phone Number');
    const googleButton = getByText('Continue without an account');

    fireEvent.press(phoneButton);
    fireEvent.press(googleButton);

    expect(phoneButton).toBeTruthy();
    expect(googleButton).toBeTruthy();
    expect(phoneButton).toBeEnabled();
  });

  it('navigates to PhoneLogin when "Sign Up with Phone Number" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(<Login navigation={navigationMock} />);

    const signUpButton = getByText('Sign Up with Phone Number');
    fireEvent.press(signUpButton);

    expect(navigationMock.navigate).toHaveBeenCalledWith('PhoneLogin');
  });

  it('navigates to PhoneLogin when "Continue without an account" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(<Login navigation={navigationMock} />);

    const continueButton = getByText('Continue without an account');
    fireEvent.press(continueButton);

    expect(navigationMock.navigate).toHaveBeenCalledWith('PhoneLogin');
  });
});
