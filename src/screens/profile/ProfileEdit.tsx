import React, {useState} from 'react';
import {
  View,
  Alert,
  ScrollView,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import {UserType} from '../../types/Index';
import {Image} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import TextComponent from '../../component/atom/CustomText';
import {Color} from '../../assets/GlobalStyles';
import CustomSeparator from '../../component/atom/CustomSeparator';

import TextAreaInput from '../../component/atom/TextAreaInput';
import CustomButton from '../../component/atom/CustomButton';

import {TouchableOpacity} from 'react-native';
import ListItem from '../../component/atom/ListItem';

import {ALERT_TYPE, Toast, Root} from 'react-native-alert-notification';
import {doc, getDoc, collection, setDoc} from 'firebase/firestore';
import {db} from '../../../firebaseConfig';
import {
  getStorage,
  getDownloadURL,
  ref as refStorageUpload,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import CustomImage from '../../component/atom/CustomImage';
import {getBlobFroUri} from '../../utils/getBlobFromUri';

const ProfileEdit: React.FC<UserType> = ({navigation}: any) => {
  const storage = getStorage();

  const {user, handleSetUser} = useAuth();
  const [image, setImages] = React.useState({} as {uri: string});
  const [permission, setPermission] = useState<boolean>(false);
  const [downloadURL, setDownloadURL] = useState<string>('');
  navigation.setOptions({
    headerTitle: '', //`${user.name || "Edit Profile"}`,
    headerLeft: () => null,
    headerRight: () => (
      <CustomButton
        title="Enregister"
        onPress={() => updateInfo(user?.id)}
        buttonStyle={{
          width: 'auto',
          marginRight: 16,

          height: 42,
          backgroundColor: Color.secondary,
          borderRadius: 26,
        }}
        textStyle={{color: '#fff'}}
      />
    ),
  });
  const [name, setName] = React.useState(user?.name);
  const [phoneNumber, setPhoneNumber] = React.useState(user?.phone);
  const [bio, setBio] = React.useState(user?.bio);
  const [state, setState] = React.useState(user?.state || 'Ouest');
  const [birth_date, setBirthDate] = React.useState(
    user?.birth_date || '1990-01-01',
  );
  const [address, setAddress] = React.useState(
    user?.address || 'Delmas 33, Port-au-Prince, Haiti',
  );

  async function sendMediaToStorage() {
    alert('sendMediaToStorage');
    const metadata = {
      contentType: 'image/jpeg',
    };
    const imageBlob = await getBlobFroUri(image.uri);

    const reference = refStorageUpload(
      storage,
      `fundraising/${new Date().toISOString()}`,
    );

    const uploadTask = uploadBytesResumable(
      reference,
      imageBlob as Blob,
      metadata,
    );
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      error => {
        // Handle unsuccessful uploads
        Alert.alert('Error', error.message);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then(_downloadURL => {
          console.log('File available at', _downloadURL);
          setDoc(doc(db, 'users', user.id), {
            ...user,
            image: _downloadURL,
          });
          handleSetUser({
            ...user,
            image: _downloadURL,
          });
        });
      },
    );
  }

  async function updateInfo(uid: any) {
    if (image.uri.length > 1) await sendMediaToStorage();

    try {
      let objUser: UserType = null;
      objUser = {
        id: uid || null,
        name: name || null,
        phone: phoneNumber || null,
        bio: bio || null,
        state: state || null,
        address: address || null,
        birth_date: birth_date || null,
      };
      // update user info
      setDoc(doc(db, 'users', uid), objUser);
      handleSetUser(objUser);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: 'Votre profile a été mis à jour',
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Echèk',
        textBody: 'Enfòmasyon ou an pa mete ajou',
      });
    }
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
      .then(_image => {
        setImages(_image as any);
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
            {image.uri ? (
              <Image
                source={{uri: image.uri}}
                resizeMode="contain"
                style={styles.profile}
              />
            ) : (
              <View>
                <CustomImage image={user.image} style={styles.profile} />
              </View>
            )}
          </TouchableOpacity>
          <View>
            <TextComponent
              style={{
                marginLeft: 16,
              }}
              width={192}
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
              {user?.phone}
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
            Telephone
          </TextComponent>
          <TextAreaInput
            defaultValue={phoneNumber}
            placeholder="+509 0000 0000"
            keyboardType="default"
            onChangeText={text => setPhoneNumber(text)}
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
            Votre address
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
            Date de naissance
          </TextComponent>
          <TextAreaInput
            defaultValue={birth_date}
            placeholder="Dat ou fèt"
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
  phoneNumber: {
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
