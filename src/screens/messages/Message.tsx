import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Image} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import TextComponent from '../../component/atom/CustomText';
import {Color} from '../../assets/GlobalStyles';

const Message: React.FC<any> = ({navigation}) => {
  const {user} = useAuth();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('MessageDetail')}>
      <View style={styles.containerMessage}>
        <TouchableOpacity onPress={() => navigation.navigate('')}>
          {/* <Image
            source={}
            resizeMode="stretch"
            style={styles.Message}
          /> */}
        </TouchableOpacity>
        <View>
          <TextComponent fontSize={15} color={Color.black} fontWeight="bold">
            {user?.name}
          </TextComponent>
          <TextComponent
            fontSize={13}
            color="#777"
            fontWeight="normal"
            style={{width: 240}}>
            Mwen te bezwen w di mesi anpil pou ed ou an jounen jodi a
          </TextComponent>
        </View>
        <View style={styles.time}>
          <TextComponent fontSize={13} color="#000" fontWeight="normal">
            5:30 PM
          </TextComponent>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  time: {
    position: 'absolute',
    right: 0,
  },

  Message: {
    width: 50,
    height: 50,
    borderRadius: 100,
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default Message;
