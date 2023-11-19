import auth from '@react-native-firebase/auth';
import React, {ReactNode, createContext, useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

interface AuthContextProps {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  handleSetUser: (user: any) => void;
  user: {};
  usersPayment: [];
  handleGetUserPayment: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

interface AuthContextProviderProps {
  children: ReactNode;
}
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const logout = async () => {
    await auth().signOut();
  };

  let [user, setUser] = React.useState({});
  let [usersPayment, setUsersPayment] = React.useState([]);

  const handleGetUserPayment = () => {
    setUsersPayment([]);
  };

  const handleSetUser = (user: any) => {
    setUser(user);
  };

  async function onAuthStateChanged(user_data: any) {
    if (user_data) {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();

      try {
        const {uid, phoneNumber} = user_data;

        const objUser = {
          id: uid,
          phone: phoneNumber,
          token: token,
        };

        // Save user if exist
        const userExist = await firestore().collection('users').doc(uid).get();

        if (!userExist.exists) {
          await firestore().collection('users').doc(uid).set(objUser);
          handleSetUser(objUser);
        } else {
          let dToken = {
            ...userExist?.data(),
            token: token,
          };

          handleSetUser(dToken);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const value = {
    logout,
    handleSetUser,
    handleGetUserPayment,
    user,
    usersPayment,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
