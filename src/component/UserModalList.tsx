import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Modal,
  FlatList,
} from 'react-native';
import {Color} from '../assets/GlobalStyles';
import ListItem from './atom/ListItem';
import {useLang} from '../context/LanguageContext';
import {GlobalStyles} from '../screens/feed/GlobalStyle';
import CustomSeparator from './atom/CustomSeparator';
import ItemUser from './ItemUser';

import SearchBar from './SearchBar';
import {useAuth} from '../context/AuthContext';
import {isNullOrEmpty} from '../utils/isNullOrEmpty';
import TextComponent from './atom/CustomText';
import withLoadingModal from './HOC/Loading';
import {FlashList} from '@shopify/flash-list';

interface CustomViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  orientation?: 'horizontal' | 'vertical';
  isVisible?: boolean;
  onClose?: () => void;
  setLoading?: (loading: boolean) => void;
}

const UserModalList: React.FC<CustomViewProps> = ({
  setLoading,
  isVisible,
  onClose,
}) => {
  const {lang} = useLang();
  const {getUsers, users, current_select_user, handleCurrentSelectUser} =
    useAuth();

  const [filteredUsers, setFilteredUsers] = React.useState(users);
  useEffect(() => {
    setLoading(true);
    getUsers();
    setLoading(false);
  }, [isVisible]);

  // run get users on focus

  const handleText = (text: string) => {
    const filter = users.filter(user => {
      return user.name.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredUsers(filter);
  };

  return (
    <Modal
      visible={isVisible}
      // onBackdropPress={onClose}
      onDismiss={onClose}
      transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView} />
        <View
          style={{
            width: '100%',
            height: '80%',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'column',
              marginBottom: 16,
              backgroundColor: Color.white,
              height: '100%',
            }}>
            <ListItem
              text={lang?.close}
              icon="close-outline"
              color={Color.black}
              onPress={onClose}
              fontSize={17}
              containerStyle={[GlobalStyles.containerList]}
              iconStyle={[
                GlobalStyles.customIcon,
                {color: Color.black, fontWeight: 'bold', fontSize: 44},
              ]}
            />
            <View
              style={{
                paddingHorizontal: 12,
              }}>
              {!isNullOrEmpty(current_select_user) && (
                <View
                  style={{
                    paddingHorizontal: 12,
                  }}>
                  <TextComponent fontSize={15} color="#000" fontWeight="normal">
                    {lang?.selected_user}
                  </TextComponent>

                  <ItemUser
                    item={current_select_user}
                    showId={true}
                    contactButton={() => null}
                  />
                </View>
              )}
            </View>
            <CustomSeparator />
            <View
              style={{paddingHorizontal: 16, paddingVertical: 8, height: 70}}>
              <SearchBar placeholder={'Recherche'} onChangeText={handleText} />
            </View>
            <View
              style={{
                paddingHorizontal: 16,
                marginBottom: 16,
              }}>
              {
                <FlashList
                  data={filteredUsers}
                  renderItem={({item}) => (
                    <ItemUser
                      contactButton={() => null}
                      showId={true}
                      item={item}
                      onPress={() => handleCurrentSelectUser(item)}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                  style={{marginBottom: 16}}
                />
              }
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: '100%',
    backgroundColor: '#333333aa',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 62,
  },

  modalView: {
    height: '40%',
    bottom: 0,
    zIndex: 10000,
    padding: 16,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
});

const UserModalListwithLoading = withLoadingModal(
  UserModalList,
  'Users Loading',
);
export default UserModalListwithLoading;
