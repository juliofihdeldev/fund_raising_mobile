import React, {useEffect, useCallback} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';

import {GlobalStyles} from './GlobalStyle';
import {useFunding} from '../../context/FundingContext';
import ItemDonationVertical from '../../component/ItemDonationVertical';
import {useAuth} from '../../context/AuthContext';
import EmptyComponent from '../../component/atom/EmptyComponent';
import TextComponent from '../../component/atom/CustomText';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '../../navigations/MainNavigation';
import {Color} from '../../assets/GlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomView from '../../component/atom/CustomView';

import {filter_fundraising} from '../../utils/filter_fundraising';
import Category from '../../component/Category';
import {FlatList} from 'react-native';
import {useLang} from '../../context/LanguageContext';

type HistoryScreenNavigationProp = StackNavigationProp<
  FeedStackParamList,
  'FeedDetails'
>;

interface Props {
  navigation: HistoryScreenNavigationProp;
}

const History: React.FC<Props> = ({navigation}) => {
  const {
    projects,
    fundraising,
    handleGetProjectByUserId,
    handleGetFundraising,
  } = useFunding();

  //
  const {user} = useAuth();
  const [status, setStatus] = React.useState(filter_fundraising[0]);
  const {lang} = useLang();
  navigation.setOptions({
    title: 'Back to Profile',
    headerTitleStyle: {
      color: Color.black,
      fontSize: 16,
      fontFamily: 'Montserrat-Bold',
    },
    headerLeft: () => (
      <Ionicons
        name="close"
        size={26}
        onPress={() => navigation.goBack()}
        style={{
          padding: 12,
          color: Color.black,
        }}
      />
    ),
  });

  useEffect(() => {
    if (user) {
      if (user?.role == 1) {
        handleGetFundraisingWithCallback();
      } else {
        handleGetProjectWithCallback();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const handleGetFundraisingWithCallback = useCallback(() => {
    handleGetFundraising();
  }, [handleGetFundraising]);

  const handleGetProjectWithCallback = useCallback(() => {
    handleGetProjectByUserId(user.id!);
  }, [handleGetProjectByUserId, user.id]);

  const handleCaterogy = (cat: any) => {
    setStatus(cat);
  };

  let data =
    user?.role == 1
      ? fundraising?.filter(f => f?.status === status?.name)
      : projects?.filter(p => p?.status === status?.name);

  return (
    <SafeAreaView style={[styles.container]}>
      <CustomView style={styles.customViewStyle}>
        {projects?.length === 0 && (
          <EmptyComponent>
            <TextComponent>No Project</TextComponent>
          </EmptyComponent>
        )}
      </CustomView>

      <TextComponent fontSize={21} style={styles.textStyle}>
        {user?.role !== 1 ? 'All Fundraising' : lang?.my_fundraising}
      </TextComponent>

      <View style={GlobalStyles.categoryContainer}>
        {filter_fundraising.map((cat, index) => (
          <Category
            key={index}
            iconName={cat.icon}
            title={cat.name}
            iconSize={32}
            onPress={() => {
              handleCaterogy(cat);
            }}
            style={[
              GlobalStyles.category,
              {
                backgroundColor:
                  cat.id == status.id ? Color.primary : Color.secondaryLight,
              },
            ]}
            color={Color.white}
            styleContainer={[GlobalStyles.styleContainer]}
          />
        ))}
      </View>
      <View
        style={{
          marginTop: 16,
        }}
      />

      <FlatList
        data={data}
        renderItem={project => (
          <View style={[GlobalStyles.projectItem, {marginRight: 24}]}>
            <ItemDonationVertical
              project={project}
              onPress={() => {
                navigation.navigate('ManageFundrasing', {
                  project: project?.item,
                });
              }}
            />
          </View>
        )}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={GlobalStyles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: Color.black,
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 18,
  },
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: Color.white,
  },
  customViewStyle: {
    alignItems: 'flex-start',
  },
});
export default History;
