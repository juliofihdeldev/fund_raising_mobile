import auth from '@react-native-firebase/auth';
import React, {ReactNode, createContext, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {UserType} from '../types/Index';

interface AuthContextProps {
  isLoggedIn: boolean;
  current_select_user: UserType;
  login: () => void;
  logout: () => void;
  handleSetUser: (user: any) => void;
  user: UserType;
  usersPayment: [];
  handleGetUserPayment: () => void;
  handleCurrentSelectUser: (user: UserType) => void;
  getUsers: () => void;
  users: UserType[];
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

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
  let [users, setUsers] = React.useState([]);
  let [usersPayment, setUsersPayment] = React.useState([]);

  let [current_select_user, setCurrentSelectUser] = React.useState<UserType>(
    {},
  );
  const handleSetUser = (user_: UserType) => {
    setUser(user_);
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
    } else {
      handleSetUser({});
    }
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleGetUserPayment = async () => {
    // get user payment bu user ID
    const userPayment = await firestore()
      .collection('Payments')
      .where('user_id', '==', user?.id)
      .get();
    setUsersPayment(userPayment.docs.map(doc => doc.data()));
  };
  const handleCurrentSelectUser = (_user: UserType) => {
    setCurrentSelectUser(_user);
  };

  const getUsers = async () => {
    const _users = await firestore().collection('users').get();
    setUsers(_users.docs.map(doc => doc.data()));
  };

  const value = {
    logout,
    handleSetUser,
    getUsers,
    handleGetUserPayment,
    users,
    user,
    current_select_user,
    usersPayment,
    handleCurrentSelectUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
