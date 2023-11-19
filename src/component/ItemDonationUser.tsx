import React, {useState} from 'react';
import {View, StyleSheet, Modal, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import TextComponent from './atom/CustomText';
import {Color} from '../assets/GlobalStyles';
import {ProjectType} from '../types/Index';
import ListItem from './atom/ListItem';
import TextAreaInput from './atom/TextAreaInput';
import CustomButton from './atom/CustomButton';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../context/AuthContext';
import CustomImage from './atom/CustomImage';
import {Root, Toast, ALERT_TYPE} from 'react-native-alert-notification';
import {currency} from '../utils/currency';
import { useLang } from '../context/LanguageContext';
// Create props interface
interface ItemDonationUserProps {
  onPress: () => void;
  funding: ProjectType[];
}

const ItemDonationUser: React.FC<ItemDonationUserProps> = ({
  onPress,
  funding,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    amount,
    image,
    user_name,
    project_name,
    project_image,
    project_id, id,
  } = funding?.item;

  const {lang}= useLang()

  const [modalVisible, setModalVisible] = useState(false);
  const [mesaj, setMesaj] = useState('');
  const {user: currentLoginUser} = useAuth();
  delete currentLoginUser.donations;

  const handleSend = async () => {
    await firestore().collection('messages')
      .add({
        sender: currentLoginUser,
        receiver: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          name: user_name,
        },
        message: mesaj,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        project_id: project_id,
        date: new Date().toString(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        amount_donation: amount,
      });

    Toast.show({
      title: 'Success',
      textBody: 'Thanks for your message',
      type: ALERT_TYPE.SUCCESS,
    });

    setMesaj('');
    setModalVisible(false);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Root>
        <View style={[styles.container]}>
          <CustomImage image={project_image} style={styles.imagesStyle} />
          <ListItem
            text=""
            icon="chatbubble-ellipses-outline"
            fontSize={20}
            containerStyle={styles.containerList}
            iconStyle={styles.customIcon}
            onPress={() => setModalVisible(true)}
          />
          <View style={styles.containerText}>
            <TextComponent
              numberOfLines={2}
            >
             {project_name} 
            </TextComponent>

            <TextComponent fontSize={13} >
              {user_name}
            </TextComponent>
            <TextComponent fontSize={12} color={Color.black}>
              {currency(Number(amount))}
            </TextComponent>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 16,
                }}>
                <TextComponent
                  style={{
                    width: '100%',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  {lang?.word_support} {lang?.for} {user_name}
                </TextComponent>

                <ListItem
                  text=""
                  icon="close-outline"
                  fontSize={20}
                  color="#333"
                  containerStyle={{
                    right: 32,
                    top: 0,
                    paddingVertical: 2,
                    paddingHorizontal: 2,
                  }}
                  iconStyle={{
                    color: Color.black,
                    fontSize: 42,
                  }}
                  onPress={() => setModalVisible(false)}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}>
                <TextAreaInput
                  placeholder={`${lang?.leave_message}  ${user_name}`}
                  onChangeText={text => setMesaj(text)}
                  multiline={true}
                  numberOfLines={4}
                  style={{
                    color: Color.black,
                    width: '100%',
                  }}
                />

                {mesaj.length > 5 && (
                  <CustomButton
                    title={'Send'}
                    disabled={mesaj.length < 5}
                    onPress={() => handleSend()}
                    buttonStyle={{
                      margin: 4,
                      backgroundColor: Color.primary,
                      borderRadius: 26,
                      minWidth: 40,
                      width: 80,
                      marginTop: 16,
                    }}
                    textStyle={{color: '#fff'}}
                  />
                )}
              </View>
            </View>
          </View>
        </Modal>
      </Root>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: Color.white,
    width: 260,
    paddingBottom: 16,
    alignItems: 'flex-start',
    marginLeft: 4,
  },
  imagesStyle: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  containerText: {
    paddingLeft: 8,
    marginTop: 8,
    width: '60%',
  },
  containerPriceDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  containerList: {
    position: 'absolute',
    justifyContent: 'flex-start',
    textAlign: 'left',
    backgroundColor: '#eeeeee01',
    paddingVertical: 12,
    marginLeft: 60,
  },

  customIcon: {
    marginRight: 10,
    fontSize: 32,
    color: '#eeeeee',
  },
  centeredView: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 62,
  },
  modalView: {
    width: '100%',
    height: '70%',
    bottom: 0,
    position: 'absolute',
    zIndex: 10000,
    backgroundColor:Color.white,
    padding: 16,
    alignItems: 'center',
  },


  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ItemDonationUser;
