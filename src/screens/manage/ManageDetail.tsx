import React from 'react';
import {View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {GlobalStyles} from '../feed/GlobalStyle';
import TextComponent from '../../component/atom/CustomText';
import CustomProgressBar from '../../component/atom/CustomProgressBar';
import {useFunding} from '../../context/FundingContext';
import CustomImage from '../../component/atom/CustomImage';
import {currency} from '../../utils/currency';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '../../navigations/MainNavigation';
import {useLang} from '../../context/LanguageContext';
import ManageOption from './ManageOptions';
import CustomButton from '../../component/atom/CustomButton';
import {Color} from '../../assets/GlobalStyles';
import CustomBanner from '../../component/atom/CustomBanner';

type FeedDetailsScreenNavigationProp = StackNavigationProp<
  FeedStackParamList,
  'FeedDetails'
>;

interface Props {
  navigation: FeedDetailsScreenNavigationProp;
}

const ManageDetail: React.FC<Props> = ({navigation}) => {
  const {lang} = useLang();
  const {projects} = useFunding();
  const [readMore, setReadMore] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);

  const handleSetReadMore = () => {
    setReadMore(!readMore);
  };
  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <SafeAreaView>
      {showMenu && (
        <ManageOption
          navigation={navigation}
          projects={projects}
          onClose={() => setShowMenu(false)}
        />
      )}
      <ScrollView>
        <View style={GlobalStyles.containerDetailsItem}>
          <View style={GlobalStyles.projectContainerDetails}>
            <View>
              <View style={[GlobalStyles.imagesView]}>
                {projects.list_images?.length ? (
                  <CustomBanner images={projects.list_images} />
                ) : (
                  <CustomImage
                    image={projects?.image}
                    style={GlobalStyles.image}
                  />
                )}
              </View>

              <View style={GlobalStyles.contentText}>
                <TextComponent
                  style={[GlobalStyles.goalTextBold, {marginTop: 12}]}
                  numberOfLines={3}>
                  {projects?.name}
                </TextComponent>
                <CustomProgressBar
                  value={
                    projects?.collect
                      ? parseInt((projects?.collect * 100) / projects?.amount)
                      : 0
                  }
                />

                <View style={GlobalStyles.contentTextPrice}>
                  <TextComponent
                    style={[GlobalStyles.goalText, {marginTop: 12}]}
                    numberOfLines={2}>
                    {lang?.a_collecte} {currency(projects?.collect)} {lang?.of}{' '}
                    {currency(projects?.amount)} {lang?.it_needs}
                  </TextComponent>
                </View>

                <View>
                  <TextComponent
                    style={{
                      marginTop: 16,
                      paddingVertical: 12,
                      backgroundColor: Color.white,
                      borderBottomColor: '#000',
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      borderTopColor: '#000',
                    }}>
                    {lang?.collect_start_date} {projects?.date} -{' '}
                    {projects?.category}
                  </TextComponent>

                  <TextComponent
                    numberOfLines={readMore ? null : 5}
                    style={[GlobalStyles.description, {marginTop: 16}]}>
                    {projects?.description}
                  </TextComponent>

                  <TouchableOpacity
                    style={GlobalStyles.contentTextPrice}
                    onPress={handleSetReadMore}>
                    <TextComponent fontWeight="bold">
                      {!readMore ? lang?.read_more : lang?.read_less}
                    </TextComponent>
                  </TouchableOpacity>
                </View>

                <CustomButton
                  title={lang?.menu}
                  onPress={handleMenu}
                  buttonStyle={{
                    backgroundColor: Color.primary,
                    width: '25%',
                    borderRadius: 26,
                    marginTop: 16,
                  }}
                  textStyle={{color: '#fff'}}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageDetail;
