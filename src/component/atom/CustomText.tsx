import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
  TextStyle,
} from 'react-native';

interface TextProps extends RNTextProps {
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  fontWeight?: 'normal' | 'bold' | '600' | '700';
  showTextShadow?: boolean;
  style?: TextStyle;
}

const TextComponent: React.FC<TextProps> = ({
  fontSize,
  color,
  fontWeight,
  showTextShadow = false,
  style,
  fontFamily = fontWeight ? 'Montserrat-Bold' : 'Montserrat-Regular',
  ...restProps
}) => {
  const textStyle: TextStyle = {
    fontFamily: fontFamily,
    fontSize: fontSize || 15, // Default font size is 16 if not specified
    color: color || '#000000', // Default text color is black if not specified
  };

  return (
    <RNText
      style={[showTextShadow ? styles.textWithShadow : style, textStyle]}
      {...restProps}
    />
  );
};

const styles = StyleSheet.create({
  textWithShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});

export default TextComponent;
