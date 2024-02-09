import React, {useState} from 'react';
import {Color} from '../../assets/GlobalStyles';
import TextComponent from '../../component/atom/CustomText';
import TextAreaInput from '../../component/atom/TextAreaInput';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import CustomSeparator from '../../component/atom/CustomSeparator';
import CustomButton from '../../component/atom/CustomButton';
import {useFunding} from '../../context/FundingContext';
import {useLang} from '../../context/LanguageContext';
import MultiplePhotos from '../../component/molecules/MultiplePhotos';

const RaisingMedia: React.FC = () => {
  const {lang} = useLang();
  const {state, handleStateManager} = useFunding();
  const [image, setImages] = useState(state?.image || null);
  const [list_images, setListImages] = useState(state?.list_images || []);

  const [permission, setPermission] = useState<boolean>(false);
  const [video_url, setVideo_url] = useState<string>(state?.video_url || '');
  const lastImage = state.image;

  React.useEffect(() => {
    handleStateManager({
      video_url,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video_url]);

  React.useEffect(() => {
    handleStateManager({
      image: image?.path || lastImage,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  React.useEffect(() => {
    handleStateManager({
      list_images: list_images,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list_images]);

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        setPermission(true);
        return;
      }
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'Your app needs access to your camera.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
        setPermission(true);
      }
      // You can now access the library or feature that requires the CAMERA permission.
      // } else {
      //   Alert.alert(
      //     'Camera permission denied',
      //     ' You can not upload a video without camera permission',
      //     [
      //       {
      //         text: 'OK',
      //         onPress: () => null,
      //       },
      //     ],
      //   );
      //   setPermission(false);
      // }
    } catch (error) {
      Alert.alert('Error requesting camera permission:', JSON.stringify(error));
    }
  };

  React.useEffect(() => {
    async function fetchAskpermissios() {
      await requestCameraPermission();
    }
    fetchAskpermissios();
  }, []); // Or [] if effect doesn't need props or state

  const handleImageSelect = async () => {
    if (!permission) {
      await requestCameraPermission();
    }

    ImagePicker.openPicker({
      mediaType: 'photo',
      compressImageQuality: 0.9,
    })
      .then(image => {
        setImages(image);
      })
      .catch(error => {
        console.log('ImagePicker Error:', error);
        console.log(JSON.stringify(error));
      });
  };

  const handleSelectMultipleImages = async () => {
    if (!permission) {
      await requestCameraPermission();
    }
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      compressImageQuality: 0.8,
    })
      .then(images => {
        setListImages(images.map((image: any) => image.path));
      })
      .catch(error => {
        console.log('ImagePicker Error:', error);
        console.log(JSON.stringify(error));
      });
  };

  const onDeletePhoto = (arg: string): void => {
    const newList = list_images.filter(photo => photo !== arg);
    setListImages(newList);
  };

  return (
    <View style={styles.container}>
      <View>
        <TextComponent
          style={{
            color: Color.black,
            marginTop: 16,
            padding: 16,
            borderRadius: 8,
          }}>
          {lang?.word_add_a_video}
        </TextComponent>

        <TextAreaInput
          placeholder={lang?.ecrivez_ici}
          keyboardType="default"
          defaultValue={state.video_url}
          onChangeText={text => setVideo_url(text)}
          style={{
            color: Color.black,
          }}
        />
        <View
          style={{
            marginTop: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {!image ? (
            <CustomButton
              title={lang?.word_add_a_photo}
              onPress={handleSelectMultipleImages}
              buttonStyle={{
                backgroundColor: Color.secondary,
                borderRadius: 26,
                marginLeft: 8,
              }}
              textStyle={{color: '#fff'}}
            />
          ) : (
            <CustomButton
              title={lang?.word_change_photo}
              onPress={handleSelectMultipleImages}
              buttonStyle={{
                backgroundColor: Color.secondary,
                borderRadius: 26,
                marginLeft: 8,
              }}
              textStyle={{color: '#fff'}}
            />
          )}
        </View>
        <CustomSeparator />

        <View style={styles.containePhoto}>
          <TextComponent style={{color: Color.black}}></TextComponent>
          {list_images.map((photo, index) => (
            <MultiplePhotos
              photo={photo}
              key={index}
              onDeletePhoto={() => onDeletePhoto(photo)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containePhoto: {
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 16,
  },
  container: {
    flex: 1,
    width: '100%',

    paddingHorizontal: 8,
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: Dimensions.get('window').width - 32,
    height: 200,
    borderRadius: 12,
  },
});

export default RaisingMedia;
