import React, {useEffect, useCallback, useRef} from 'react';
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
import CustomButton from '../../component/atom/CustomButton';
import {useLang} from '../../context/LanguageContext';
import TextComponent from '../../component/atom/CustomText';

import {useFunding} from '../../context/FundingContext';
import withLoadingFresh from '../../component/HOC/RefreshLoading';

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

  const {lang, _setLoading} = useLang();

  const scrollRef = useRef<ReactScrollView>();

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 124);

  const [refreshing, setRefreshing] = React.useState(false);
  const nextPageIdentifierRef = useRef();

  useEffect(() => {
    _setLoading(false);
    handleGetFundraising();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // setTimeout(() => {
    handleGetFundraising();
    setRefreshing(false);
    // }, 250);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // scrool infinite
  const fetchNextPage = () => {
    if (nextPageIdentifierRef.current == null) {
      // End of data.
      return;
    }
    // handleGetFundraising();
  };

  const handleCategory = useCallback((item: any) => {
    scrollRef.current?.scrollTo({
      y: 490,
      x: 0,
      animated: true,
    });

    setSelectedId(item);
  }, []);

  return (
    <SafeAreaView style={GlobalStyles.container}>
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
        <View style={styles.categoryContainer}>
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
                        item?.id?.toString() === selectedId.id
                          ? Color.secondary
                          : Color.grayLight,
                    },
                  ]}
                  color={
                    item?.id?.toString() === selectedId.id
                      ? Color.white
                      : Color.black
                  }
                  styleContainer={GlobalStyles.styleContainer}
                />
              )}
              keyExtractor={item => item?.id?.toString()!}
              contentContainerStyle={GlobalStyles.container}
            />
          </ReactScrollView>
        </View>

        <View>
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
              keyExtractor={item => item?.id?.toString()!}
              contentContainerStyle={GlobalStyles.container}
            />
          </ReactScrollView>
        </View>

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

          <FlatList
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
            keyExtractor={item => item?.id?.toString()!}
            contentContainerStyle={GlobalStyles.container}
          />
        </ReactScrollView>
      </ReactScrollView>
      {isFileUploaded && (
        <View style={styles.headerPublication}>
          <View style={styles.contentPublication}>
            <CustomImage
              image={state?.list_images && state?.list_images[0]}
              style={styles.imageSize}
            />
            <TextComponent fontSize={13} style={styles.imageMargin}>
              Laissez l'application ouverte pour terminer la publication...
            </TextComponent>
          </View>
          <CustomProgressBar value={fileUploadedProgress} />
        </View>
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
    marginBottom: 16,
    backgroundColor: Color.white,
  },
  separator: {
    height: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  headerPublication: {
    height: 60,
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 22,
  },
  contentPublication: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '94%',
    padding: 4,
  },
  imageSize: {
    width: 40,
    height: 40,
  },
  imageMargin: {marginLeft: 12, marginTop: 4, marginEnd: 14},
});

const FeedWithLoading = withLoadingFresh(Feed, '', false);

export default FeedWithLoading;
