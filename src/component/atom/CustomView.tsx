import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';

interface CustomViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  orientation?: 'horizontal' | 'vertical';
}

const CustomView: React.FC<CustomViewProps> = ({
  children,
  style,
  orientation,
}) => {
  return (
    <View
      style={[
        styles.container,
        style,
        {
          flexDirection: orientation === 'horizontal' ? 'row' : 'column',
        },
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomView;
