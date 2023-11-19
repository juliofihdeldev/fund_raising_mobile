import React, {useEffect} from 'react';
import {View, StyleSheet, TextInput, Dimensions} from 'react-native';
import {Color} from '../../assets/GlobalStyles';
import TextComponent from '../../component/atom/CustomText';
import {useFunding} from '../../context/FundingContext';
import { useLang } from '../../context/LanguageContext';
import { currency } from '../../utils/currency';

const RaisingAmount: React.FC = () => {
  const {lang} = useLang();
  const {state, handleStateManager} = useFunding();

  const [amount, setAmount] = React.useState(state?.amount || 10000);

  useEffect(() => {
    handleStateManager({
      amount: amount,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);
  return (
    <View style={styles.container}>

      <TextComponent
        fontFamily='Montserrat-Regular'
        style={{
          fontSize: 17,

          color: Color.black,
          marginLeft: 32,
          marginTop: 16,
        }}>
        {lang.word_how_much_do_you_want_to_collect}
      </TextComponent>
      <View style={styles.containerPosition}>
        
        <TextInput
          placeholder="0.00"
          keyboardType="numeric"
          defaultValue={state?.amount}
          onChangeText={amount => setAmount(amount)}
          placeholderTextColor={'#333'}
          style={{
            height: 50,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 16,
            width: '96%',
            marginLeft: 8,
            marginTop: 16,
            fontSize: 17,
            paddingLeft: 16,
            fontFamily: 'Montserrat-Bold',
            color: Color.black,
          }}
        />
        <TextComponent
          fontFamily='Montserrat-Bold'
          style={{
            fontSize: 23,
            color: Color.black,
            marginLeft: 16,
          }}>
          {currency(state?.amount)} 
        </TextComponent>
        <TextComponent
          fontFamily='Montserrat-Regular'
          style={{
            width: '98%',
            color: Color.white,
            marginTop: 16,
            padding: 16,
            borderRadius: 8,
            backgroundColor: Color.black,
          }}>
          {lang.withdraw_condition}
        </TextComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  containerPosition: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  map: {
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RaisingAmount;
