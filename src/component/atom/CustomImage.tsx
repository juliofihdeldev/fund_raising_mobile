import React from 'react';
import {StyleProp, ImageStyle, Image} from 'react-native';
import {defaultImage} from '../../assets/images';

interface CustomImageProps {
  style?: StyleProp<ImageStyle>;
  image?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({style, image}) => {
  return (
    <Image
      source={image?.length ? {uri: image} : defaultImage}
      style={style}
      resizeMode="cover"
    />
  );
};

export default CustomImage;
