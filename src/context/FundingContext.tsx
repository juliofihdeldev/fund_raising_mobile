import React, {ReactNode, createContext, useContext} from 'react';
import {Alert} from 'react-native';
import {
  DonationType,
  MessageType,
  PaymentType,
  ProjectType,
} from '../types/Index';
import {useAuth} from './AuthContext';

import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useLang} from './LanguageContext';

import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
  addDoc,
} from 'firebase/firestore';

import {
  getStorage,
  getDownloadURL,
  ref as refStorageUpload,
  uploadBytesResumable,
} from 'firebase/storage';

import {db} from '../../firebaseConfig';
import {getBlobFroUri} from '../utils/getBlobFromUri';

const storage = getStorage();

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
  const [fileUploadedProgress, setFileUploadedProgress] = React.useState(5);

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

  const handleStateManager = (data: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    setState(prevState => ({...prevState, ...data}));
  };

  let arrayResponseImage: string[] = [];

  const sendMediaToStorage = async () => {
    try {
      const metadata = {
        contentType: 'image/jpeg',
      };
      const imageBlob = await getBlobFroUri(state?.image);

      const reference = refStorageUpload(
        storage,
        `fundraising/${new Date().toISOString()}`,
      );

      const uploadTask = uploadBytesResumable(
        reference,
        imageBlob as Blob,
        metadata,
      );

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setFileUploadedProgress(progress);
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          error => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref)
              .then(_downloadURL => {
                console.log('File available at', _downloadURL);
                resolve(_downloadURL);
              })
              .catch(error => {
                reject(error);
              });
          },
        );
      });
    } catch (error) {
      console.error('Error  file:', error);
      throw error;
    }
  };

  async function sendMultipleFiles() {
    try {
      const promises = state?.list_images?.map(async (element, i) => {
        const metadata = {
          contentType: 'image/jpeg',
        };
        const imageBlob = await getBlobFroUri(element);

        const reference = refStorageUpload(
          storage,
          `fundraising/${new Date().toISOString()}_${i}`,
        );

        const uploadTask = uploadBytesResumable(
          reference,
          imageBlob as Blob,
          metadata,
        );

        return new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            snapshot => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done FIXXX');
              setFileUploadedProgress(progress);
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused FIXXX');
                  break;
                case 'running':
                  console.log('Upload is running FIXXX');
                  break;
              }
            },
            error => {
              // Handle unsuccessful uploads
              reject(error);
            },
            () => {
              // Handle successful uploads on complete
              getDownloadURL(uploadTask.snapshot.ref)
                .then(_downloadURL => {
                  console.log('File available at', _downloadURL);
                  arrayResponseImage.push(_downloadURL);
                  resolve(_downloadURL);
                })
                .catch(error => {
                  reject(error);
                });
            },
          );
        });
      });

      await Promise.all(promises);
    } catch (error) {
      console.error('Error  file:', error);
      throw error;
    }
  }

  const handleSaveState = async () => {
    _setLoading(false);
    setIsFileUploaded(true);
    await sendMultipleFiles();

    try {
      const img = arrayResponseImage && arrayResponseImage[0];
      const dateValue = new Date().toDateString().toString();
      const _user = user;
      delete _user?.donations;

      const formatData: ProjectType = {
        date: dateValue,
        name: state?.name || '',
        description: state?.description || '',
        amount: state?.amount || 0,
        category: state?.category || '',
        collect: 0,
        status: 'Pending Review',
        image: img || '',
        list_images: arrayResponseImage || [],
        video_url: state?.video_url || '',
        donation: [] as any,
        isBlocked: false,
        is_emergency: Math.random() >= 0.7,
        user: _user || {},
      };

      // await ref.add(formatData);
      const fundraisingRef = collection(db, 'fundraising');
      await setDoc(doc(fundraisingRef), formatData);

      // setFundraising((prevState: ProjectType) => [...prevState, formatData]);
      _setLoading(false);

      Alert.alert(lang?.warning, lang?.fundraising_created, [
        {
          text: "J'ai compris",
          onPress: () => null,
        },
      ]);
      setIsFileUploaded(false);
      //   setState({} as ProjectType);
    } catch (error) {
      console.error('**************Error:', error);
      _setLoading(false);

      Alert.alert(
        'Error Connection',
        ` Connection loss, Please try later ${JSON.stringify(error)}`,
        [
          {
            text: 'OK',
            onPress: () => null,
          },
        ],
      );

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
      const fundraisingRef = doc(db, 'fundraising', id);
      updateDoc(fundraisingRef, formatData);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: lang?.success,
        textBody: lang?.modifie_succes,
      });
    } catch (error) {
      console.error('Error:', error);

      Alert.alert(
        'Error Connection',
        ` Connection loss, Please try later ${JSON.stringify(error)}`,
        [
          {
            text: 'OK',
            onPress: () => null,
          },
        ],
      );
    }
    _setLoading(false);
  };

  const updateFundraisingStatus = async (id: string, data: ProjectType) => {
    _setLoading(true);
    await updateDoc(doc(db, 'fundraising', id), data as any);
    _setLoading(false);
  };

  const updateFundraisingViews = async (id: string, data: ProjectType) => {
    updateDoc(doc(db, 'fundraising', id), data as any);
  };

  const handleGetProjectByID = async (project_id: string) => {
    _setLoading(true);
    let project: ProjectType = {} as ProjectType;

    // get add fundraisingRef by  project_id
    const fundraisingRef = doc(db, 'fundraising', project_id);
    const fundraisingSnap = await getDoc(fundraisingRef);
    if (fundraisingSnap.exists()) {
      console.log('Document data:', fundraisingSnap.data());
      project = {
        id: fundraisingSnap.id,
        ...fundraisingSnap.data(),
      } as ProjectType;
      setProjects(project);
    } else {
      setProjects({} as ProjectType);
    }
    _setLoading(false);
  };

  const handleGetProjectByUserId = async (userId: string) => {
    _setLoading(true);
    try {
      // get fundraisingRef by userId
      const fundraisingRef = query(
        collection(db, 'fundraising'),
        where('user.id', '==', userId),
      ) as any;
      const fundraisingSnap = await getDocs(fundraisingRef);
      const dataArray = [] as ProjectType[];
      fundraisingSnap.forEach(doc => {
        const d = {
          id: doc.id,
          ...(doc.data() as any),
        } as ProjectType;

        dataArray.push(d);
      });
      setProjects(dataArray as any);
    } catch (error) {
      Alert.alert('Error', JSON.stringify(error));
    }
    _setLoading(false);
  };

  const handleGetFundraising = async () => {
    _setLoading(true);

    let results = [] as ProjectType[];
    const fundraisingRef = collection(db, 'fundraising');
    const fundraisingSnap = await getDocs(fundraisingRef);
    fundraisingSnap.forEach(doc => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      results.push(obj);
    });
    setFundraising(results);
    _setLoading(false);
  };

  const handleGetDonations = async (project_id: string) => {
    _setLoading(true);

    let queryDonation = query(
      collection(db, 'donations'),
      where('project_id', '==', project_id),
    ) as any;

    const queryDonationSnapshot = await getDocs(queryDonation);
    const _donations = queryDonationSnapshot.docs.map(doc => doc.data());
    setDonations(_donations);

    _setLoading(false);
  };

  const handleGetDonationsByUserId = async (user_id: string) => {
    try {
      _setLoading(true);
      const queryDonnationUser = query(
        collection(db, 'donations'),
        where('user_id', '==', user_id),
      ) as any;

      const queryDonnationUserSnapshot = await getDocs(queryDonnationUser);
      const _donationsUser = queryDonnationUserSnapshot.docs.map(doc =>
        doc.data(),
      );
      setDonationsUser(_donationsUser);
    } catch (error) {
      _setLoading(false);
    } finally {
      _setLoading(false);
    }
  };

  const handleGetMessagesByID = async (project_id: string) => {
    const queryMessages = query(
      collection(db, 'messages'),
      where('project_id', '==', project_id),
    ) as any;

    const queryMessagesSnapshot = await getDocs(queryMessages);

    const _messages = queryMessagesSnapshot.docs.map(doc => doc.data());

    setMessages(_messages);
  };

  const handleAddMoncashPayment = async (data: any) => {
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

      _setLoading(true);

      // update fundraising
      const addDonnationRef = collection(db, 'donations');
      await setDoc(doc(addDonnationRef), save_donation_object);

      const _updateUserRef = collection(db, 'users');

      await updateDoc(doc(_updateUserRef, data.user?.id), {
        donations: arrayUnion(save_donation_object),
      });

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

  const handleAdduserMoncashPayment = async (data: PaymentType) => {
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

      await addDoc(collection(db, 'Payments'), payment);

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
