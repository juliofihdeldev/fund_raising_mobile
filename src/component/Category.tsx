import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import TextComponent from './atom/CustomText';

interface CategoryIconProps {
  style?: StyleProp<ViewStyle>;
  styleContainer: StyleProp<ViewStyle>;
  iconName: string;
  iconSize: number;
  title: string;
  onPress: () => void;
  color?: string;
  fontSize?: number;
}

const Category: React.FC<CategoryIconProps> = ({
  style,
  styleContainer,
  iconName,
  title = '',
  iconSize = 24,
  color = '#333',
  fontSize = 13,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styleContainer}>
      <View style={[styles.baseStyleContainer, style]}>
        <Ionicons name={iconName} color={color} size={iconSize} />
      </View>
      <TextComponent fontSize={fontSize} style={styles.categoryTitle}>
        {title}
      </TextComponent>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseStyleContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  categoryTitle: {
    textAlign: 'center',
    fontSize: 12,
    color: '#000000',
  },
});

export default Category;
