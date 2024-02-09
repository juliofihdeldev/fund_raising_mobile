import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Image} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import TextComponent from '../../component/atom/CustomText';
import {Color} from '../../assets/GlobalStyles';
import TextAreaInput from '../../component/atom/TextAreaInput';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MessageDetail: React.FC<any> = ({navigation}) => {
  const {user} = useAuth();
  const scrollRef = React.useRef<ScrollView>(null);

  const [mesaj, setMesaj] = React.useState('');

  const [chats, setChats] = React.useState([]);

  const handleSend = () => {
    const chatArray = [];

    const chat = {
      id: Math.random(),
      position: Math.floor(Math.random() * 2) + 1,
      message: mesaj,
      time: new Date(),
      user: user,
    };

    chatArray.push(chat);

    setChats([...chats, ...chatArray]);
    setMesaj('');
    if (scrollRef.current) {
      scrollRef.current.scrollTo({x: 0, y: 450, animated: true});
    }
  };

  navigation.setOptions({
    // set header to be a custom component
    headerTitle: () => (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('')}>
          {/* <Image
            source={require('../assets/images/a.png')}
            resizeMode="stretch"
            style={styles.Message}
          /> */}
        </TouchableOpacity>
        <TextComponent fontSize={15} color={Color.black} fontWeight="bold">
          {user?.name}
        </TextComponent>
      </View>
    ),
  });

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollRef}>
        <FlatList
          data={chats}
          renderItem={({item}) => (
            <View
              style={[
                styles.containerMessage,
                {
                  backgroundColor:
                    item.position % 2 === 0 ? Color.secondary : '#f2f2f2',
                  marginLeft: item.position % 2 === 0 ? 0 : 100,
                  width: item.position % 2 === 0 ? '70%' : '70%',
                },
              ]}>
              <View>
                <TextComponent
                  fontSize={13}
                  color={item.position % 2 === 0 ? Color.white : '#000'}
                  fontWeight="normal"
                  style={{width: 240}}>
                  {item?.message}
                </TextComponent>
              </View>
              <View style={styles.time}>
                <TextComponent
                  fontSize={9}
                  color={item.position % 2 === 0 ? Color.white : '#000'}
                  fontWeight="normal">
                  {item?.time.toLocaleTimeString()}
                </TextComponent>
              </View>
            </View>
          )}
          keyExtractor={item => item?.id?.toString()}
        />
      </ScrollView>

      <View style={styles.containerInputMessage}>
        <TextAreaInput
          placeholder="Ecri mesaj ou"
          keyboardType="default"
          onChangeText={text => setMesaj(text)}
          value={mesaj}
          style={{
            borderColor: '#eee',
            marginEnd: 8,
            width: '90%',
            fontSize: 13,
          }}
        />
        <View style={styles.send}>
          <Ionicons
            onPress={handleSend}
            name={'send'}
            color={mesaj.length === 0 ? '#ccc' : Color.primary}
            disabled={mesaj.length === 0}
            size={26}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  time: {
    right: 40,
    marginTop: 20,
  },

  send: {
    marginTop: 20,
  },

  Message: {
    width: 40,
    height: 40,
    borderRadius: 80,
    backgroundColor: '#333333',
    marginRight: 8,
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
  containerMessage: {
    width: '80%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
    borderRadius: 12,
  },

  containerInputMessage: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginBottom: 0,
    padding: 8,
    borderRadius: 8,
  },
});

export default MessageDetail;
