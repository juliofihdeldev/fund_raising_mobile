import React, {ReactNode, createContext, useContext} from 'react';

import {app, auth, db} from '../../firebaseConfig';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  sendEmailVerification,
} from 'firebase/auth';
import {onAuthStateChanged} from 'firebase/auth';

import {UserType} from '../types/Index';
import {Alert} from 'react-native';

interface AuthContextProps {
  isLoggedIn: boolean;
  current_select_user: UserType;
  logout: () => void;
  login: (data: any) => void;
  handleSetUser: (user: any) => void;
  user: UserType;
  usersPayment: [];
  handleGetUserPayment: () => void;
  handleCurrentSelectUser: (user: UserType) => void;
  getUsers: () => void;
  users: UserType[];
  createAccount: (data: any) => void;
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
    await signOut(auth);
    handleSetUser(null);
  };

  let [user, setUser] = React.useState({});
  let [users, setUsers] = React.useState([]);
  let [usersPayment, setUsersPayment] = React.useState([]);

  let [current_select_user, setCurrentSelectUser] =
    React.useState<UserType>(null);
  const handleSetUser = (user_: UserType) => {
    setUser(user_);
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        try {
          const {uid, phoneNumber} = user;
          const objUser = {
            id: uid,
            phone: phoneNumber,
            token: 'token',
          };
          // get users data   user info
          const userRef = doc(db, 'users', uid);
          const userSnapExist = await getDoc(userRef);
          if (userSnapExist.exists()) {
            console.log('Document data:', userSnapExist.data());
            const userAddRed = collection(db, 'users');
            await setDoc(doc(userAddRed, uid), userSnapExist.data());
            handleSetUser(userSnapExist.data() as UserType);
          } else {
            const userAddRed = collection(db, 'users');
            await setDoc(doc(userAddRed, uid), objUser);
            handleSetUser(objUser as any);
          }
        } catch (error) {
          console.log(error);
        }
        // ...
      } else {
        handleSetUser({});
      }
    });
  }, []);

  const handleGetUserPayment = async () => {
    // get user payment bu user ID
    const q = query(
      collection(db, 'Payments'),
      where('user_id', '==', user?.id),
    ) as any;

    const queryPaymentSnapshot = await getDocs(q);

    setUsersPayment(queryPaymentSnapshot.docs.map(doc => doc.data()));
  };

  const handleCurrentSelectUser = (_user: UserType) => {
    setCurrentSelectUser(_user);
  };

  const getUsers = async () => {
    const _users = await getDocs(collection(db, 'users'));
    setUsers(_users.docs.map(doc => doc.data()));
  };
  const login = async (data: any) => {
    let {email, password} = data;
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      handleSetUser(user as any);
      console.log(user);
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  };
  const createAccount = async (data: any) => {
    let {email, password} = data;
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      // send email verification
      await sendEmailVerification(auth.currentUser as any);
      const user = userCredential.user;
      handleSetUser(user as any);
      console.log(user);
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
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
    login,
    createAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
