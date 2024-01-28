import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
} from 'react-native';
import TextComponent from './CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color} from '../../assets/GlobalStyles';

interface ListItemType {
  onPress?: () => void;
  text: string;
  icon: string;
  fontSize?: number;
  color?: string;
  fontWeight?: 'normal' | 'bold';
  containerStyle?: ViewStyle;
  iconStyle?: TextStyle;
}

interface IoniconsProps {
  name: 'checkmark' | 'close' | 'chevron-forward-outline'; // Add more valid names as needed
  size: number;
  color: string;
  style?: TextStyle;
}

const ListItem: React.FC<ListItemType> = ({
  onPress,
  text,
  icon = 'thunderstorm-outline',
  fontSize = 17,
  color = Color.black,
  containerStyle,
  iconStyle,
  fontWeight = 'normal',
}) => {
  return (
    <TouchableOpacity
      testID="list-item-container"
      style={[styles.container, containerStyle]}
      onPress={onPress}>
      <View style={[styles.containerListItem]}>
        <Ionicons
          name={icon}
          size={24}
          color={Color.black}
          style={iconStyle}
          testID="list-item-icon"
        />
        <View style={styles.textViewStyles}>
          <TextComponent
            fontSize={fontSize}
            color={color}
            fontWeight={fontWeight}>
            {text}
          </TextComponent>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    backgroundColor: Color.white,
    borderRadius: 8,
  },
  containerListItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textViewStyles: {
    marginLeft: 8,
  },
});

export default ListItem;
