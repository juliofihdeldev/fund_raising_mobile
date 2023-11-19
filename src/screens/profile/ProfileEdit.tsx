import React, {useState} from 'react';
import {
  View,
  Alert,
  ScrollView,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import {UserType} from '../../types/Index';
import {Image} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import TextComponent from '../../component/atom/CustomText';
import {Color} from '../../assets/GlobalStyles';
import CustomSeparator from '../../component/atom/CustomSeparator';
import firestore from '@react-native-firebase/firestore';
import TextAreaInput from '../../component/atom/TextAreaInput';
import CustomButton from '../../component/atom/CustomButton';

import ImagePicker from 'react-native-image-crop-picker';
import {TouchableOpacity} from 'react-native';
import ListItem from '../../component/atom/ListItem';
import storage from '@react-native-firebase/storage';
import {ALERT_TYPE, Toast, Root} from 'react-native-alert-notification';

const ProfileEdit: React.FC<UserType> = ({navigation}: any) => {
  const {user, handleSetUser} = useAuth();
  const [image, setImages] = React.useState('');
  const [permission, setPermission] = useState<boolean>(false);
  navigation.setOptions({
    headerTitle: `${user.name || 'Edit Profile'}`,
    headerLeft: () => null,
    headerRight: () => (
      <CustomButton
        title="Enregister"
        onPress={() => updateInfo(user?.id)}
        buttonStyle={{
          width: 'auto',
          marginRight: 16,
          marginTop: 12,
          backgroundColor: Color.secondary,
          borderRadius: 26,
        }}
        textStyle={{color: '#fff'}}
      />
    ),
  });
  const [name, setName] = React.useState(user?.name);
  const [email, setEmail] = React.useState(user?.email);
  const [bio, setBio] = React.useState(user?.bio);
  const [state, setState] = React.useState(user?.state || 'Ouest');
  const [birth_date, setBirthDate] = React.useState(
    user?.birth_date || '1990-01-01',
  );
  const [address, setAddress] = React.useState(
    user?.address || 'Delmas 33, Port-au-Prince, Haiti',
  );

  async function sendMediaToStorage() {
    try {
      const reference = storage().ref(
        `fundraising/${new Date().toISOString()}`,
      );
      await reference.putFile(image.path);
      console.log('Uploaded to the bucket!');
      const downloadURL = await reference.getDownloadURL();
      console.log(`File available at: ${downloadURL}`);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  }

  async function updateInfo(uid: any) {
    try {
      let objUser: UserType = {};
      let img;

      if (image?.path) {
        img = await sendMediaToStorage();
        objUser = {
          id: uid,
          name: name || null,
          email: email || null,
          bio: bio || null,
          state: state || null,
          address: address || null,
          birth_date: birth_date || null,
          image: img || null,
        };
      } else {
        objUser = {
          id: uid,
          name: name,
          email: email || null,
          bio: bio || null,
          state: state || null,
          address: address || null,
          birth_date: birth_date || null,
          image: user?.image || null,
        };
      }

      await firestore().collection('users').doc(uid).update(objUser);
      handleSetUser(objUser);

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Sikse',
        textBody: 'Enfòmasyon ou yo ajou',
      });
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Echèk',
        textBody: 'Enfòmasyon ou an pa mete ajou',
      });
    }
    navigation.goBack();
  }

  const requestCameraPermission = async () => {
    try {
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
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
        setPermission(true);
        // You can now access the library or feature that requires the CAMERA permission.
      } else {
        console.log('Camera permission denied');
        setPermission(false);
      }
    } catch (error) {
      Alert.alert('Error requesting camera permission:', JSON.stringify(error));
    }
  };

  const handleImageSelect = async () => {
    if (!permission) {
      await requestCameraPermission();
    }

    ImagePicker.openPicker({
      mediaType: 'photo',
      compressImageQuality: 0.6,
    })
      .then(image => {
        setImages(image);
      })
      .catch(error => {
        console.log('ImagePicker Error:', error);
        console.log(JSON.stringify(error));
      });
  };

  React.useEffect(() => {
    async function fetchAskPermission() {
      await requestCameraPermission();
    }
    fetchAskPermission();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Root>
        <View style={styles.containerProfile}>
          <TouchableOpacity onPress={handleImageSelect}>
            <Image
              source={{uri: image?.path || user.image}}
              resizeMode="contain"
              style={styles.profile}
            />
          </TouchableOpacity>
          <View>
            <TextComponent
              style={{
                marginLeft: 16,
              }}
              width={92}
              fontSize={21}
              color={Color.black}
              fontWeight="normal">
              {user?.name}
            </TextComponent>
            <TextComponent
              style={{
                marginLeft: 16,
              }}
              fontSize={13}
              color={Color.black}
              fontWeight="normal">
              {user?.email}
            </TextComponent>
          </View>

          <ListItem
            text=""
            icon="camera-outline"
            onPress={handleImageSelect}
            fontSize={20}
            color="#333"
            containerStyle={{
              position: 'absolute',
              backgroundColor: 'transparent',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              bottom: -10,
              left: 60,
              width: 40,
            }}
            iconStyle={styles.customIcon}
          />
        </View>
        <CustomSeparator />
        <View style={styles.containerInpt}>
          <TextComponent
            width={92}
            fontSize={13}
            color={Color.black}
            fontWeight="normal">
            Non ak siyati
          </TextComponent>

          <TextAreaInput
            defaultValue={name}
            placeholder="Non ak siyati ou"
            keyboardType="default"
            onChangeText={text => setName(text)}
            style={styles.inputStyle}
          />
        </View>

        <View style={styles.containerInpt}>
          <TextComponent
            width={92}
            fontSize={13}
            color={Color.black}
            fontWeight="normal">
            Email
          </TextComponent>
          <TextAreaInput
            defaultValue={email}
            placeholder="Address ou"
            keyboardType="default"
            onChangeText={text => setEmail(text)}
            style={styles.inputStyle}
          />
        </View>

        <View style={styles.containerInpt}>
          <TextComponent width={92} fontSize={13} color={Color.black}>
            Departement
          </TextComponent>
          <TextAreaInput
            defaultValue={state}
            placeholder="Address ou"
            keyboardType="default"
            onChangeText={text => setState(text)}
            style={styles.inputStyle}
          />
        </View>

        <View style={styles.containerInpt}>
          <TextComponent
            fontSize={13}
            width={92}
            color={Color.black}
            fontWeight="normal">
            Address
          </TextComponent>
          <TextAreaInput
            defaultValue={address}
            placeholder="Address ou"
            keyboardType="default"
            onChangeText={text => setAddress(text)}
            style={styles.inputStyle}
          />
        </View>

        <View style={styles.containerInpt}>
          <TextComponent
            fontSize={13}
            width={92}
            color={Color.black}
            fontWeight="normal">
            Dat ou fèt
          </TextComponent>
          <TextAreaInput
            defaultValue={birth_date}
            placeholder="Dat ou fèt"
            keyboardType="date-time"
            onChangeText={text => setBirthDate(text)}
            style={styles.inputStyle}
          />
        </View>

        <View
          style={[
            styles.containerInpt,
            {
              justifyContent: 'flex-start',
            },
          ]}>
          <TextComponent
            fontSize={13}
            width={92}
            color={Color.black}
            fontWeight="normal">
            Bio
          </TextComponent>
          <TextAreaInput
            defaultValue={bio}
            placeholder=" Pale nou de ou"
            keyboardType="default"
            onChangeText={text => setBio(text)}
            style={styles.inputStyle}
          />
        </View>
      </Root>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profile: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#333333',
  },
  bar: {
    width: 'auto',
    backgroundColor: '#333',
    height: 1,
    marginVertical: 24,
    marginBottom: 24,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  containerProfile: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.primary,
  },
  email: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 8,
  },
  margin: {
    marginTop: 16,
  },

  customContainer: {
    backgroundColor: '#f0f0f0',
  },
  customIcon: {
    marginRight: 10,
    fontSize: 28,
    color: Color.white,
  },
  containerInpt: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputStyle: {
    borderWidth: 0,
    borderRadius: 8,
    width: Dimensions.get('window').width / 1.4,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
  },
});

export default ProfileEdit;
