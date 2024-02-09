import React, {useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity, Share} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color} from '../../assets/GlobalStyles';

const ShareComponent = ({item}: any) => {
  //   async function buildLink() {
  //     const link = await dynamicLinks().buildLink({
  //       link: `https://potekole.page.link/${item?.id}`,
  //       // domainUriPrefix is created in your Firebase console
  //       domainUriPrefix: 'https://potekole.page.link/',
  //       // optional setup which updates Firebase analytics campaign
  //       // "banner". This also needs setting up before hand
  //     });
  //
  //     return link;
  //   }

  //   const shareLink = async () => {
  //     let shareURL;
  //
  //     try {
  //       shareURL = await buildLink();
  //
  //       console.log(shareURL);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     try {
  //       if (shareURL !== '') {
  //         await Share.share({
  //           message: `POTEKOLE: ${item.name} ${shareURL}`,
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const handleShareLegacy = useCallback(() => {
    Share.share({
      message: `Pote Kole: ${
        item.name
      } https://pote-kole.web.app?id=${item?.id?.toString()}
    `,
    });
  }, [item]);

  return (
    <View>
      <TouchableOpacity onPress={handleShareLegacy}>
        <Ionicons
          name="share-outline"
          size={24}
          color={Color.primary}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 4,
  },
});
export default ShareComponent;
