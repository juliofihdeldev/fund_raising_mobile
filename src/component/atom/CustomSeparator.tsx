import React from 'react';
import {View, ViewStyle, StyleSheet, StyleProp} from 'react-native';

import TextComponent from './CustomText';

interface SeparatorType {
  style?: StyleProp<ViewStyle>;
}

const CustomSeparator: React.FC<SeparatorType> = ({style}) => {
  return (
    <View style={[styles.bar, style]}>
      <TextComponent fontSize={16} color="#333" fontWeight="bold" />
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    width: 'auto',
    backgroundColor: '#eee',
    height: 1,
    marginTop: 12,
    marginBottom: 12,
  },
});

export default CustomSeparator;
