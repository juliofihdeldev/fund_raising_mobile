import React, {useEffect, useCallback, useRef, useState} from 'react';
import {
  FlatList,
  View,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  Animated,
  Linking,
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
import withLoadingFresh from '../../component/HOC/RefreshLoading';

import {FlashList} from '@shopify/flash-list';
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

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 124);

  const translateY = diffClamp.interpolate({
    inputRange: [0, 124],
    outputRange: [0, -124],
  });

  const [refreshing, setRefreshing] = React.useState(false);

  const nextPageIdentifierRef = useRef();
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      handleGetFundraising();
    }, 1000);
  }, []);

  const handleDeepLink = useCallback(() => {
    Linking.addEventListener('url', handleUrl);

    return () => {
      Linking.removeAllListeners('url');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUrl = useCallback(
    (event: any) => {
      console.log('path', event.url);

      let path = getIdAndPathFromLink(event.url)?.path;
      let id = getIdAndPathFromLink(event.url)?.id;
      console.log('[id,path]', [path, id]);

      let project = {
        item: {
          id,
          path,
        },
      };

      if (path === '/fundraising') {
        // Navigate to the detail page with the extracted ID
        navigation.navigate('FeedDetails', {
          project: project.item,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    handleDeepLink();

    return () => {
      Linking.removeAllListeners('url');
    };
  }, [handleDeepLink, handleUrl]);

  interface IdAndPath {
    path: string;
    id: string | null;
  }

  function getIdAndPathFromLink(link: string): IdAndPath | null {
    const match = link.match(/\/fundraising\/([^/]+)/);

    if (match && match[1]) {
      const path = '/fundraising';
      const id = match[1];
      return {path, id};
    }

    return null;
  }

  const goToSearch = () => {
    navigation.navigate('Search');
  };
  // scrool infinite
  const fetchNextPage = () => {
    if (nextPageIdentifierRef.current == null) {
      // End of data.
      return;
    }
    // handleGetFundraising();
  };

  const handleDynamicLink = (link: any) => {
    // Handle dynamic link inside your own application
    if (link.url === 'https://potekole.page.link/ede') {
      // ...navigate to your offers screen
      navigation.navigate('Feed');
    }
  };

  //   useEffect(() => {
  //     const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
  //     // When the component is unmounted, remove the listener
  //     return () => unsubscribe();
  //   }, []);
  //
  //   useEffect(() => {
  //     dynamicLinks()
  //       .getInitialLink()
  //       .then((link: any) => {
  //         if (link.url === 'https://potekole.page.link/ede') {
  //           // ...set initial route as offers screen
  //           navigation.navigate('Favorite');
  //         }
  //       });
  //   }, []);

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Animated.View
        style={[
          styles.headerStyle,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: translateY ? '#fff' : 'transparent',
            transform: [{translateY: translateY}],
          },
        ]}>
        <CustomHeader goToSearch={goToSearch} />
        <CustomView style={styles.separator} />
      </Animated.View>

      <ReactScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={Color.primary}
            colors={[Color.white]}
            titleColor={Color.primary}
          />
        }
        onScroll={e => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}>
        <CustomView style={styles.categoryContainer}>
          <ReactScrollView horizontal={true}>
            <FlatList
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
                          ? Color.secondary
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

        <CustomView>
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

          <FlatList
            horizontal={true}
            data={fundraising.filter(
              item => item.is_emergency && item.status === 'Active',
            )}
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
        </CustomView>

        <ReactScrollView style={styles.mainSectionStyle}>
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

          <ScrollView>
            <FlashList
              estimatedItemSize={200}
              onEndReached={fetchNextPage}
              onEndReachedThreshold={0.8}
              horizontal={false}
              data={
                selectedId.name === 'Toutes'
                  ? fundraising.filter(item => item.status === 'Active')
                  : (fundraising.filter(
                      item =>
                        item.category === selectedId?.name &&
                        item.status === 'Active',
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
          </ScrollView>
        </ReactScrollView>
      </ReactScrollView>
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
  headerStyle: {
    position: 'absolute',
    zIndex: 1,
    paddingStart: 8,
    width: '100%',
    justifyContent: 'space-between',
  },
  mainSectionStyle: {
    backgroundColor: Color.white,
  },
  categoryContainer: {
    marginTop: 80,
    marginBottom: 16,
    backgroundColor: Color.white,
  },
  separator: {
    height: 0,
    width: '100%',
    backgroundColor: 'white',
  },
});

const FeedWithLoading = withLoadingFresh(Feed, 'Please wait...');

export default FeedWithLoading;
