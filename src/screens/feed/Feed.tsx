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
import CustomProgressBar from '../../component/atom/CustomProgressBar';
import {category} from '../../utils/category';
import {getIdAndPathFromLink} from '../../utils/getIdAndPathFromLink';
import CustomImage from '../../component/atom/CustomImage';

const Feed: React.FC<ProjectType> = ({navigation}: any) => {
  const [selectedId, setSelectedId] = React.useState(category[0]);
  const {
    fundraising,
    handleGetFundraising,
    isFileUploaded,
    fileUploadedProgress,
    state,
  } = useFunding();
  const {lang} = useLang();

  const scrollRef = useRef<ReactScrollView>();

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 124);

  const translateY = diffClamp.interpolate({
    inputRange: [0, 124],
    outputRange: [0, -124],
  });

  const [refreshing, setRefreshing] = React.useState(false);
  const nextPageIdentifierRef = useRef();

  React.useEffect(() => {
    handleGetFundraising();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      let path = getIdAndPathFromLink(event.url)?.path;
      let id = getIdAndPathFromLink(event.url)?.id;
      console.log('[id,path]', [path, id]);

      let project = {
        item: {
          id,
          path,
        },
      };

      if (id === 'checkout') {
        navigation.navigate('Feed', {
          // project: project.item,
        });
        return;
      }

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

  const handleCategory = (item: any) => {
    // scrool to top when change category
    scrollRef.current?.scrollTo({
      y: 490,
      x: 0,
      animated: true,
    });

    setSelectedId(item);
  };

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
        ref={scrollRef}
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
                  onPress={() => handleCategory(item as any)}
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
              onPress={() =>
                navigation.navigate('AllFundraising', {
                  category: 'All Categories',
                })
              }
              buttonStyle={styles.actionButtonStyles}
              textStyle={{color: Color.primary}}
            />
          </View>
          <ReactScrollView horizontal={true}>
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
          </ReactScrollView>
        </CustomView>

        <ReactScrollView style={styles.mainSectionStyle}>
          <View style={styles.sectionStyles}>
            <TextComponent fontSize={19} fontWeight="bold">
              {selectedId.title}
            </TextComponent>

            <CustomButton
              title={lang.view_all}
              textTextColor={Color.primary}
              onPress={() =>
                navigation.navigate('AllFundraising', {
                  category: selectedId.name,
                })
              }
              buttonStyle={styles.actionButtonStyles}
              textStyle={{color: Color.primary}}
            />
          </View>

          <FlashList
            estimatedItemSize={300}
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
        </ReactScrollView>
      </ReactScrollView>
      {isFileUploaded && (
        <CustomView
          style={{
            height: 40,
            padding: 10,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginBottom: 22,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              width: '94%',
              padding: 4,
            }}>
            <CustomImage
              image={state?.list_images && state?.list_images[0]}
              style={{width: 30, height: 30}}
            />
            <TextComponent fontSize={13} style={{marginLeft: 12}}>
              Laissez l'application ouverte pour terminer la publication...
            </TextComponent>
          </View>
          <CustomProgressBar value={fileUploadedProgress} />
        </CustomView>
      )}
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

const FeedWithLoading = withLoadingFresh(Feed);

export default FeedWithLoading;
