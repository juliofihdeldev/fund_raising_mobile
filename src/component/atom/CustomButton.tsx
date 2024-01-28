import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import TextComponent from './CustomText';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  textTextColor?: string;
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  buttonStyle,
  textStyle,
  textTextColor = '#FFFFFF',
  onPress,
  ...restProps
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      {...restProps}>
      <TextComponent
        color={textTextColor}
        style={[styles.buttonText, textStyle]}>
        {title}
      </TextComponent>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
  },
});

export default CustomButton;
