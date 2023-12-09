import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import TextComponent from './atom/CustomText';
import {Color, boxShadow} from '../assets/GlobalStyles';
import CustomImage from './atom/CustomImage';
import {UserType} from '../types/Index';

// create props interface
interface ItemUserProps {
  onPress?: () => void;
  item?: UserType;
  isOrganization?: boolean;
  contactButton?: () => React.ReactNode;
  showId?: boolean;
}

const ItemUser: React.FC<ItemUserProps> = ({
  onPress,
  item,
  isOrganization,
  contactButton,
  showId = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container]}>
        <CustomImage image={item?.image} style={[styles.imagesStyle]} />
        <View style={styles.containerText}>
          {isOrganization && (
            <TextComponent numberOfLines={2} fontSize={13}>
              Organizing By
            </TextComponent>
          )}
          <TextComponent color={Color.black}>{item?.name}</TextComponent>
          <TextComponent fontSize={13} color={Color.black}>
            {item?.phone}
          </TextComponent>
          <TextComponent fontSize={13} color={Color.black}>
            {showId && `${item?.id}`}
          </TextComponent>
        </View>
        <View>{contactButton()}</View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    height: 64,
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
    height: 124,
    paddingLeft: 4,
    width: '60%',
  },
});

export default ItemUser;
