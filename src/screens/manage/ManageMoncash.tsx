import React from 'react';
import {FlatList, View, SafeAreaView, Alert} from 'react-native';

import {GlobalStyles} from '../feed/GlobalStyle';

import TextComponent from '../../component/atom/CustomText';
import UserDonation from '../../component/UserDonation';
import {useFunding} from '../../context/FundingContext';
import {currency} from '../../utils/currency';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '../../navigations/MainNavigation';
import CustomButton from '../../component/atom/CustomButton';
import {Color, boxShadow} from '../../assets/GlobalStyles';
import {DonationType} from '../../types/Index';

import withLoadingModal from '../../component/HOC/Loading';

type FeedDetailsScreenNavigationProp = StackNavigationProp<
  FeedStackParamList,
  'FeedDetails'
>;

interface Props {
  navigation: FeedDetailsScreenNavigationProp;
  setLoading: (isLoading: boolean) => void;
}

const ManageMoncash: React.FC<Props> = ({navigation, setLoading}) => {
  const {donations, handleGetDonations} = useFunding();

  const [filterDonation] = React.useState(
    donations.filter(item => item?.status == 'Need Approval'),
  );

  const handleApprove = async (item: DonationType) => {
    setLoading(true);

    try {
      //       await firestore().collection('donations').doc(item?.id?.toString()).update({
      //         status: 'Approved',
      //       });
      //
      //       item = {...item, status: 'Approved'};
      //
      //       //update project add the donation item to the project
      //       await firestore()
      //         .collection('fundraising')
      //         .doc(item.project_id!)
      //         .update({
      //           donation: firestore.FieldValue.arrayUnion(item),
      //         });

      setTimeout(() => setLoading(false), 2000);

      Alert.alert(
        'Success',
        'Depot moncash approuvé avec succès',
        [
          {
            text: 'Ok',
            onPress: () => {
              handleGetDonations(item.project_id!);
              navigation.goBack();
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert(
        'Error',
        "Une erreur est survenue lors de l'approbation du depot moncash",
      );
    }
  };

  const handleReject = async (item: DonationType) => {
    setLoading(true);
    await firestore().collection('donations').doc(item?.id?.toString()).update({
      status: 'Rejected',
    });
    setTimeout(() => setLoading(false), 2000);

    Alert.alert(
      'Success',
      'Depot moncash rejeté avec succès',
      [
        {
          text: 'Ok',
          onPress: () => {
            handleGetDonations(item.project_id!);
            navigation.goBack();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleApprovePayment = (item: DonationType) => {
    Alert.alert(
      'Approuver',
      'Voulez-vous vraiment approuver ce dépôt MonCash ?',
      [
        {
          text: 'Annuler',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Approver', onPress: () => handleApprove(item)},
      ],
      {cancelable: false},
    );
  };

  const handleRejectPayment = (item: DonationType) => {
    Alert.alert(
      'Rejecter',
      'Voulez-vous vraiment rejeter ce dépôt MonCash ?',
      [
        {
          text: 'Annuler',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Oui Rejeter', onPress: () => handleReject(item)},
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={GlobalStyles.containerDetailsItem}>
        <View style={GlobalStyles.projectContainerDetails}>
          <View style={GlobalStyles.contentText}>
            <View>
              <TextComponent fontFamily="Montserrat-Bold" numberOfLines={4}>
                {filterDonation.length > 0 &&
                  'Il vous reste à  Valider pour ' +
                    currency(
                      filterDonation
                        .reduce((a, b) => a + (b.amount || 0), 0)
                        ?.toFixed(2),
                    ) +
                    ' de dépôt MonCash'}
              </TextComponent>

              <View
                style={{
                  backgroundColor: 'transparent',
                }}>
                <TextComponent
                  style={[
                    GlobalStyles.goalTextBold,
                    {
                      marginTop: 12,
                      fontSize: 15,
                    },
                  ]}>
                  {filterDonation.length > 0 &&
                    `${filterDonation.length}  depot moncash est en attente de validation`}
                </TextComponent>

                {filterDonation.length == 0 && (
                  <TextComponent
                    style={[
                      GlobalStyles.goalTextBold,
                      {
                        marginTop: 12,
                        fontSize: 15,
                        fontWeight: 'normal',
                        justifyContent: 'center',
                      },
                    ]}>
                    {`Aucun depot moncash en attente de validation. \n\nSi pensiez avoir des depot moncash en attente de validation, veuillez vous rapprocher de l'administrateur de la plateforme. 
                    `}
                  </TextComponent>
                )}
                <FlatList
                  horizontal={false}
                  data={filterDonation}
                  renderItem={({item}) => (
                    <UserDonation
                      onPress={() => {}}
                      image={item?.image}
                      name={item?.user_name}
                      amount={item?.amount}
                      item={item}
                      contactButton={() => (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                          }}>
                          <CustomButton
                            size="small"
                            title="Valider"
                            onPress={() => handleApprovePayment(item)}
                            buttonStyle={[
                              {
                                position: 'absolute',
                                right: 74,
                                top: -56,
                                backgroundColor: Color.primary,
                                width: 70,
                                borderRadius: 26,
                                marginTop: 8,
                              },
                              boxShadow,
                            ]}
                            textStyle={{color: '#fff'}}
                          />

                          <CustomButton
                            size="small"
                            title="Reject"
                            onPress={() => handleRejectPayment(item)}
                            buttonStyle={[
                              {
                                position: 'absolute',
                                right: 0,
                                top: -56,
                                backgroundColor: Color.secondary,
                                width: 70,
                                borderRadius: 26,
                                marginTop: 8,
                              },
                              boxShadow,
                            ]}
                            textStyle={{color: '#fff'}}
                          />
                        </View>
                      )}
                    />
                  )}
                  keyExtractor={item => item?.id?.toString()}
                  contentContainerStyle={GlobalStyles.container}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const ManageMoncashWithLoading = withLoadingModal(
  ManageMoncash,
  'Please wait...',
);
export default ManageMoncashWithLoading;
