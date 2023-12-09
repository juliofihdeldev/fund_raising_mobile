import React from 'react';
import {View, StyleSheet, Share} from 'react-native';
import {TouchableOpacity} from 'react-native';
import CustomProgressBar from './atom/CustomProgressBar';
import TextComponent from './atom/CustomText';
import {Color, boxShadow} from '../assets/GlobalStyles';
import {ProjectType} from '../types/Index';
import {currency} from '../utils/currency';
import CustomImage from './atom/CustomImage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShareComponent from './HOC/ShareComponent';

interface ItemDonationProps {
  onPress: () => void;

  project: ProjectType;
}
const handleShare = project => {
  Share.share({
    message: `Pote kole: ${project?.item.description} ${project?.item.amount} 
      https://pote-kole.web.app?id=${project?.item.id}
    `,
  });
};

const ItemDonation: React.FC<ItemDonationProps> = ({onPress, project}) => {
  let {amount, description, image, user} = project?.item;
  return (
    <TouchableOpacity style={[styles.container, boxShadow]} onPress={onPress}>
      <View style={styles.imagesView}>
        <CustomImage image={image} style={styles.image} />
      </View>

      <View style={styles.contentText}>
        <TextComponent numberOfLines={2}>{description}</TextComponent>
        <CustomProgressBar value={65} />

        <View style={styles.contentTextPrice}>
          <TextComponent
            fontWeight="bold"
            fontSize={14}
            style={styles.spaceTop}>
            {currency(amount)}
          </TextComponent>

          <ShareComponent item={project?.item} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    height: 245,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  imagesView: {
    height: 140,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  contentText: {
    margin: 8,
  },

  progressBarContainer: {
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 18,
    marginTop: 8,
    height: 10,
  },
  progressBar: {
    backgroundColor: 'green',
    borderRadius: 18,
    justifyContent: 'center',
  },
  goalText: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 8,
  },
  contentTextPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  icon: {
    marginHorizontal: 4,
  },
  spaceTop: {
    marginTop: 8,
  },
});

export default ItemDonation;
