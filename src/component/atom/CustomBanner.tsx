import React from 'react';
import {ImageSlider} from 'react-native-image-slider-banner';
import {Color} from '../../assets/GlobalStyles';
interface CustomBannerProps {
  images: [];
}

const CustomBanner: React.FC<CustomBannerProps> = ({images}) => {
  let data = images.map((item: any) => ({
    img: item,
  }));
  return (
    <ImageSlider
      data={data}
      autoPlay={true}
      onItemChanged={item => console.log('item', item)}
      timer={3000}
      caroselImageStyle={{
        resizeMode: 'cover',
      }}
      activeIndicatorStyle={{
        backgroundColor: Color.primary,
        height: 10,
        width: 20,
      }}
    />
  );
};

export default CustomBanner;
