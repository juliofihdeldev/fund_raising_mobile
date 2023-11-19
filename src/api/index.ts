import firestore from '@react-native-firebase/firestore';
import { DonationType, ProjectType } from '../types/Index';

// get fundraign reference

export const getFundraisingRef = firestore().collection('fundraising');

// donation reference

export const getDonationRef = firestore().collection('donation');

// make donation

export const makeDonation = async (
  donation: DonationType,
  project: ProjectType,
) => {
  const donate = {
    project,
    donation,
  };
  const donationRef = await getDonationRef.doc(project.id).set(donate);
  return donationRef;
};
