import React from 'react';
import {render} from '@testing-library/react-native';
import TextComponent from '../CustomText';

describe('TextComponent', () => {
  it('renders text with default styles', () => {
    const {getByText} = render(<TextComponent>Default Text</TextComponent>);
    const textElement = getByText('Default Text');

    expect(textElement).toHaveStyle({
      fontFamily: 'Montserrat-Regular',
      fontSize: 15,
      color: '#000000',
    });
  });

  it('applies custom styles', () => {
    const {getByText} = render(
      <TextComponent
        style={{marginTop: 10}}
        fontSize={20}
        color="blue"
        fontWeight="bold">
        Custom Styled Text
      </TextComponent>,
    );
    const textElement = getByText('Custom Styled Text');

    expect(textElement).toHaveStyle({
      marginTop: 10,
      fontFamily: 'Montserrat-Bold',
      fontSize: 20,
      color: 'blue',
    });
  });

  it('applies text shadow when showTextShadow is true', () => {
    const {getByText} = render(
      <TextComponent showTextShadow>Text with Shadow</TextComponent>,
    );
    const textElement = getByText('Text with Shadow');

    expect(textElement).toHaveStyle({
      textShadowColor: 'rgba(0, 0, 0, 0.99)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 5,
    });
  });
});
