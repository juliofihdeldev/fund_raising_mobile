import React, {ReactNode, createContext, useContext} from 'react';
import {Alert} from 'react-native';
import {
  DonationType,
  MessageType,
  PaymentType,
  ProjectType,
} from '../types/Index';
import {useAuth} from './AuthContext';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useLang} from './LanguageContext';
import firebase from '@react-native-firebase/app';

interface FundingContextProps {
  state: ProjectType;
  handleStateManager: (data: ProjectType) => void;
  handleSaveState: () => void;
  handleGetFundraising: () => void;
  handleGetDonations: (project_id: string) => void;
  handleGetDonationsByUserId: (user_id: string) => void;
  handleGetProjectByID: (project_id: string) => void;
  handleGetProjectByUserId: (user_id: string) => void;
  handleGetMessagesByID: (project_id: string) => void;
  updateFundraising: (project_id: string) => void;
  updateFundraisingStatus: (project_id: string, data: ProjectType) => void;
  updateFundraisingViews: (project_id: string, data: ProjectType) => void;
  handleAddMoncashPayment: (data: any) => void;
  handleAdduserMoncashPayment: (data: any) => void;
  fundraising: ProjectType[];
  projects: ProjectType[];
  donations: DonationType[];
  messages: MessageType[];
  donationsUser: DonationType[];
  isFileUploaded: boolean;
  fileUploadedProgress: number;
}

const FundingContext = createContext<FundingContextProps | undefined>(
  undefined,
);

export const useFunding = (): FundingContextProps => {
  const context = useContext(FundingContext);

  if (!context) {
    throw new Error('useFunding must be used within an FundingContextProvider');
  }
  return context;
};

interface FundingContextProviderProps {
  children: ReactNode;
}
export const FundingContextProvider: React.FC<FundingContextProviderProps> = ({
  children,
}) => {
  const [state, setState] = React.useState<ProjectType>({} as ProjectType);
  const [isFileUploaded, setIsFileUploaded] = React.useState<boolean>(false);
  const [fileUploadedProgress, setFileUploadedProgress] = React.useState(10);

  const {user} = useAuth();
  const {lang, _setLoading} = useLang();
  const [fundraising, setFundraising] = React.useState([]);

  const [projects, setProjects] = React.useState<ProjectType>(
    {} as ProjectType,
  );

  const [donations, setDonations] = React.useState([]);
  const [donationsUser, setDonationsUser] = React.useState([]);
  const [messages, setMessages] = React.useState<MessageType>(
    [] as MessageType,
  );

  const ref = firestore().collection('fundraising');

  const handleStateManager = (data: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    setState(prevState => ({...prevState, ...data}));
  };

  async function sendMediaToStorage() {
    if (state?.image?.length! > 0) {
      setIsFileUploaded(true);
      const reference = storage().ref(
        `fundraising/${new Date().toISOString()}`,
      );
      await reference.putFile(String(state?.image));
      const downloadURL = await reference.getDownloadURL();
      return downloadURL;
    } else {
      return 'https://ortoday.com/wp-content/uploads/2020/07/eq-1024x640.jpg';
    }
  }

  async function sendMultipleFiles() {
    let arrayOfImages = [] as string[];

    const reference = storage().ref(`fundraising/${new Date().toISOString()}`);
    for (let i = 0; i < state?.list_images?.length!; i++) {
      // setTimeout(() => console.log('wait fake internet'), 3000);
      const element = state?.list_images![i];
      await reference.putFile(String(element));
      const downloadURL = await reference.getDownloadURL();
      arrayOfImages.push(downloadURL);
      setFileUploadedProgress((i / state?.list_images?.length!) * 100);
    }
    return arrayOfImages;
  }

  const handleGetProjectByID = async (project_id: string) => {
    _setLoading(true);
    let project: ProjectType = {} as ProjectType;

    await ref
      .doc(project_id)
      .get()
      .then(doc => {
        if (doc.exists) {
          project = {
            id: doc.id,
            ...doc.data(),
          } as ProjectType;
          setProjects(project);
        } else {
          setProjects({} as ProjectType);
        }
      });
    _setLoading(false);
  };

  const handleGetProjectByUserId = async (userId: string) => {
    _setLoading(true);

    try {
      const dataArray = [] as ProjectType[];
      await ref
        .where('user.id', '==', userId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const d = {
              id: doc.id,
              ...doc.data(),
            } as ProjectType;

            dataArray.push(d);
          });

          setProjects(dataArray);
        });
    } catch (error) {
      Alert.alert('Error', JSON.stringify(error));
    }
    _setLoading(false);
  };

  const handleSaveState = async () => {
    try {
      _setLoading(false);
      setIsFileUploaded(true);
      const list_images = await sendMultipleFiles();
      const img = list_images[0]; // await sendMediaToStorage();
      const dateValue = new Date().toDateString().toString();
      const _user = user;
      delete _user?.donations;

      const formatData: ProjectType = {
        date: dateValue,
        name: state?.name,
        description: state?.description,
        amount: state?.amount,
        category: state?.category,
        collect: 0,
        status: 'Pending Review',
        image: img,
        list_images: list_images,
        video_url: state?.video_url,
        donation: [],
        isBlocked: false,
        is_emergency: Math.random() >= 0.3,
        user: _user,
      };

      await ref.add(formatData);

      setFundraising((prevState: ProjectType) => [...prevState, formatData]);

      _setLoading(false);

      Alert.alert(lang?.warning, lang?.fundraising_created, [
        {
          text: "J'ai compris",
          onPress: () => null,
        },
      ]);
      setIsFileUploaded(false);
    } catch (error) {
      _setLoading(false);
      console.log('Error  file:', error);
      Alert.alert('Error', JSON.stringify(error), [
        {
          text: 'OK',
          onPress: () => null,
        },
      ]);
      setState({} as ProjectType);
      setIsFileUploaded(false);
    }
  };

  const updateFundraising = async id => {
    _setLoading(true);

    const hasSeletetedNewImage =
      state?.image?.includes('firebasestorage') === true ? false : true;

    const img = hasSeletetedNewImage ? await sendMediaToStorage() : '';

    let formatData: ProjectType = {
      name: state?.name,
      description: state?.description,
      amount: state?.amount,
      category: state?.category,
      video_url: state?.video_url,
      hasUpdated: true,
      lastUpdated: new Date().toDateString().toString(),
    };

    formatData = hasSeletetedNewImage
      ? {...formatData, image: img || ''}
      : formatData;
    try {
      await ref.doc(id).update(formatData);

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: lang?.success,
        textBody: lang?.modifie_succes,
      });
    } catch (error) {
      console.error('Error:', error);

      Alert.alert('Error', JSON.stringify(error), [
        {
          text: 'OK',
          onPress: () => null,
        },
      ]);
    }
    _setLoading(false);
  };

  const updateFundraisingStatus = async (id: string, data: ProjectType) => {
    _setLoading(true);
    await ref
      .doc(id)
      .update(data)
      .then(() => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: lang?.success,
          textBody: lang?.modifie_succes,
        });
        handleGetFundraising();
      })
      .catch(error => {
        Alert.alert('Error', JSON.stringify(error), [
          {
            text: 'OK',
            onPress: () => null,
          },
        ]);
      });
    _setLoading(false);
  };

  const updateFundraisingViews = async (id: string, data: ProjectType) => {
    await ref.doc(id).update(data);
  };

  const handleGetFundraising = async () => {
    _setLoading(true);
    const fundraisingArray: ProjectType[] = [];
    await ref.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };

        fundraisingArray.push(obj as ProjectType);
      });
    });

    setFundraising(fundraisingArray);
    console.log('renderTime');
    _setLoading(false);
  };

  const handleGetDonations = async (project_id: string) => {
    _setLoading(true);

    const donationsArray: ProjectType[] = [];

    const refDonation = await firestore()
      .collection('donations')
      .where('project_id', '==', project_id)
      .get();

    refDonation.forEach(doc => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      donationsArray.push(obj as ProjectType);
    });

    setDonations(donationsArray);
    _setLoading(false);
  };

  const handleGetDonationsByUserId = async (user_id: string) => {
    _setLoading(true);
    const donationsArray: ProjectType[] = [];
    const refDonation = await firestore()
      .collection('donations')
      .where('user_id', '==', user_id)
      .get();

    refDonation.forEach(doc => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      donationsArray.push(obj as ProjectType);
    });
    setDonationsUser(donationsArray);
    _setLoading(false);
  };

  const handleGetMessagesByID = async (project_id: string) => {
    const messagesArray: MessageType[] = [];

    const refMessages = await firestore()
      .collection('messages')
      .where('project_id', '==', project_id)
      .get();

    refMessages.forEach(doc => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      messagesArray.push(obj as MessageType);
    });
    setMessages(messagesArray as MessageType);
  };

  const handleAddMoncashPayment = (data: any) => {
    try {
      const save_donation_object = {
        amount: Number(data?.amount),
        user_name: data.user.name,
        user_email: data.user.email,
        user_id: data.user.id,
        image: data?.user?.image,

        project_name: data.project.name,
        project_id: data.project.id,
        tipAmount: 0,
        date: new Date().toDateString().toString(),
        status: 'Need Approval',
        payment_method: 'Moncash',
      };

      // Ref in database
      const ref_fundraising = firestore().collection('fundraising');
      const donationRef = firestore().collection('donations');
      const userRef = firestore().collection('users');

      _setLoading(true);
      donationRef.add(save_donation_object);

      userRef.doc(data.user?.id).update({
        donations:
          firebase.firestore.FieldValue.arrayUnion(save_donation_object),
      });

      // we will update the fundraising on validation process

      // ref_fundraising.doc(data?.project.id).update({
      //   collect: firebase.firestore.FieldValue.increment(Number(data?.amount)),
      //   donation: firebase.firestore.FieldValue.arrayUnion(save_donation_object),
      // });

      console.log('Document successfully updated.');

      Alert.alert(
        'Confirmation',
        'Depo an ajoute, men pa bliye kreye yon Jira ticket pou admin lan apwove depo an Klike sou back pou retounen epi refresh',
      );
      _setLoading(false);
    } catch (error) {
      _setLoading(false);
      console.error('Error  file:', error);
      alert('EROOR');
    }
  };

  const handleAdduserMoncashPayment = (data: PaymentType) => {
    try {
      _setLoading(true);

      const payment = {
        amount: Number(data?.amount),
        user_name: data.user.name,
        user_email: data.user.email,
        user_id: data.user.id,
        image: data?.user?.image,
        date: new Date().toDateString().toString(),
        status: 'Need Approval',
      };

      // Ref in database
      firestore().collection('Payments').add(payment);

      Alert.alert(
        'Confirmation',
        'Depo an ajoute, men pa bliye kreye yon Jira ticket pou admin lan apwove depo an Klike sou back pou retounen epi refresh',
      );
      _setLoading(false);
    } catch (error) {
      _setLoading(false);
      console.error('Error  file:', error);
      alert('EROOR');
    }
  };

  const value = {
    state,
    handleStateManager,
    handleSaveState,
    fundraising,
    handleGetDonations,
    donations,
    handleGetFundraising,
    handleGetProjectByID,
    projects,
    handleGetMessagesByID,
    messages,
    updateFundraising,
    handleGetProjectByUserId,
    updateFundraisingStatus,
    handleGetDonationsByUserId,
    donationsUser,
    handleAddMoncashPayment,
    handleAdduserMoncashPayment,
    updateFundraisingViews,
    isFileUploaded,
    fileUploadedProgress,
  };

  return (
    <FundingContext.Provider value={value}>{children}</FundingContext.Provider>
  );
};
