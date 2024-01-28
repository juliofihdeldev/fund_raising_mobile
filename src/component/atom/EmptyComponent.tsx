import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';

interface EmptyComponentProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const EmptyComponent: React.FC<EmptyComponentProps> = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EmptyComponent;
