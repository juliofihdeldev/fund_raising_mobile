import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import TextComponent from './atom/CustomText';
import {Color, boxShadow} from '../assets/GlobalStyles';
import {imagesitem13x} from '../assets/images';
import { currency } from '../utils/currency';

interface UserCommentItemProps {
  onPress: () => void;
  comment: string;
  amount?: number;
  name?: string;
}

const UserCommentItem: React.FC<UserCommentItemProps> = ({
  onPress,
  comment,
  amount,
  name,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container]}>
        <Image
          source={imagesitem13x}
          style={[styles.imagesStyle, boxShadow]}
          resizeMode="cover"
        />
        <View style={styles.containerText}>
          <TextComponent color={Color.black} fontWeight="bold">
            {name} has donated HTG { currency(amount)}
          </TextComponent>
          <TextComponent fontSize={13} color={Color.black} >
            {comment}
          </TextComponent>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    height: 'auto',
    marginTop: 12,
    backgroundColor: '#fff',
  },
  imagesStyle: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#fff',
  },
  containerText: {
    paddingLeft: 12,
    marginEnd: 42,
  },
});

export default UserCommentItem;
