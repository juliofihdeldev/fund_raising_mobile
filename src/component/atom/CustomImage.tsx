import React from 'react';
import {StyleProp, ImageStyle, Image} from 'react-native';
import {defaultImage} from '../../assets/images';

interface CustomImageProps {
  style?: StyleProp<ImageStyle>;
  image?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({style, image}) => {
  let defaultImage =
    'https://res.cloudinary.com/cloudinary-marketing/images/c_lfill,w_1279,ar_1.82,g_auto/f_auto,q_auto/v1681925300/Web_Assets/blog/e0c4deb00721e48dbb66715fc165b73f27d136fa-1279x717-1_2814879024/e0c4deb00721e48dbb66715fc165b73f27d136fa-1279x717-1_2814879024-png?_i=AA';

  return (
    <Image
      source={{uri: image?.length ? image : defaultImage}}
      style={style}
      resizeMode="cover"
    />
  );
};

export default CustomImage;
