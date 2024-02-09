import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import CustomButton from '../../component/atom/CustomButton';
import {Color, boxShadow} from '../../assets/GlobalStyles';
import TextComponent from '../../component/atom/CustomText';
import {useFunding} from '../../context/FundingContext';
import {useLang} from '../../context/LanguageContext';
import {category} from '../../utils/category';
const data_state = [
  'Ouest',
  'Nord',
  'Nord-Est',
  'Nord-Ouest',
  'Artibonite',
  'Centre',
  "Grand'Anse",
  'Nippes',
  'Sud',
  'Sud-Est',
];

const data_category = category.map(cat => cat.name).splice(1);

const Location: React.FC = () => {
  const {lang} = useLang();
  const {state, handleStateManager} = useFunding();
  const [location, setLocation] = React.useState(
    state?.location || data_state[0],
  );
  const [category, setCategory] = React.useState(
    state?.category || data_category[0],
  );

  useEffect(() => {
    handleStateManager({
      location,
      category,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, category]);

  return (
    <View style={styles.container}>
      <TextComponent
        style={{
          color: Color.black,
          marginLeft: 32,
          marginTop: 16,
        }}>
        {lang.select_location}
      </TextComponent>

      <View style={styles.containerPosition}>
        {data_state.map((loc, index) => (
          <CustomButton
            textTextColor={loc === location ? Color.white : Color.gray_100}
            key={index}
            title={loc}
            onPress={() => {
              setLocation(loc);
            }}
            buttonStyle={[
              {
                margin: 8,
                borderRadius: 26,
                backgroundColor: loc === location ? Color.secondary : 'white',
              },
              boxShadow,
            ]}
          />
        ))}
      </View>

      <TextComponent
        style={{
          color: Color.black,
          marginLeft: 32,
        }}>
        {lang.select_category}
      </TextComponent>
      <View style={styles.containerPosition}>
        {data_category.map((cat, index) => (
          <CustomButton
            textTextColor={cat === category ? Color.white : Color.gray_100}
            key={index}
            title={cat}
            onPress={() => {
              setCategory(cat);
            }}
            buttonStyle={[
              {
                margin: 8,
                borderRadius: 26,
                backgroundColor: cat === category ? Color.secondary : 'white',
              },
              boxShadow,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerPosition: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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

export default Location;
