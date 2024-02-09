import React, {ReactNode, createContext, useContext} from 'react';
import {Alert} from 'react-native';
import {ProjectType} from '../types/Index';
import {useAuth} from './AuthContext';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useLang} from './LanguageContext';
import {collection, doc, setDoc, updateDoc} from 'firebase/firestore';
import {
  getStorage,
  getDownloadURL,
  ref as refStorageUpload,
  uploadBytesResumable,
} from 'firebase/storage';
import {db} from '../../firebaseConfig';
import {getBlobFroUri} from '../utils/getBlobFromUri';

const storage = getStorage();

interface CreateContextProps {
  state: ProjectType;
  handleStateManager: (data: ProjectType) => void;
  handleSaveState: () => void;
  handleGetFundraising: () => void;
  updateFundraising: (project_id: string) => void;
  fundraising: ProjectType[];
  projects: ProjectType[];
  isFileUploaded: boolean;
  fileUploadedProgress: number;
}

const CreateContext = createContext<CreateContextProps | undefined>(undefined);

export const useCreateFunding = (): CreateContextProps => {
  const context = useContext(CreateContext);

  if (!context) {
    throw new Error(
      'useCreateFunding must be used within an CreateContextProvider',
    );
  }
  return context;
};

interface CreateContextProviderProps {
  children: ReactNode;
}

export const CreateContextProvider: React.FC<CreateContextProviderProps> = ({
  children,
}) => {
  const [state, setState] = React.useState<ProjectType>({} as ProjectType);
  const [isFileUploaded, setIsFileUploaded] = React.useState<boolean>(false);
  const [fileUploadedProgress, setFileUploadedProgress] = React.useState(5);

  const {user} = useAuth();
  const {lang, _setLoading} = useLang();

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

    console.log('_arrayOfImages _arrayOfImages', arrayResponseImage);

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

  const value = {
    state,
    handleStateManager,
    handleSaveState,
    updateFundraising,
    isFileUploaded,
    fileUploadedProgress,
  };

  return (
    <CreateContext.Provider value={value}>{children}</CreateContext.Provider>
  );
};
