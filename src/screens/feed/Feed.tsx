import React from 'react';
import {
  FlatList,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView as ReactScrollView,
} from 'react-native';

import {ProjectType} from '../../types/Index';
import ItemDonation from '../../component/ItemDonation';
import Category from '../../component/Category';
import {Color} from '../../assets/GlobalStyles';
import ItemDonationVertical from '../../component/ItemDonationVertical';
import {GlobalStyles} from './GlobalStyle';
import {ScrollView} from 'react-native-virtualized-view';
import CustomHeader from '../../component/CustomHeader';
import CustomButton from '../../component/atom/CustomButton';
import {useLang} from '../../context/LanguageContext';
import TextComponent from '../../component/atom/CustomText';
import CustomView from '../../component/atom/CustomView';
import {useFunding} from '../../context/FundingContext';

let category = [
  {
    id: '1',
    title: 'Toutes',
    name: 'Toutes',
    iconName: 'grid-outline',
    iconSize: 32,
  },
  {
    id: '2',
    title: 'Charite',
    name: 'Charite',
    iconName: 'cart-outline',
    iconSize: 32,
  },
  {
    id: '3',
    title: 'Sante',
    name: 'Sante',
    iconName: 'medkit-outline',
    iconSize: 32,
  },
  {
    id: '4',
    title: 'Education',
    name: 'Education',
    iconName: 'school-outline',
    iconSize: 32,
  },
  {
    id: '5',
    title: 'Nature',
    name: 'Nature',
    iconName: 'leaf-outline',
    iconSize: 32,
  },
];

const Feed: React.FC<ProjectType> = ({navigation}: any) => {
  const [selectedId, setSelectedId] = React.useState(category[0]);

  const {fundraising, handleGetFundraising} = useFunding();
  const {lang} = useLang();

  React.useEffect(() => {
    handleGetFundraising();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <CustomHeader />
      <ScrollView>
        <CustomView style={styles.flexStartItem}>
          <CustomButton
            title={lang.start_fundraising}
            onPress={() => console.log('Button')}
            buttonStyle={styles.buttonStyle}
          />
        </CustomView>

        <CustomView style={GlobalStyles.categoryContainer}>
          <ReactScrollView alwaysBounceHorizontal={true} horizontal={true}>
            <FlatList
              alwaysBounceHorizontal={true}
              horizontal={true}
              data={category}
              renderItem={({item}) => (
                <Category
                  iconName={item.iconName}
                  title={item.title}
                  fontSize={13}
                  iconSize={item.iconSize}
                  onPress={() => setSelectedId(item)}
                  style={[
                    GlobalStyles.category,
                    {
                      backgroundColor:
                        item.id === selectedId.id
                          ? Color.primary
                          : Color.grayLight,
                    },
                  ]}
                  color={item.id === selectedId.id ? Color.white : Color.black}
                  styleContainer={GlobalStyles.styleContainer}
                />
              )}
              keyExtractor={item => item.id}
              contentContainerStyle={GlobalStyles.container}
            />
          </ReactScrollView>
        </CustomView>

        <CustomView style={GlobalStyles.forestContainer}>
          <View style={styles.sectionStyles}>
            <TextComponent fontSize={19} fontWeight="bold">
              {lang.popular}
            </TextComponent>

            <CustomButton
              title={lang.view_all}
              textTextColor={Color.primary}
              onPress={() => console.log('Button')}
              buttonStyle={styles.actionButtonStyles}
              textStyle={{color: Color.primary}}
            />
          </View>
          {/* <ScrollView horizontal={true}> */}
          <FlatList
            horizontal={true}
            data={fundraising as ProjectType[]}
            renderItem={project => (
              <View style={GlobalStyles.projectContainer}>
                <ItemDonation
                  project={project}
                  onPress={() => {
                    navigation.navigate('FeedDetails', {
                      project: project.item,
                    });
                  }}
                />
              </View>
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={GlobalStyles.container}
          />
          {/* </ScrollView> */}
        </CustomView>

        <CustomView>
          <View style={styles.sectionStyles}>
            <TextComponent fontSize={19} fontWeight="bold">
              {selectedId.title}
            </TextComponent>

            <CustomButton
              title={lang.view_all}
              textTextColor={Color.primary}
              onPress={() => console.log('Button')}
              buttonStyle={styles.actionButtonStyles}
              textStyle={{color: Color.primary}}
            />
          </View>

          <FlatList
            horizontal={false}
            data={
              selectedId.name === 'Toutes'
                ? fundraising
                : (fundraising.filter(
                    item => item.category === selectedId?.name,
                  ) as ProjectType[])
            }
            renderItem={project => (
              <View style={GlobalStyles.projectItem}>
                <ItemDonationVertical
                  project={project}
                  onPress={() => {
                    navigation.navigate('FeedDetails', {
                      project: project.item,
                    });
                  }}
                />
              </View>
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={GlobalStyles.container}
          />
        </CustomView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexStartItem: {
    alignItems: 'flex-start',
  },
  buttonStyle: {
    backgroundColor: Color.secondary,
    width: '60%',
    borderRadius: 26,
  },
  marginRight: {
    marginRight: 4,
  },
  sectionStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    paddingHorizontal: 8,
  },
  actionButtonStyles: {
    backgroundColor: 'transparent',
    width: '30%',
    borderRadius: 26,
  },
});
export default Feed;
