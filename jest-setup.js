/* eslint-disable no-undef */
import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-firebase/firestore', () =>
  jest.fn(() => ({
    collection: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      get: jest.fn().mockResolvedValue({
        empty: true,
        docs: [],
      }),
    })),
  })),
);

jest.mock('@react-native-firebase/auth', () =>
  jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn(() => ({
      user: {
        uid: '123',
        email: '  ',
        displayName: '  ',
        photoURL: '  ',
      },
    })),
    signInWithPhoneNumber: jest.fn(() => '+50948188100'),
    createUserWithEmailAndPassword: jest.fn(() => ({
      user: {
        uid: '123',
        email: '  ',
        displayName: '  ',
        photoURL: '  ',
      },
    })),
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn(),
  })),
);

//mock messaging
jest.mock('@react-native-firebase/messaging', () =>
  jest.fn(() => ({
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('myMockToken')),
    onMessage: jest.fn(),
    onNotificationOpenedApp: jest.fn(),
    onTokenRefresh: jest.fn(),
  })),
);

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('./src/context/AuthContext.tsx', () => ({
  useAuth: () => ({
    user: {
      uid: '123',
      email: 'test@gmail.com',
      displayName: 'Julio',
      photoURL: 'https://picsum.photos/200/300',
    }, // or mock the user object as needed
  }),
}));
