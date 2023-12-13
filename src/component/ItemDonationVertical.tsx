import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';

import TextComponent from './atom/CustomText';
import {Color} from '../assets/GlobalStyles';
import CustomProgressBar from './atom/CustomProgressBar';
import {currency} from '../utils/currency';
import CustomImage from './atom/CustomImage';
import {ProjectType} from '../types/Index';
import {formatDate} from '../utils/dateFormat';

// Create props interface
interface ItemDonationVerticalProps {
  onPress: () => void;
  project: ProjectType;
}

const ItemDonationVertical: React.FC<ItemDonationVerticalProps> = ({
  onPress,
  project,
}) => {
  let {
    category = '',
    amount = 0,
    description = '',
    image = '',
    date = '',
    collect = 0,
    user,
  } = project?.item;

  let pourcetage = (collect * 100) / amount;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container]}>
        <CustomImage image={image} style={styles.image} />
        <View style={styles.containerText}>
          <TextComponent numberOfLines={2}>{description}</TextComponent>
          <TextComponent fontSize={15} color={Color.black} fontWeight="bold">
            {user.name} {category}
          </TextComponent>
          <View>
            <CustomProgressBar value={pourcetage} />
          </View>
          <View style={[styles.containerPriceDate]}>
            <TextComponent fontSize={15} color={Color.black} fontWeight="bold">
              {currency(amount)}
            </TextComponent>
            <TextComponent fontSize={13} color={Color.black}>
              {formatDate(date)}
            </TextComponent>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: '#fff',
    borderBottomColor: Color.grayLight,
    borderBottomWidth: 1,
  },
  imagesStyle: {
    width: 150,
    height: 120,
    borderRadius: 16,
  },
  containerText: {
    height: 124,
    paddingLeft: 8,
    width: '60%',
  },
  containerPriceDate: {
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 4,
  },
  image: {
    width: 160,
    height: 120,
    borderRadius: 16,
  },
});

export default ItemDonationVertical;
